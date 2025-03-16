import { db } from "@/db";
import { eq } from "drizzle-orm";
import { pitchesTable } from "@/db/schema";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
  const { pitch_id } = await params;
  const pitch = await db
    .select()
    .from(pitchesTable)
    .where(eq(pitchesTable.id, pitch_id))
    .then((res) => res[0]);
  return (
    <div className="min-h-screen">
      <div
        className=" py-12 px-4 relative"
        style={{ backgroundImage: "url('/HomeBg.png')" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-400 text-center py-1 px-4 w-fit mx-auto mb-4">
            <span className="font-medium">{formatDate(pitch.created)}</span>
          </div>
          <div className="bg-black text-white text-center w-fit mx-auto py-4 px-8 mb-4">
            <h1 className="text-4xl font-extrabold uppercase">{pitch.title}</h1>
          </div>
          <p className="text-white text-center max-w-3xl mx-auto text-sm">
            {pitch.description}
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8">
      <Image src={pitch.image} alt="Adrian Hajdin" width={1000} height={500}  className="mb-4"/>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={pitch.image}
              alt="Adrian Hajdin"
              width={56}
              height={56}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold">{pitch.userid} - {pitch.title}</h3>
              <p className="text-gray-600">@adrianhajdin</p>
            </div>
          </div>
          <Badge className="bg-gray-100 text-sm text-gray-800 hover:bg-gray-100">
            Education
          </Badge>
        </div>
        {/* Pitch Details */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Pitch details</h3>
          <div className="space-y-4">
            <p className="text-gray-600">{pitch.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
