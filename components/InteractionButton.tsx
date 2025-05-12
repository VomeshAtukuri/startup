"use client";
import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { Discussions } from "./Discussions";
import { useState } from "react";
import { useSession } from "next-auth/react";
export function InteractionButton({ pitch_id }: { pitch_id: string }) {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(false);
  const [save, setSave] = useState(false);
  function handleClick({ like }: { like: boolean }) {
    if (status === "unauthenticated") return;
    if (action) return;
    if (like) {
      setLikes(likes + 1);
    } else {
      setDislikes(dislikes + 1);
    }
    setAction(true);
  }
  return (
    <div className="flex items-center gap-4">
      <Discussions />
      <div className="cursor-pointer" onClick={() => setSave(!save)}>
        {save ? (
          <Bookmark size={20} strokeWidth={1.5} fill="#EF4444" />
        ) : (
          <Bookmark className="w-5 h-5" />
        )}
      </div>
      <div
        className={`flex items-center gap-1 ${
          action || status === "unauthenticated"
            ? "cursor-not-allowed opacity-80"
            : "cursor-pointer"
        }`}
        onClick={() => handleClick({ like: true })}
      >
        <ThumbsUp className={`${action ? "text-[#EF4444]" : ""}`} size={20} />
        <p className="text-xs">{likes}</p>
      </div>
      <div
        className={`flex items-center gap-1 ${
          action || status === "unauthenticated"
            ? "cursor-not-allowed opacity-80"
            : "cursor-pointer"
        }`}
        onClick={() => handleClick({ like: false })}
      >
        <ThumbsDown size={20} />
        <p className="text-xs">{dislikes}</p>
      </div>
    </div>
  );
}

