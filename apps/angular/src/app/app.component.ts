import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/auth/auth.store';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly themeService = inject(ThemeService);

  ngOnInit() {
    this.authStore.init();
    this.themeService.syncInitialTheme();
  }
}
