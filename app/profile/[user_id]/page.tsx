import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  if (!session) return redirect("/api/auth/signin");

  const data = await fetch(`http://localhost:3000/api/user`).then((res) =>
    res.json()
  );

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col p-4">
        <p className="font-bold text-2xl">{data?.message}</p>
        {/* <p>{data?.email}</p>
        <p>{data?.bio}</p> */}
      </div>
    </div>
  );
}
