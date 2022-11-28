import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@standalone/logic').then((routes) => routes.lazyRoutes),
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(appRoutes)],
})
  .then((ref) => {
    // Stackblitz: Ensure Angular destroys itself on hot reloads.
    if (window['ngRef' as any]) {
      (window['ngRef' as any] as any).destroy();
    }

    (window['ngRef' as any] as any) = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
