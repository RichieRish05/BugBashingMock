export type MemberId = "ana" | "ben" | "chloe" | "dev";

export interface Member {
  id: MemberId;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  /** Dollars, e.g. 19.99 for $19.99. */
  amount: number;
  paidBy: MemberId;
  participants: MemberId[];
  /** YYYY-MM-DD */
  date: string;
}

export interface NewExpenseInput {
  description: string;
  /** Dollars, e.g. 19.99 for $19.99. */
  amount: number;
  paidBy: MemberId;
  participants: MemberId[];
}
