import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { pitchesTable } from "@/db/schema";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;
  const userData = await db.select().from(users).where(eq(users.id, user_id));
  const pitches = await db.select({
    id: pitchesTable.id,
    title: pitchesTable.title,
    description: pitchesTable.description,
    category: pitchesTable.category,
    imagesrc: pitchesTable.imagesrc,
    created: pitchesTable.created,
    views: pitchesTable.views
  }).from(pitchesTable).where(eq(pitchesTable.userid, user_id)); 
  const data = { ...userData[0], pitches };
  // console.log(">>>>>>><<<<<<<<",data);
  return new Response(JSON.stringify(data), { status: 200 });
}
