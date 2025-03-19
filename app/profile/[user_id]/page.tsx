// import { auth } from "@/auth";
// const session = await auth();
// if (!session) return redirect("/api/auth/signin");
// import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import PitchCard from "@/components/PitchCard";
import { data } from "@/mockdata";
export default async function Profile({ params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  console.log(user_id);
  try {
    const res = await fetch(`http://localhost:3000/api/user/${user_id}`);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data2 = await res.json();
    return (
      <div className="container-xl bg-red-200 mx-auto mt-2 flex justify-around h-screen">
        <ProfileCard name={data2.name} image={data2.image} email={data2.email} />
        <div className="grid grid-cols-2 gap-4">
        {data.map((pitch, index) => (
            <PitchCard pitch={pitch} key={index} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="flex flex-col p-4">
          <p className="font-bold text-2xl">Error fetching user data</p>
        </div>
      </div>
    );
  }
}