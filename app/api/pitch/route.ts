import { db } from "@/db";
import { pitchesTable, users } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm"
export async function POST(req: Request) {
  const session = await auth();
  const { title, description, category, link, pitch } = await req.json();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ message: "User Not Authenticated" }), {
      status: 401,
    });
  }

  await db.insert(pitchesTable).values({
    title,
    description,
    category,
    imagesrc: link,
    pitch,
    created: new Date(),
    views: 0,
    userid: session.user.id,
  });

  return new Response(JSON.stringify({ message: "Pitch Successfully added" }));
}

export async function GET() {
  const pitches = await db
    .select({
      id: pitchesTable.id,
      title: pitchesTable.title,
      description: pitchesTable.description,
      category: pitchesTable.category,
      imagesrc: pitchesTable.imagesrc,
      created: pitchesTable.created,
      views: pitchesTable.views,
      name: users.name,
      propic: users.image,
      userid: pitchesTable.userid
    })
    .from(pitchesTable)
    .innerJoin(users, eq(pitchesTable.userid, users.id));
  return new Response(JSON.stringify(pitches))
}