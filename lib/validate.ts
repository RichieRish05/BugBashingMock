import { isMemberId } from "./members";
import type { MemberId, NewExpenseInput } from "./types";

export type ParseResult =
  | { ok: true; value: NewExpenseInput }
  | { ok: false; error: string };

function fail(error: string): ParseResult {
  return { ok: false, error };
}

function hasAtMostTwoDecimals(amount: number): boolean {
  return Number(amount.toFixed(2)) === amount;
}

export function parseNewExpense(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return fail("Request body must be an object.");
  }
  const { description, amount, paidBy, participants } = body as Record<string, unknown>;

  if (typeof description !== "string" || description.trim() === "") {
    return fail("Description is required.");
  }
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return fail("Amount must be a positive number.");
  }
  if (!hasAtMostTwoDecimals(amount)) {
    return fail("Amount can have at most two decimal places.");
  }
  if (!isMemberId(paidBy)) {
    return fail("Unknown payer.");
  }
  if (!Array.isArray(participants) || participants.length === 0) {
    return fail("Choose at least one participant.");
  }
  if (!participants.every(isMemberId)) {
    return fail("Unknown participant.");
  }
  const unique: MemberId[] = Array.from(new Set(participants));

  return {
    ok: true,
    value: { description: description.trim(), amount, paidBy, participants: unique },
  };
}
