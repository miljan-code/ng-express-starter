import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { defer, exhaustMap, pipe, switchMap, take } from 'rxjs';

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

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed(({ user, status }) => {
    const isAuthenticated = computed(() => status() === 'authenticated');

    return { user, status, isAuthenticated };
  }),
  withMethods((store, authService = inject(AuthService)) => {
    const refresh = rxMethod<void>(
      pipe(
        switchMap(() =>
          defer(() => authService.getUser()).pipe(
            tapResponse(
              ({ user }) => {
                patchState(store, {
                  user,
                  status: !!user ? 'authenticated' : 'unauthenticated',
                });
              },
              (error) => {
                console.error('error refreshing current user: ', error);
                patchState(store, { user: null, status: 'unauthenticated' });
              },
            ),
          ),
        ),
        take(1),
      ),
    );
    const login = rxMethod<void>(
      exhaustMap(() =>
        authService.signIn('google').pipe(
          tapResponse(
            () => refresh(),
            (error) => console.error('error signing in user: ', error),
          ),
        ),
      ),
    );
    const logout = rxMethod<void>(
      exhaustMap(() =>
        authService.signOut().pipe(
          tapResponse(
            () => refresh(),
            (error) => console.error('error signing out user: ', error),
          ),
        ),
      ),
    );
    return { refresh, login, logout };
  }),
  withHooks({
    onInit: (store) => {
      store.refresh();
    },
  }),
);
