import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GetTransactionsUseCase } from './get-transactions.use-case';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';
import { TRANSACTION_REPOSITORY } from '../interfaces/repository.tokens';
import { Transaction, TransactionFilter } from '../domain/transaction.model';

describe('GetTransactionsUseCase', () => {
  let useCase: GetTransactionsUseCase;
  let mockTransactionRepository: jasmine.SpyObj<ITransactionRepository>;
  
  const mockTransactions: Transaction[] = [
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
    }
  ];

  beforeEach(() => {
    // Create a mock of the transaction repository
    mockTransactionRepository = jasmine.createSpyObj<ITransactionRepository>('ITransactionRepository', [
      'getTransactions',
      'getTransactionById',
      'generateReport'
    ]);
    
    TestBed.configureTestingModule({
      providers: [
        GetTransactionsUseCase,
        { provide: TRANSACTION_REPOSITORY, useValue: mockTransactionRepository }
      ]
    });
    
    useCase = TestBed.inject(GetTransactionsUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return all transactions when no filter is provided', (done) => {
    // Setup the mock to return test data
    mockTransactionRepository.getTransactions.and.returnValue(of(mockTransactions));
    
    // Execute the use case
    useCase.execute().subscribe(transactions => {
      // Verify the result
      expect(transactions).toEqual(mockTransactions);
      expect(transactions.length).toBe(2);
      expect(mockTransactionRepository.getTransactions).toHaveBeenCalledWith(undefined);
      done();
    });
  });

  it('should apply filter when provided', (done) => {
    // Setup the mock to return filtered data
    const filteredTransactions = [mockTransactions[0]]; // Just the first transaction
    mockTransactionRepository.getTransactions.and.returnValue(of(filteredTransactions));
    
    // Create a filter
    const filter: TransactionFilter = {
      currency: 'USD'
    };
    
    // Execute the use case with filter
    useCase.execute(filter).subscribe(transactions => {
      // Verify the result
      expect(transactions).toEqual(filteredTransactions);
      expect(transactions.length).toBe(1);
      expect(mockTransactionRepository.getTransactions).toHaveBeenCalledWith(filter);
      done();
    });
  });
});
