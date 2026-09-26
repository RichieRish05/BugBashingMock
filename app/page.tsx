import ExpenseTracker from "@/components/ExpenseTracker";

export default function Home() {
  return (
    <main className="container">
      <h1>Cabin Trip</h1>
      <p className="subtitle">Shared expenses for Ana, Ben, Chloe, and Dev.</p>
      <ExpenseTracker />
    </main>
  );
}
