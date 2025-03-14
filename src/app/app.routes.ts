import { Routes } from '@angular/router';
import { MainLayoutComponent } from './presentation/layouts/main-layout/main-layout.component';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { TransactionsComponent } from './presentation/pages/transactions/transactions.component';
import { SettingsComponent } from './presentation/pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  // Fallback route
  { path: '**', redirectTo: 'dashboard' }
];
