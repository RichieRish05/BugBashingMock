"use client";

import { useState } from "react";
import { memberName } from "@/lib/members";
import { formatDollars } from "@/lib/money";
import type { Expense } from "@/lib/types";

interface Props {
  expenses: Expense[];
  onDeleted: (id: string) => void;
}

export default function ExpenseList({ expenses, onDeleted }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (res.status === 204 || res.status === 404) {
        onDeleted(id);
      }
    } finally {
      setDeleting(null);
    }
  }

  if (expenses.length === 0) {
    return <p className="empty">No expenses yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Date</th>
          <th className="amount">Amount</th>
          <th>Paid by</th>
          <th>Split among</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td className="id">{expense.id}</td>
            <td>{expense.description}</td>
            <td>{expense.date}</td>
            <td className="amount">{formatDollars(expense.amount)}</td>
            <td>{memberName(expense.paidBy)}</td>
            <td>{expense.participants.map(memberName).join(", ")}</td>
            <td>
              <button
                className="btn-link"
                type="button"
                onClick={() => handleDelete(expense.id)}
                disabled={deleting === expense.id}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
