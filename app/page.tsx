import SearchBar from "@/components/SearchBar";
import PitchCard from "@/components/PitchCard";
import Image from "next/image";
import { data } from "@/mockdata";
// import SignIn from '../components/sign-in';
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();
  return (
    <div className="w-full mx-auto h-screen">
      <pre>
      {JSON.stringify(session?.user, null, 2)}
      </pre>
      {/* <div
        className="w-full mx-auto justify-center items-center flex flex-col h-[350px] gap-4"
        style={{ backgroundImage: "url('/HomeBg.png')" }}
      >
        <Image src="/Tag.png" alt="Vercel Logo" width={200} height={50} />
        <h1 className="text-3xl font-bold text-center">
          Welcome to Pitch Startup
        </h1>
        <p className="text-center">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchBar />
      </div>
      <div className="px-8 py-5 space-y-2 flex flex-col">
        <p className="text-lg font-bold">Recommended Startups</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((pitch, index) => (
            <PitchCard pitch={pitch} key={index} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
