"use client";

import { useCallback, useEffect, useState } from "react";
import type { Expense } from "@/lib/types";
import BalancesPanel from "./BalancesPanel";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

type Status = "loading" | "ready" | "error";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/expenses")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        return res.json() as Promise<Expense[]>;
      })
      .then((data) => {
        if (cancelled) return;
        setExpenses(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreated = useCallback((expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  const handleDeleted = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  if (status === "error") {
    return <p className="error">Couldn&apos;t load expenses. Is the dev server running?</p>;
  }

  return (
    <div className="grid">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <section className="panel" aria-labelledby="expenses-heading">
          <h2 id="expenses-heading">Expenses</h2>
          {status === "loading" ? (
            <p className="empty">Loading…</p>
          ) : (
            <ExpenseList expenses={expenses} onDeleted={handleDeleted} />
          )}
        </section>
        <section className="panel" aria-labelledby="add-heading">
          <h2 id="add-heading">Add an expense</h2>
          <ExpenseForm onCreated={handleCreated} />
        </section>
      </div>
      <section className="panel" aria-labelledby="balances-heading">
        <h2 id="balances-heading">Balances</h2>
        <BalancesPanel expenses={expenses} />
      </section>
    </div>
  );
}
