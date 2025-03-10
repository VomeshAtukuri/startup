"use client"
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status }= useSession();
  const {user_id} = useParams();
  if(status === "unauthenticated") return redirect("/api/auth/signin");
  return (
    <div className="container mx-auto justify-center items-center flex h-screen">
      <p> {user_id} </p>
    </div>
  );
}
