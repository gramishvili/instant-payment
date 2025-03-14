import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction, TransactionFilter } from '../../core/domain/transaction.model';
import { ITransactionRepository } from '../../core/interfaces/transaction-repository.interface';

/**
 * Mock implementation of the Transaction Repository
 * Used for testing and development purposes
 */
@Injectable({
  providedIn: 'root'
})
export class MockTransactionRepository implements ITransactionRepository {
  // Mock data for transactions
  private transactions: Transaction[] = [
    {
      id: 'TX123456',
      date: new Date('2025-03-10T10:30:00'),
      amount: 1500.50,
      currency: 'USD',
      paymentId: 'PAY-123456',
      senderId: 'S001',
      senderName: 'John Doe',
      senderBankId: 'B001',
      receiverId: 'R001',
      receiverName: 'Jane Smith',
      receiverBankId: 'B002',
      statusId: '2',
      statusName: 'Completed'
    },
    {
      id: 'TX123457',
      date: new Date('2025-03-11T14:20:00'),
      amount: 750.25,
      currency: 'EUR',
      paymentId: 'PAY-123457',
      senderId: 'S002',
      senderName: 'Alice Johnson',
      senderBankId: 'B002',
      receiverId: 'R002',
      receiverName: 'Bob Williams',
      receiverBankId: 'B003',
      statusId: '1',
      statusName: 'Pending'
    },
    {
      id: 'TX123458',
      date: new Date('2025-03-12T09:15:00'),
      amount: 2000.00,
      currency: 'GEL',
      paymentId: 'PAY-123458',
      senderId: 'S003',
      senderName: 'Michael Brown',
      senderBankId: 'B001',
      receiverId: 'R003',
      receiverName: 'Sarah Davis',
      receiverBankId: 'B004',
      statusId: '3',
      statusName: 'Failed'
    },
    {
      id: 'TX123459',
      date: new Date('2025-03-13T16:45:00'),
      amount: 3500.75,
      currency: 'USD',
      paymentId: 'PAY-123459',
      senderId: 'S004',
      senderName: 'David Wilson',
      senderBankId: 'B003',
      receiverId: 'R004',
      receiverName: 'Emily Taylor',
      receiverBankId: 'B001',
      statusId: '2',
      statusName: 'Completed'
    },
    {
      id: 'TX123460',
      date: new Date('2025-03-14T11:30:00'),
      amount: 1200.00,
      currency: 'EUR',
      paymentId: 'PAY-123460',
      senderId: 'S005',
      senderName: 'James Anderson',
      senderBankId: 'B004',
      receiverId: 'R005',
      receiverName: 'Olivia Martin',
      receiverBankId: 'B002',
      statusId: '4',
      statusName: 'Cancelled'
    }
  ];

  /**
   * Get all transactions with optional filtering
   * @param filter Optional filter criteria
   * @returns Observable of Transaction array
   */
  getTransactions(filter?: TransactionFilter): Observable<Transaction[]> {
    // Apply filters if provided
    let filteredTransactions = [...this.transactions];
    
    if (filter) {
      if (filter.transactionId) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.id.toLowerCase().includes(filter.transactionId!.toLowerCase()));
      }
      
      if (filter.startDate) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.date >= filter.startDate!);
      }
      
      if (filter.endDate) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.date <= filter.endDate!);
      }
      
      if (filter.senderBankId) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.senderBankId === filter.senderBankId);
      }
      
      if (filter.receiverBankId) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.receiverBankId === filter.receiverBankId);
      }
      
      if (filter.currency) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.currency === filter.currency);
      }
      
      if (filter.statusId) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.statusId === filter.statusId);
      }
    }
    
    // Simulate network delay
    return of(filteredTransactions).pipe(delay(500));
  }

  /**
   * Get a transaction by ID
   * @param id Transaction ID
   * @returns Observable of Transaction
   */
  getTransactionById(id: string): Observable<Transaction> {
    const transaction = this.transactions.find(t => t.id === id);
    
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    
    // Simulate network delay
    return of(transaction).pipe(delay(300));
  }

  /**
   * Generate a report for transactions within a date range
   * @param startDate Start date for report
   * @param endDate End date for report
   * @returns Observable of string (report URL or data)
   */
  generateReport(startDate: Date, endDate: Date): Observable<string> {
    // Simulate report generation
    const reportUrl = `https://example.com/reports/transactions-${startDate.toISOString().split('T')[0]}-to-${endDate.toISOString().split('T')[0]}.pdf`;
    
    // Simulate network delay
    return of(reportUrl).pipe(delay(1000));
  }
}
