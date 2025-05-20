import { db } from "@/db";
import { eq, and, count } from "drizzle-orm";
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

  const Interactions = await db
    .select()
    .from(pitchInteractions)
    .where(and(condition1, condition2));
  
  const countlikesResult = await db
    .select({ count: count() })
    .from(pitchInteractions)
    .where(and(condition1, eq(pitchInteractions.liked, true)));

  const countdislikesResult = await db
    .select({ count: count() })
    .from(pitchInteractions)
    .where(and(condition1, eq(pitchInteractions.disliked, true)));

  const dislikes = countdislikesResult[0]?.count ?? 0;
  const likes = countlikesResult[0]?.count ?? 0;
 
  const datatosend = { ...Interactions[0], likes, dislikes };
  // console.log("Interactions data", datatosend);
  return new Response(JSON.stringify(datatosend), { status: 200 });
}
