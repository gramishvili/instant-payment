/**
 * Transaction model representing financial transactions in the system
 */
export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  paymentId: string;
  senderId: string;
  senderName?: string;
  senderBankId: string;
  receiverId: string;
  receiverName?: string;
  receiverBankId: string;
  statusId: string;
  statusName?: string;
}

/**
 * Transaction filter criteria for searching transactions
 */
export interface TransactionFilter {
  transactionId?: string;
  startDate?: Date;
  endDate?: Date;
  senderBankId?: string;
  receiverBankId?: string;
  currency?: string;
  statusId?: string;
}
