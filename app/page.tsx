import SearchBar from "@/components/SearchBar";
import PitchCard from "@/components/PitchCard";
export default function Home() {
  return (
    <div className="w-full mx-auto h-screen">
      <div className="flex flex-col justify-center h-[350px] gap-4 bg-amber-50">
        <p className="text-center">Pitch, Vote & Grow Startup</p>
        <h1 className="text-3xl font-bold text-center">Welcome to Pitch Startup</h1>
        <p className="text-center">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        <SearchBar />
      </div>
      <div className="p-5">
      <PitchCard/>
      </div>
    </div>
  );
}
