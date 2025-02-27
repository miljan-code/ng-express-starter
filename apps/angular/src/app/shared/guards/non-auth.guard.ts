import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../../core/auth/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export function nonAuthGuard(): CanMatchFn {
  return () => {
    const router = inject(Router);
    const authStore = inject(AuthStore);

    return toObservable(authStore.status).pipe(
      filter((status) => status !== 'idle'),
      map((status) => {
        if (status !== 'authenticated') return true;
        else return router.parseUrl('/');
      }),
      take(1),
    );
  };
}
