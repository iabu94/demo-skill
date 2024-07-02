import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '@demo/dashboard/containers/dashboard-page/dashboard-page.component'
      ).then(c => c.DashboardPageComponent),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import(
        '@demo/employee/containers/employees-page/employees-page.component'
      ).then(c => c.EmployeesPageComponent),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('@demo/reports/containers/report-page/report-page.component').then(
        c => c.ReportPageComponent
      ),
  },
  {
    path: 'admin-settings-page',
    loadComponent: () =>
      import(
        '@demo/settings/containers/admin-settings-page/admin-settings-page.component'
      ).then(c => c.AdminSettingsPageComponent),
  },
  {
    path: 'help-center',
    loadComponent: () =>
      import(
        '@demo/help/containers/help-center-page/help-center-page.component'
      ).then(c => c.HelpCenterPageComponent),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import(
        '@demo/archive/containers/archive-page/archive-page.component'
      ).then(c => c.ArchivePageComponent),
  },
];
