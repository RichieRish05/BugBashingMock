import { dollarsToCents } from "./money";
import type { MemberId, NewExpenseInput } from "./types";

export interface StoredExpense {
  id: string;
  description: string;
  /** Integer cents. 4800 means $48.00. */
  amount: number;
  paidBy: MemberId;
  participants: MemberId[];
  /** YYYY-MM-DD */
  date: string;
}

interface Store {
  expenses: StoredExpense[];
}

const SEED: StoredExpense[] = [
  {
    id: "EXP-001",
    description: "Dinner",
    amount: 3000,
    paidBy: "ana",
    participants: ["ana", "ben", "chloe"],
    date: "2026-09-19",
  },
  {
    id: "EXP-002",
    description: "Groceries",
    amount: 4800,
    paidBy: "ben",
    participants: ["ana", "ben", "chloe", "dev"],
    date: "2026-09-20",
  },
  {
    id: "EXP-003",
    description: "Firewood",
    amount: 2000,
    paidBy: "chloe",
    participants: ["chloe", "dev"],
    date: "2026-09-21",
  },
];

function createStore(): Store {
  return {
    expenses: SEED.map((e) => ({ ...e, participants: [...e.participants] })),
  };
}

// Keep the store on globalThis so Next.js dev-mode hot reloads don't reset it.
const globalRef = globalThis as { __expenseStore?: Store };

function getStore(): Store {
  if (!globalRef.__expenseStore) {
    globalRef.__expenseStore = createStore();
  }
  return globalRef.__expenseStore;
}

// Short, human-readable IDs that show up in the list.
function nextId(store: Store): string {
  return `EXP-${String(store.expenses.length + 1).padStart(3, "0")}`;
}

function localIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Newest first. */
export function listExpenses(): StoredExpense[] {
  return [...getStore().expenses].reverse();
}

export function createExpense(input: NewExpenseInput, today: Date = new Date()): StoredExpense {
  const store = getStore();
  const expense: StoredExpense = {
    id: nextId(store),
    description: input.description,
    amount: dollarsToCents(input.amount),
    paidBy: input.paidBy,
    participants: [...input.participants],
    date: localIsoDate(today),
  };
  store.expenses.push(expense);
  return expense;
}

export function deleteExpense(id: string): boolean {
  const store = getStore();
  const index = store.expenses.findIndex((e) => e.id === id);
  if (index === -1) return false;
  store.expenses.splice(index, 1);
  return true;
}
