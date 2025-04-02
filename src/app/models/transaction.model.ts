import { Account } from "./account.model";

export interface Transaction {
  id: number,
  account: Account,
  date: Date,
  amount: number | null,
  type: 'income' | 'expense',
}