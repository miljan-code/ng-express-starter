import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [HlmButtonDirective, NgIconComponent, AsyncPipe],
  viewProviders: [provideIcons({ lucideSun, lucideMoon })],
  template: `
    @let theme = themeService.theme$ | async;

    <button
      hlmBtn
      variant="link"
      size="sm"
      class="p-0"
      (click)="themeService.setTheme(theme === 'dark' ? 'light' : 'dark')"
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
