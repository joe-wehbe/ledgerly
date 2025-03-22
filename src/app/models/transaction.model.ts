import { Account } from "./account.model"

export interface Transaction {
  id: number,
  from: Account,
  to: Account,
  date: Date
  time: string, 
  amount: number,
  type: 'income' | 'expense',
}