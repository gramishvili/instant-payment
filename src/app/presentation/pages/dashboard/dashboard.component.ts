import { Component, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Transaction } from '../../../core/domain/transaction.model';
import { GetTransactionsUseCase } from '../../../core/use-cases/get-transactions.use-case';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

// We'll register Chart.js components in the browser only

/**
 * Dashboard component displaying key metrics and recent transactions
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BaseChartDirective
  ]
})
export class DashboardComponent implements OnInit {
  /**
   * Recent transactions to display
   */
  recentTransactions$!: Observable<Transaction[]>;
  
  /**
   * Key metrics for the dashboard
   */
  metrics = [
    { title: 'Total Transactions', value: '1,254', icon: 'swap_horiz', color: '#6F52ED' },
    { title: 'Completed', value: '1,180', icon: 'check_circle', color: '#4CAF50' },
    { title: 'Pending', value: '42', icon: 'pending', color: '#FFC107' },
    { title: 'Failed', value: '32', icon: 'error', color: '#F44336' }
  ];

  /**
   * Chart data for total transactions over time
   */
  totalTransactionsChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [850, 920, 1050, 1150, 1200, 1254],
        label: 'Total Transactions',
        backgroundColor: 'rgba(111, 82, 237, 0.1)',
        borderColor: '#6F52ED',
        pointBackgroundColor: '#6F52ED',
        pointBorderColor: '#fff',
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  /**
   * Chart data for transaction status distribution
   */
  statusDistributionChartData: ChartData<'doughnut'> = {
    labels: ['Completed', 'Pending', 'Failed'],
    datasets: [
      {
        data: [1180, 42, 32],
        backgroundColor: ['rgba(76, 175, 80, 0.8)', 'rgba(255, 193, 7, 0.8)', 'rgba(244, 67, 54, 0.8)'],
        hoverBackgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  };

  /**
   * Chart data for transaction amounts by currency
   */
  amountsByCurrencyChartData: ChartData<'bar'> = {
    labels: ['USD', 'EUR', 'GEL'],
    datasets: [
      {
        data: [5000, 3200, 2000],
        label: 'Transaction Amounts',
        backgroundColor: ['rgba(111, 82, 237, 0.7)', 'rgba(76, 175, 80, 0.7)', 'rgba(255, 193, 7, 0.7)'],
        borderColor: ['#6F52ED', '#4CAF50', '#FFC107'],
        borderWidth: 0,
        borderRadius: 4,
        hoverBackgroundColor: ['#6F52ED', '#4CAF50', '#FFC107']
      }
    ]
  };

  /**
   * Chart data for daily transaction count
   */
  dailyTransactionsChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [42, 85, 63, 97, 110, 75, 48],
        label: 'Daily Transactions',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderColor: '#F44336',
        pointBackgroundColor: '#F44336',
        pointBorderColor: '#fff',
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  /**
   * Line chart options
   */
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          display: true,
          font: {
            size: 8
          },
          maxRotation: 0
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.02)'
        },
        ticks: {
          display: true,
          font: {
            size: 8
          },
          count: 3
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        cornerRadius: 4,
        displayColors: false
      }
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4
      },
      point: {
        radius: 0,
        hoverRadius: 3
      }
    },
    layout: {
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      }
    }
  };

  /**
   * Doughnut chart options
   */
  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        cornerRadius: 4,
        displayColors: false
      }
    },
    layout: {
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      }
    }
  };

  /**
   * Bar chart options
   */
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 8
          }
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.02)'
        },
        ticks: {
          font: {
            size: 8
          },
          count: 3
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        cornerRadius: 4,
        displayColors: false
      }
    },
    layout: {
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      }
    }
  };

  // Flag to check if we're in the browser
  isBrowser = false;

  constructor(
    private getTransactionsUseCase: GetTransactionsUseCase,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Register Chart.js components only in the browser
    if (this.isBrowser) {
      Chart.register(...registerables);
    }
  }

  ngOnInit(): void {
    // Get recent transactions (limited to 5) and ensure it's never null for the table
    this.recentTransactions$ = this.getTransactionsUseCase.execute()
      .pipe(map(transactions => transactions || []));
  }
  
  /**
   * Navigate to transactions page when a transaction row is clicked
   */
  navigateToTransactions(): void {
    this.router.navigate(['/transactions']);
  }
}
