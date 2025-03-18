import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Profile({ params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  // const session = await auth();
  // if (!session) return redirect("/api/auth/signin");
  console.log(user_id);

  try {
    const res = await fetch(`http://localhost:3000/api/user/${user_id}`);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="flex flex-col p-4">
          <p className="font-bold text-2xl">Profile</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="flex flex-col p-4">
          <p className="font-bold text-2xl">Error fetching user data</p>
        </div>
      </div>
    );
  }
}