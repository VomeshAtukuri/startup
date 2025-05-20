import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { pitchInteractions } from "@/db/schema";

export async function POST(req: Request) {
  const { pitch_id, user_id, type } = await req.json();

  if (!pitch_id || !user_id) {
    return new Response(
      JSON.stringify({ message: "Missing Pitch ID or User ID" }),
      { status: 400 }
    );
  }

  const condition = and(
    eq(pitchInteractions.pitchId, pitch_id),
    eq(pitchInteractions.userId, user_id)
  );

  const existingInteraction = await db
    .select()
    .from(pitchInteractions)
    .where(condition)
    .then((res) => res[0]);

  if (existingInteraction) {
    let { liked, disliked } = existingInteraction;

    if (type === "like") {
      // Toggle like
      liked = !liked;
      // If liked is now true, reset dislike
      if (liked) disliked = false;
    } else if (type === "dislike") {
      // Toggle dislike
      disliked = !disliked;
      // If disliked is now true, reset like
      if (disliked) liked = false;
    }

    await db
      .update(pitchInteractions)
      .set({ liked, disliked })
      .where(condition);

    return new Response(
      JSON.stringify({ message: "Interaction Updated" }),
      { status: 200 }
    );
  }

  // No existing interaction — create new one
  await db.insert(pitchInteractions).values({
    pitchId: pitch_id,
    userId: user_id,
    liked: type === "like",
    disliked: type === "dislike",
  });

  return new Response(
    JSON.stringify({ message: "Interaction Added" }),
    { status: 200 }
  );
}
