import { deleteExpense } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;
  if (!deleteExpense(id)) {
    return Response.json({ error: `No expense with id ${id}.` }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
