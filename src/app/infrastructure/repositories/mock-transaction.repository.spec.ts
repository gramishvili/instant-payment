import { TestBed } from '@angular/core/testing';
import { MockTransactionRepository } from './mock-transaction.repository';
import { TransactionFilter } from '../../core/domain/transaction.model';

describe('MockTransactionRepository', () => {
  let repository: MockTransactionRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockTransactionRepository]
    });
    
    repository = TestBed.inject(MockTransactionRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return all transactions when no filter is provided', (done) => {
    repository.getTransactions().subscribe(transactions => {
      expect(transactions).toBeTruthy();
      expect(transactions.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should filter transactions by ID', (done) => {
    const filter: TransactionFilter = {
      transactionId: 'TX123456'
    };
    
    repository.getTransactions(filter).subscribe(transactions => {
      expect(transactions.length).toBeLessThanOrEqual(1);
      if (transactions.length > 0) {
        expect(transactions[0].id).toContain('TX123456');
      }
      done();
    });
  });

  it('should filter transactions by date range', (done) => {
    const startDate = new Date('2025-03-11');
    const endDate = new Date('2025-03-15');
    
    const filter: TransactionFilter = {
      startDate,
      endDate
    };
    
    repository.getTransactions(filter).subscribe(transactions => {
      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        expect(transactionDate >= startDate).toBeTrue();
        expect(transactionDate <= endDate).toBeTrue();
      });
      done();
    });
  });

  it('should filter transactions by currency', (done) => {
    const filter: TransactionFilter = {
      currency: 'USD'
    };
    
    repository.getTransactions(filter).subscribe(transactions => {
      transactions.forEach(transaction => {
        expect(transaction.currency).toBe('USD');
      });
      done();
    });
  });

  it('should filter transactions by status', (done) => {
    const filter: TransactionFilter = {
      statusId: '2' // Completed
    };
    
    repository.getTransactions(filter).subscribe(transactions => {
      transactions.forEach(transaction => {
        expect(transaction.statusId).toBe('2');
      });
      done();
    });
  });

  it('should get a transaction by ID', (done) => {
    // Get all transactions first to find a valid ID
    repository.getTransactions().subscribe(allTransactions => {
      if (allTransactions.length > 0) {
        const id = allTransactions[0].id;
        
        repository.getTransactionById(id).subscribe(transaction => {
          expect(transaction).toBeTruthy();
          expect(transaction.id).toBe(id);
          done();
        });
      } else {
        // Skip test if no transactions
        done();
      }
    });
  });

  it('should throw error for non-existent transaction ID', () => {
    expect(() => {
      repository.getTransactionById('non-existent-id');
    }).toThrow();
  });

  it('should generate a report with date parameters', (done) => {
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-12-31');
    
    repository.generateReport(startDate, endDate).subscribe(reportUrl => {
      expect(reportUrl).toBeTruthy();
      expect(reportUrl).toContain('https://example.com/reports/transactions-');
      expect(reportUrl).toContain(startDate.toISOString().split('T')[0]);
      expect(reportUrl).toContain(endDate.toISOString().split('T')[0]);
      done();
    });
  });
});
