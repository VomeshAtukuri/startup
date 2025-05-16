import { db } from "@/db";
import { eq } from "drizzle-orm";
import { pitchesTable, users } from "@/db/schema";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { InteractionButton } from "@/components/InteractionButton";
const formatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default async function PitchDetails({
  params,
}: {
  params: Promise<{ pitch_id: string }>;
}) {
  const session = await auth();
  const { pitch_id } = await params;
  const pitch = await db
    .select({
      title: pitchesTable.title,
      description: pitchesTable.description,
      category: pitchesTable.category,
      imagesrc: pitchesTable.imagesrc,
      pitch: pitchesTable.pitch,
      userid: pitchesTable.userid,
      created: pitchesTable.created,
      views: pitchesTable.views,
      name: users.name,
      email: users.email,
      image: users.image,
    })
    .from(pitchesTable)
    .innerJoin(users, eq(pitchesTable.userid, users.id))
    .where(eq(pitchesTable.id, pitch_id))
    .then((res) => res[0]);

  if (session?.user?.id !== pitch.userid) {
    await db
      .update(pitchesTable)
      .set({ views: pitch.views + 1 })
      .where(eq(pitchesTable.id, pitch_id));
  }

  return (
    <div className="min-h-screen">
      <div
        className="py-12 px-4 relative"
        style={{ backgroundImage: "url('/HomeBg.png')" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FBE843] text-center py-1 px-4 w-fit mx-auto mb-2 rounded-2xl">
            <span className="font-medium">{formatDate(pitch.created)}</span>
          </div>
          <div className="bg-black text-white text-center w-fit mx-auto py-2 px-8 mb-2">
            <h1 className="text-4xl font-extrabold uppercase">{pitch.title}</h1>
          </div>
          <p className="text-white text-center max-w-3xl mx-auto text-sm">
            {pitch.description}
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative w-full aspect-[2/1] mb-4 overflow-hidden rounded-lg">
          <Image
            src={pitch.imagesrc}
            alt={pitch.title}
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="flex justify-between items-center mb-8 p-2">
          <div className="flex items-center gap-4">
            <Avatar className="size-12">
              <AvatarImage
                src={pitch.image || "/placeholder.svg"}
                alt="Profile Picture"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">
                {pitch.name} - {pitch.title}
              </h3>
              <p className="text-gray-600">
                @{pitch.email?.trim().split("@")[0]}
              </p>
            </div>
          </div>
          <Badge className="text-xs rounded-4xl">{pitch.category}</Badge>
        </div>
        <div className="mb-12 p-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-2xl font-bold mb-4">Pitch details</h3>
            <InteractionButton
              user_id={session?.user?.id || "guest"}
              pitch_id={pitch_id}
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white">{pitch.pitch}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
