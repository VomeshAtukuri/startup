import { db } from "@/db";
import { pitchesTable, users } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const link = formData.get("link") as File;
  const pitch = formData.get("pitch") as string;

  const uploadFormData = new FormData();
  uploadFormData.append("file", link, link.name);


  const imagesrc = await fetch(`${process.env.HOSTNAME}/api/files`, {
    method: "POST",
    body: uploadFormData,
  });
  const imagelink = await imagesrc.json();
 

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ message: "User Not Authenticated" }), {
      status: 401,
    });
  }

  await db.insert(pitchesTable).values({
    title,
    description,
    category,
    imagesrc: imagelink,
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
      userid: pitchesTable.userid,
    })
    .from(pitchesTable)
    .innerJoin(users, eq(pitchesTable.userid, users.id));
  return new Response(JSON.stringify(pitches));
}
