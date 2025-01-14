import { inject, Injectable } from '@angular/core';
import { defer, exhaustMap, filter, switchMap } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

import { AuthService } from './auth.service';
import type { User } from '../../shared/models/user';

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: User | null;
  status: AuthStatus;
}

export const initialAuthState: AuthState = {
  user: null,
  status: 'idle',
};

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {
  private readonly authService = inject(AuthService);

  readonly user$ = this.select((s) => s.user);
  readonly status$ = this.select((s) => s.status);

  readonly isAuthenticated$ = this.select(
    this.status$.pipe(filter((status) => status !== 'idle')),
    (status) => status === 'authenticated',
    { debounce: true },
  );

  readonly auth$ = this.select(
    this.isAuthenticated$,
    this.user$,
    (isAuthenticated, user) => ({ user, isAuthenticated }),
    { debounce: true },
  );

  constructor() {
    super(initialAuthState);
  }

  init() {
    this.refresh();
  }

  readonly login = this.effect<void>(
    exhaustMap(() =>
      this.authService.signIn('google').pipe(
        tapResponse(
          () => this.refresh(),
          (error) => console.error('error signing in user: ', error),
        ),
      ),
    ),
  );

  readonly logout = this.effect<void>(
    exhaustMap(() =>
      this.authService.signOut().pipe(
        tapResponse(
          () => this.refresh(),
          (error) => console.error('error signing out user: ', error),
        ),
      ),
    ),
  );

  private readonly refresh = this.effect<void>(
    switchMap(() =>
      defer(() => this.authService.getUser()).pipe(
        tapResponse(
          ({ user }) => {
            this.patchState({
              user,
              status: !!user ? 'authenticated' : 'unauthenticated',
            });
          },
          (error) => {
            console.error('error refreshing current user: ', error);
            this.patchState({ user: null, status: 'unauthenticated' });
          },
        ),
      ),
    ),
  );
}
