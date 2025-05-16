import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { pitchInteractions,pitchesTable, users } from "@/db/schema";

export async function POST(request: Request) {
  const { type, pitch_id, user_id, remove } = await request.json();
  // const { pitch_id, user_id, remove } = await request.json();
  console.log("Data Received", pitch_id, user_id, remove);
  console.log("Type Received", type);
  switch (type) {
    //To mark a pitch as bookmark and unbookmark
    case "bookmark":
      return handleSave(pitch_id, user_id, remove);
    //To get all pitches bookmarked by a user
    case "bookmarkedbyuser":
      return getbookmarkedPitches(user_id);
    default:
      return new Response(JSON.stringify({ message: "Invalid type" }), { status: 400 });
  }
}

async function handleSave(pitch_id: string, user_id: string, remove: boolean) {
  console.log("Data Received", pitch_id, user_id, remove);
  if(!pitch_id || !user_id) return new Response(JSON.stringify({ message: "Missing Pitch ID or User ID" }), { status: 400 });
  const condition1 = eq(pitchInteractions.pitchId, pitch_id);
  const condition2 = eq(pitchInteractions.userId, user_id);

  const existingInteraction = await db
    .select()
    .from(pitchInteractions)
    .where(and(condition1, condition2))
    .then(res => res[0]);

  if (existingInteraction) {
    if (remove) {
      await db
        .update(pitchInteractions)
        .set({ bookmarked: false })
        .where(and(condition1, condition2));
      return new Response(JSON.stringify({ message: "Bookmark Removed" }), {
        status: 200,
      });
    } else if (!existingInteraction.bookmarked) {
      await db
        .update(pitchInteractions)
        .set({ bookmarked: true })
        .where(and(condition1, condition2));
      return new Response(JSON.stringify({ message: "Bookmark Added" }), {
        status: 200,
      });
    }
  } else {
    await db
      .insert(pitchInteractions)
      .values({ pitchId: pitch_id, userId: user_id, bookmarked: true });
    return new Response(JSON.stringify({ message: "Bookmark Added" }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify({ message: "No changes made" }), {
    status: 200,
  });
}


async function getbookmarkedPitches(user_id: string) {
  const condition1 = eq(pitchInteractions.userId, user_id);
  const condition2 = eq(pitchInteractions.bookmarked, true);
  const bookmarkedPitches = await db
    .select({
      id: pitchesTable.id,
      title: pitchesTable.title,
      description: pitchesTable.description,
      category: pitchesTable.category,
      imagesrc: pitchesTable.imagesrc,
      created: pitchesTable.created,
      views: pitchesTable.views,
      name: users.name,
      email: users.email,
      image: users.image,
    })
    .from(pitchesTable)
    .innerJoin(users, eq(pitchesTable.userid, users.id))
    .innerJoin(
      pitchInteractions,
      eq(pitchesTable.id, pitchInteractions.pitchId)
    )
    .where(and(condition1, condition2));
  
  if(!bookmarkedPitches.length) return new Response(JSON.stringify({ message: "No Bookmarked Pitches" }), { status: 200 });
  console.log("Bookmarked Pitches", bookmarkedPitches);

  return new Response(JSON.stringify(bookmarkedPitches), { status: 200 });
}