import { toExpense } from "@/lib/serialize";
import { createExpense, listExpenses } from "@/lib/store";
import { parseNewExpense } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(listExpenses().map(toExpense));
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = parseNewExpense(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const created = createExpense(parsed.value);
  return Response.json(created, { status: 201 });
}
