import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';

import { ThemeService } from '../services/theme.service';
import { ButtonDirective } from './ui/button/button.directive';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [ButtonDirective, NgIconComponent, AsyncPipe],
  viewProviders: [provideIcons({ lucideSun, lucideMoon })],
  template: `
    @let theme = themeService.theme$ | async;

    <button
      btn
      variant="link"
      size="sm"
      class="p-0"
      (click)="themeService.theme$.next(theme === 'dark' ? 'light' : 'dark')"
    >
      <ng-icon
        [name]="theme === 'dark' ? 'lucideSun' : 'lucideMoon'"
        size="20"
        class="text-foreground"
      />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
