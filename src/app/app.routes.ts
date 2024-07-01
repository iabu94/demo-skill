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
      import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employees.component').then(c => c.EmployeesComponent),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./report/report.component').then(c => c.ReportComponent),
  },
  {
    path: 'admin-settings',
    loadComponent: () =>
      import('./admin-settings/admin-settings.component').then(
        c => c.AdminSettingsComponent
      ),
  },
  {
    path: 'help-center',
    loadComponent: () =>
      import('./help-center/help-center.component').then(
        c => c.HelpCenterComponent
      ),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./archive/archive.component').then(c => c.ArchiveComponent),
  },
];
