import Image from "next/image";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { pitchesTable } from "@/db/schema";

export default async function PitchDetails({params} : {params: Promise<{pitch_id: string}>}) {
    const { pitch_id } = await params
    const Dbdata = await db.select().from(pitchesTable).where(eq(pitchesTable.id, pitch_id));
    console.log(pitch_id);
    return (
        <div className="min-h-screen">
              <div
                className="w-full h-60 flex flex-col gap-1.5 justify-center items-center"
                style={{ backgroundImage: "url('/HomeBg.png')" }}
              >
                {/* <Image
                  src="/Frame 74.png"
                  alt="Logo"
                  width={350}
                  height={45}
                  className="object-contain"
                  priority
                /> */}
                <p className="px-1.75 py-2.5 bg-black text-white text-xl text-center uppercase font-extrabold dark:bg-white dark:text-black">
                    {Dbdata[0].title}
                </p>
                <p className="text-center text-sm">{Dbdata[0].description}</p>
              </div>
              <pre>
                {JSON.stringify(Dbdata, null, 2)}
              </pre>
        </div>
    );
}

