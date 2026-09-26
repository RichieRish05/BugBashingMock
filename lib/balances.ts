import { dollarsToCents } from "./money";
import type { Expense, Member, MemberId } from "./types";

export interface Balance {
  memberId: MemberId;
  /** Positive: the group owes this member. Negative: this member owes the group. */
  netCents: number;
}

/**
 * Splits an integer number of cents into n integer shares that add up
 * exactly. Any leftover pennies go to the first participants.
 */
export function splitCents(totalCents: number, n: number): number[] {
  if (n <= 0) return [];
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => (i < remainder ? base + 1 : base));
}

export function computeBalances(expenses: Expense[], members: Member[]): Balance[] {
  const net = new Map<MemberId, number>(members.map((m) => [m.id, 0]));
  const add = (id: MemberId, delta: number) => {
    net.set(id, (net.get(id) ?? 0) + delta);
  };

  for (const expense of expenses) {
    const totalCents = dollarsToCents(expense.amount);
    add(expense.paidBy, totalCents);
    // The payer doesn't owe themselves, so only split the cost among the others.
    const debtors = expense.participants.filter((id) => id !== expense.paidBy);
    const shares = splitCents(totalCents, debtors.length);
    debtors.forEach((id, i) => add(id, -shares[i]));
  }

  return members.map((m) => ({ memberId: m.id, netCents: net.get(m.id) ?? 0 }));
}
