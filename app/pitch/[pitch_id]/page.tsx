import Image from "next/image";
export default async function PitchDetails({params} : {params: {pitch_id: string}}) {
  const { pitch_id } = await params;
  console.log(pitch_id);
  return (
    <div
      className="w-full h-80 flex justify-center items-center"
      // style={{ backgroundImage: "url('/HomeBg.png')" }}
    >
        {pitch_id}
    </div>
  );
}

