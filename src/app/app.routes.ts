import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'get-taxi',
    loadComponent: () =>
      import('./pages/get-taxi/get-taxi.page').then((m) => m.GetTaxiPage),
  },
  {
    path: 'get-mototaxi',
    loadComponent: () =>
      import('./pages/get-mototaxi/get-mototaxi.page').then(
        (m) => m.GetMototaxiPage
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/pages/register/register.page').then((m) => m.RegisterPage),
  },
];
