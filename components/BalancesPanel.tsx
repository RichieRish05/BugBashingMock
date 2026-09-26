import { computeBalances } from "@/lib/balances";
import { MEMBERS, memberName } from "@/lib/members";
import { formatCents } from "@/lib/money";
import type { Expense } from "@/lib/types";

interface Props {
  expenses: Expense[];
}

export default function BalancesPanel({ expenses }: Props) {
  const balances = computeBalances(expenses, MEMBERS);

  return (
    <ul className="balances">
      {balances.map(({ memberId, netCents }) => {
        const name = memberName(memberId);
        if (netCents > 0) {
          return (
            <li key={memberId}>
              <span>{name} is owed</span>
              <span className="positive">{formatCents(netCents)}</span>
            </li>
          );
        }
        if (netCents < 0) {
          return (
            <li key={memberId}>
              <span>{name} owes</span>
              <span className="negative">{formatCents(-netCents)}</span>
            </li>
          );
        }
        return (
          <li key={memberId}>
            <span>{name}</span>
            <span className="settled">is settled up</span>
          </li>
        );
      })}
    </ul>
  );
}
