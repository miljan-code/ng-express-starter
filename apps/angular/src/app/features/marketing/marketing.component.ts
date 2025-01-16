import { Component, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-marketing',
  template: `
    <div class="flex flex-col items-center justify-center">
      @if (store.isAuthenticated()) {
        <span>Hello, {{ store.user()?.name }}</span>
        <button (click)="store.logout()">Sign out</button>
      } @else {
        <button (click)="store.login()">Sign in</button>
      }
    </div>
  `,
})
export class MarketingComponent {
  public store = inject(AuthStore);
}
