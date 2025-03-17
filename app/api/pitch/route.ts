import { db } from "@/db";
import { pitchesTable } from "@/db/schema";
import { auth } from "@/auth";
export async function POST(req: Request) {
  const session = await auth();
  const { title, description, category, link, pitch } = await req.json();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ message: "User not authenticated" }), {
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

  return new Response(JSON.stringify({ message: "success" }));
}
