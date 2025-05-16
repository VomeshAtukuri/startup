import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { pitchInteractions } from "@/db/schema";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pitch_id = searchParams.get("pitch_id");
  const user_id = searchParams.get("user_id");

  if (!pitch_id || !user_id) {
    return new Response(JSON.stringify({ error: "Missing pitch_id or user_id" }), { status: 400 });
  }

  const condition1 = eq(pitchInteractions.pitchId, pitch_id);
  const condition2 = eq(pitchInteractions.userId, user_id);
  const data = await db
    .select()
    .from(pitchInteractions)
    .where(and(condition1, condition2));
  console.log("Interactions data", data);
  return new Response(JSON.stringify(data), { status: 200 });
}
