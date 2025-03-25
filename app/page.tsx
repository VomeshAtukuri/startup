"use client";
import SearchBar from "@/components/SearchBar";
import PitchCard from "@/components/PitchCard";
import Image from "next/image";
import { CategorySelect } from "@/components/CategorySelect";
import { useEffect, useState } from "react";
import SkeletonPitchCard from "@/components/PitchCardSkeleton";
interface Pitch {
  id: string;
  title: string;
  description: string;
  category: string;
  imagesrc: string;
  created: string;
  views: number;
  name: string;
  propic: string;
  userid: string;
}
export default function Home() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<Pitch[]>([]);
  useEffect(() => {
    const fetchPitches = async () => {
      const result = await fetch("/api/pitch");
      const data = await result.json();
      setData(data);
      setLoading(false);
    };
    fetchPitches();
  }, []);

  const Pitches = data
    .filter((pitch) => {
      if (category === "all") {
        return true;
      }
      return pitch.category === category;
    })
    .filter((pitch) => {
      if (searchTerm === "") {
        return true;
      }
      return pitch.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="w-full mx-auto h-screen">
      <div
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
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div className="px-12 py-5 space-y-2 flex flex-col">
        <div className="flex justify-between mx-5 my-3">
          <p className=" text-lg md:text-xl font-bold ">Recommended Startups</p>
          <div className="hidden md:block">
            <CategorySelect category={category} setCategory={setCategory} />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-x-0 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((x: number, id: number) => (
              <SkeletonPitchCard key={id} />
            ))}
          </div>
        ) : Pitches.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-500">No pitches found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-0 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
            {Pitches.map((pitch: Pitch, id: number) => (
              <PitchCard pitch={pitch} key={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
