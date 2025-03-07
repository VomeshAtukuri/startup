import SearchBar from "@/components/SearchBar";
import PitchCard from "@/components/PitchCard";
import Image from "next/image";

import SignIn from '../components/sign-in';
export default function Home() {
  return (
    <div className="w-full mx-auto h-screen">
      <div className="w-full mx-auto justify-center items-center flex flex-col h-[350px] gap-4">
        <Image src="/Tag.png" alt="Vercel Logo" width={200} height={50} />
        <h1 className="text-3xl font-bold text-center">
          Welcome to Pitch Startup
        </h1>
        <p className="text-center">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchBar />
      </div>
      <div className="p-4">
        <PitchCard />
      </div>
    </div>
  );
}