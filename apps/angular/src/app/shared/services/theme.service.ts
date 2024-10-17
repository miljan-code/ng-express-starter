import { Injectable, RendererFactory2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, combineLatest } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

const Themes = ['system', 'dark', 'light'] as const;
export type Mode = (typeof Themes)[number];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private mediaQuery = inject(MediaMatcher).matchMedia(
    '(prefers-color-scheme: dark)',
  );
  private localStorage = inject(LocalStorageService);
  private systemTheme$ = new ReplaySubject<Mode>(1);
  public theme$ = new ReplaySubject<Mode>(1);

  constructor() {
    this.mediaQuery.onchange = (e: MediaQueryListEvent) =>
      this.theme$.next(e.matches ? 'dark' : 'light');

    this.syncInitialTheme();
    this.toggleClassOnThemeChange();
  }

  public syncInitialTheme(): void {
    const systemTheme = this.mediaQuery.matches ? 'dark' : 'light';
    this.systemTheme$.next(systemTheme);
    this.theme$.next(
      this.localStorage.get<Mode>('eventize__theme') ?? systemTheme,
    );
  }

  private toggleClassOnThemeChange(): void {
    combineLatest([this.theme$, this.systemTheme$])
      .pipe(takeUntilDestroyed())
      .subscribe(([theme, systemTheme]) => {
        if (
          theme === 'dark' ||
          (theme === 'system' && systemTheme === 'dark')
        ) {
          this.renderer.addClass(this.document.documentElement, 'dark');
          this.renderer.setAttribute(
            this.document.documentElement,
            'data-theme',
            'black',
          );
        } else {
          if (this.document.documentElement.className.includes('dark')) {
            this.renderer.removeClass(this.document.documentElement, 'dark');
            this.renderer.setAttribute(
              this.document.documentElement,
              'data-theme',
              'lofi',
            );
          }
        }
      });
  }

  public setTheme(mode: Mode): void {
    this.localStorage.set('eventize__theme', mode);
    this.theme$.next(mode);
  }
}
