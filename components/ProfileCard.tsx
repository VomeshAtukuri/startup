import Image from "next/image";
import { Eye, Pen } from "lucide-react";
interface ProfileComponentProps {
  name: string;
  image: string;
  email: string;
  pitchesLength: number;
  totalViews?: number;
}

export default function ProfileCard({
  name,
  image,
  email,
  pitchesLength,
  totalViews,
}: ProfileComponentProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white py-3 px-6 rounded-xl text-center border-2 border-black border-b-[6px] border-r-[4px] shadow-md -mb-7 z-10 dark:bg-gray-800 dark:border-white rotate-[2deg]">
        <h1 className="text-2xl md:text-xl overflow-hidden whitespace-nowrap">
          {name}
        </h1>
      </div>

      <div
        className="w-[280px] bg-gradient-to-b from-[#f03a7a] to-[#d92663] rounded-[40px] overflow-hidden border-4 
                      border-r-[6px] border-b-[6px] border-black dark:border-white  shadow-lg"
      >
        <div className="pt-8 pb-6 px-6 flex flex-col items-center">
          <div className="w-[160px] h-[160px] rounded-full border-[6px] border-white mb-4 overflow-hidden shadow-lg">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={name || "Profile Picture"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h3 className="text-white text-xl font-bold">{`@${
            email.trim().split("@")[0]
          }`}</h3>
          <p className="text-white text-lg opacity-90 mb-4">{25}</p>

          <div className="w-full h-[1px] bg-white opacity-30 my-2"></div>

          <div className="flex justify-between w-full px-6 mt-2 text-white">
            <div className="flex items-center gap-2">
              <Eye className="text-xl opacity-80" />
              <span className="text-lg font-semibold">
                {totalViews || 0}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Pen className="text-xl opacity-80" />
              <span className="text-lg font-semibold">{pitchesLength}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



