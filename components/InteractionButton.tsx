// Resaon for not using useSession() directly
// You noticed useSession() updates slowly after login/logout because it uses a cached 
// React context and fetches session info via an API route.
// Server-side auth like auth() is always fresh because it reads cookies directly on each request.

"use client";
import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { Discussions } from "./Discussions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function InteractionButton({
  pitch_id,
  user_id,
}: {
  pitch_id: string;
  user_id: string;
}) {
  const [likes, setLikes] = useState(99);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState("");
  const [save, setSave] = useState(false);
  
  const isAuthenticated = user_id !== "guest";

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchData() {
        const res = await fetch(
          `/api/interaction?pitch_id=${pitch_id}&user_id=${user_id}`
        );
        const data = await res.json();
        setSave(data[0]?.bookmarked || false);
      }
      fetchData();
    } else {
      setSave(false);
    }
  }, [pitch_id, user_id, isAuthenticated]);

  //Likes function
  function handleClick({ like }: { like: boolean }) {
    if (!isAuthenticated) {
      toast.info("You must be logged in to interact with a pitch");
      return;
    }
    if (like) {
      setLikes((prev) => prev + 1);
      setAction("like");
    } else {
      setDislikes((prev) => prev + 1);
      setAction("dislike");
    }
  }

  //Bookmark function
  async function handleSave() {
    if (!isAuthenticated) {
      toast.info("You must be logged in to save a pitch");
      return;
    }

    const body = {
      pitch_id,
      user_id,
      remove: save,
      type: "bookmark",
    };

    const response = await fetch("/api/bookmark", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      toast[save ? "error" : "success"](data.message);
      setSave(!save);
    }
  }

  return (
    <div className="flex items-center gap-4 justify-baseline">
      <Discussions pitch_id={pitch_id} isAuthenticated={isAuthenticated} />

      <div
        className={`cursor-pointer ${
          !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={isAuthenticated ? handleSave : () => toast.info("You must be logged in to save a pitch")}
      >
        {save ? (
          <Bookmark size={20} strokeWidth={1.5} fill="#EF4444" />
        ) : (
          <Bookmark size={20} />
        )}
      </div>

      <div
        className={`flex items-center gap-1 cursor-pointer ${
          !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() =>
          isAuthenticated
            ? handleClick({ like: true })
            : toast.info("You must be logged in to like a pitch")
        }
      >
        <ThumbsUp
          className={`${action === "like" ? "text-[#EF4444]" : ""}`}
          size={20}
        />
        {action === "like" && <p className="text-xs">{likes}</p>}
      </div>

      <div
        className={`flex items-center gap-1 cursor-pointer ${
          !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() =>
          isAuthenticated
            ? handleClick({ like: false })
            : toast.info("You must be logged in to dislike a pitch")
        }
      >
        <ThumbsDown
          className={`${action === "dislike" ? "text-[#EF4444]" : ""}`}
          size={20}
        />
        {action === "dislike" && <p className="text-xs">{dislikes}</p>}
      </div>
    </div>
  );
}
