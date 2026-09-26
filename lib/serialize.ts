import type { StoredExpense } from "./store";
import type { Expense } from "./types";

/** Converts a stored record (integer cents) into the shape the client uses (dollars). */
export function toExpense(stored: StoredExpense): Expense {
  return {
    ...stored,
    amount: stored.amount / 100,
    participants: [...stored.participants],
  };
}
