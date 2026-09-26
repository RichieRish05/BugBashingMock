const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatDollars(amount: number): string {
  return usd.format(amount);
}

export function formatCents(cents: number): string {
  return formatDollars(cents / 100);
}

export function dollarsToCents(amount: number): number {
  return Math.round(amount * 100);
}
