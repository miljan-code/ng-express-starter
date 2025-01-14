import { Component, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-marketing',
  template: `
    @let auth = store.auth$ | async;

    <div class="flex flex-col items-center justify-center">
      @if (auth?.isAuthenticated) {
        <span>Hello, {{ auth?.user?.name }}</span>
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
