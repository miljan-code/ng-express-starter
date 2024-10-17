import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter([
      {
        path: '',
        loadComponent: () =>
          import('./features/marketing/marketing.component').then(
            (c) => c.MarketingComponent,
          ),
      },
    ]),
  ],
};
