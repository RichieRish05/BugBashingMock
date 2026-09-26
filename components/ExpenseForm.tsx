"use client";

import { useState, type FormEvent } from "react";
import { MEMBERS, MEMBER_IDS } from "@/lib/members";
import type { Expense, MemberId } from "@/lib/types";

interface Props {
  onCreated: (expense: Expense) => void;
}

export default function ExpenseForm({ onCreated }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState<MemberId>("ana");
  const [participants, setParticipants] = useState<MemberId[]>(MEMBER_IDS);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleParticipant(id: MemberId) {
    setParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description,
          amount: Number(amount),
          paidBy,
          participants,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(typeof body?.error === "string" ? body.error : "Something went wrong.");
        return;
      }
      onCreated(body as Expense);
      setDescription("");
      setAmount("");
      setPaidBy("ana");
      setParticipants(MEMBER_IDS);
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Amount (USD)
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Paid by
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value as MemberId)}>
          {MEMBERS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <legend style={{ fontSize: "0.9rem", marginBottom: 4 }}>Split among</legend>
        <div className="checks">
          {MEMBERS.map((m) => (
            <label key={m.id}>
              <input
                type="checkbox"
                checked={participants.includes(m.id)}
                onChange={() => toggleParticipant(m.id)}
              />
              {m.name}
            </label>
          ))}
        </div>
      </fieldset>
      {error ? <p className="error">{error}</p> : null}
      <div>
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "Add expense"}
        </button>
      </div>
    </form>
  );
}
