import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Transaction, TransactionFilter } from '../../../core/domain/transaction.model';
import { BankMap } from '../../../core/domain/bank.model';
import { StatusMap } from '../../../core/domain/status.model';
import { CURRENCIES } from '../../../core/domain/currency.model';
import { GetTransactionsUseCase } from '../../../core/use-cases/get-transactions.use-case';
import { GenerateReportUseCase } from '../../../core/use-cases/generate-report.use-case';

/**
 * Transactions component for displaying and filtering transactions
 */
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class TransactionsComponent implements OnInit {
  /**
   * Transactions to display
   */
  transactions$!: Observable<Transaction[]>;
  
  /**
   * Filter form
   */
  filterForm!: FormGroup;
  
  /**
   * Available currencies
   */
  currencies = CURRENCIES;
  
  /**
   * Bank mapping for dropdowns
   */
  bankMap: BankMap = {
    'B001': 'Global Bank',
    'B002': 'National Trust',
    'B003': 'City Finance',
    'B004': 'Metro Credit Union',
    'B005': 'Regional Savings'
  };
  
  /**
   * Status mapping for dropdowns
   */
  statusMap: StatusMap = {
    '1': 'Pending',
    '2': 'Completed',
    '3': 'Failed',
    '4': 'Cancelled'
  };
  
  /**
   * Table columns to display
   */
  displayedColumns: string[] = ['date', 'amount', 'paymentId', 'sender', 'receiver', 'status', 'actions'];
  
  /**
   * Flag to indicate if report is being generated
   */
  isGeneratingReport = false;
  
  /**
   * Report URL if generated
   */
  reportUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private getTransactionsUseCase: GetTransactionsUseCase,
    private generateReportUseCase: GenerateReportUseCase
  ) {}

  ngOnInit(): void {
    this.initFilterForm();
    this.setupTransactionsObservable();
  }
  
  /**
   * Initialize the filter form
   */
  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      transactionId: [''],
      startDate: [null],
      endDate: [null],
      senderBankId: [''],
      receiverBankId: [''],
      currency: [''],
      statusId: ['']
    });
  }
  
  /**
   * Setup the transactions observable with filtering
   */
  private setupTransactionsObservable(): void {
    // Get initial transactions
    const initialTransactions$ = this.getTransactionsUseCase.execute();
    
    // Combine with form value changes
    this.transactions$ = combineLatest([
      initialTransactions$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
    ]).pipe(
      map(([transactions, filterValues]) => {
        // Apply client-side filtering and ensure it's never null for the table
        return this.filterTransactions(transactions || [], filterValues);
      })
    );
  }
  
  /**
   * Apply filters to transactions
   */
  private filterTransactions(transactions: Transaction[], filter: TransactionFilter): Transaction[] {
    return transactions.filter(transaction => {
      // Transaction ID filter
      if (filter.transactionId && !transaction.id.toLowerCase().includes(filter.transactionId.toLowerCase())) {
        return false;
      }
      
      // Date range filter
      if (filter.startDate && new Date(transaction.date) < new Date(filter.startDate)) {
        return false;
      }
      
      if (filter.endDate && new Date(transaction.date) > new Date(filter.endDate)) {
        return false;
      }
      
      // Sender bank filter
      if (filter.senderBankId && transaction.senderBankId !== filter.senderBankId) {
        return false;
      }
      
      // Receiver bank filter
      if (filter.receiverBankId && transaction.receiverBankId !== filter.receiverBankId) {
        return false;
      }
      
      // Currency filter
      if (filter.currency && transaction.currency !== filter.currency) {
        return false;
      }
      
      // Status filter
      if (filter.statusId && transaction.statusId !== filter.statusId) {
        return false;
      }
      
      return true;
    });
  }
  
  /**
   * Apply filters
   */
  applyFilters(): void {
    // Validate business logic: at least one authorized bank
    const senderBankId = this.filterForm.get('senderBankId')?.value;
    const receiverBankId = this.filterForm.get('receiverBankId')?.value;
    
    const authorizedBanks = ['B001', 'B002', 'B004']; // Banks that are authorized
    
    if (senderBankId || receiverBankId) {
      const isSenderAuthorized = !senderBankId || authorizedBanks.includes(senderBankId);
      const isReceiverAuthorized = !receiverBankId || authorizedBanks.includes(receiverBankId);
      
      if (!isSenderAuthorized && !isReceiverAuthorized) {
        // Show error message (would use a real notification service in production)
        console.error('At least one authorized bank must be selected');
        return;
      }
    }
    
    // Trigger form value change to update transactions
    this.filterForm.updateValueAndValidity();
  }
  
  /**
   * Reset filters
   */
  resetFilters(): void {
    this.filterForm.reset();
    this.applyFilters();
  }
  
  /**
   * Generate report
   */
  generateReport(): void {
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;
    
    if (!startDate) {
      // Show error message (would use a real notification service in production)
      console.error('Start date is required for report generation');
      return;
    }
    
    this.isGeneratingReport = true;
    
    this.generateReportUseCase.execute(
      startDate,
      endDate || new Date()
    ).subscribe({
      next: (url) => {
        this.reportUrl = url;
        this.isGeneratingReport = false;
        // Show success message (would use a real notification service in production)
        console.log('Report generated successfully');
      },
      error: (error) => {
        this.isGeneratingReport = false;
        // Show error message (would use a real notification service in production)
        console.error('Error generating report:', error);
      }
    });
  }
  
  /**
   * View transaction details
   */
  viewTransaction(transaction: Transaction): void {
    // Would navigate to transaction details page in a real app
    console.log('View transaction:', transaction);
  }
}
