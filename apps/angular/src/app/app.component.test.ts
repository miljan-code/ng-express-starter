import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';

import { AppComponent } from './app.component';
import { ThemeService } from './shared/services/theme.service';

describe('AppComponent', () => {
  let mockThemeService: Mocked<ThemeService>;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    mockThemeService = {
      syncInitialTheme: vi.fn(),
    } as unknown as Mocked<ThemeService>;

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideExperimentalZonelessChangeDetection(),
        { provide: ThemeService, useValue: mockThemeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
