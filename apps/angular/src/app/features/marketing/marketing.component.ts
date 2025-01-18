import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle.component';

@Component({
  selector: 'app-marketing',
  imports: [ThemeToggleComponent],
  template: `
    <div class="flex flex-col items-center justify-center">
      @if (store.isAuthenticated()) {
        <span>Hello, {{ store.user()?.name }}</span>
        <button (click)="store.logout()">Sign out</button>
      } @else {
        <button (click)="store.login()">Sign in</button>
      }
      <app-theme-toggle />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketingComponent {
  public store = inject(AuthStore);
}
