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
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  const [action, setAction] = useState("");
  const [save, setSave] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  const isAuthenticated = user_id !== "guest";

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchData() {
        const res = await fetch(
          `/api/interaction?pitch_id=${pitch_id}&user_id=${user_id}`
        );
        const data = await res.json();
        setSave(data?.bookmarked || false);
        setLikes(data?.liked || false);
        setDislikes(data?.disliked || false);
        setLikesCount(data?.likes || 0);
        setDislikesCount(data?.dislikes || 0);
        if (data?.liked) setAction("like");
        if (data?.disliked) setAction("dislike");
      }
      fetchData();
    } else {
      setSave(false);
      setLikes(false);
      setDislikes(false);
      setLikesCount(0);
      setDislikesCount(0);
    }
  }, [pitch_id, user_id, isAuthenticated]);

  async function handleClick({ like }: { like: boolean }) {
    if (!isAuthenticated) {
      toast.info("You must be logged in to interact with a pitch");
      return;
    }

    const type = like ? "like" : "dislike";
    const isSameAction = action === type;

    const body = {
      pitch_id,
      user_id,
      type,
    };

    const response = await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      if (isSameAction) {
        // Undo current action
        if (like) setLikesCount((prev) => prev - 1);
        else setDislikesCount((prev) => prev - 1);

        setLikes(false);
        setDislikes(false);
        setAction("");
      } else {
        // Adjust counts
        if (like) {
          setLikesCount((prev) => prev + 1);
          if (dislikes) setDislikesCount((prev) => prev - 1);
        } else {
          setDislikesCount((prev) => prev + 1);
          if (likes) setLikesCount((prev) => prev - 1);
        }

        setLikes(like);
        setDislikes(!like);
        setAction(type);
      }
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

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
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

  return (
    <div className="flex items-center gap-4 justify-baseline">
      <Discussions pitch_id={pitch_id} isAuthenticated={isAuthenticated} />

      <div
        className={`cursor-pointer ${
          !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={
          isAuthenticated
            ? handleSave
            : () => toast.info("You must be logged in to save a pitch")
        }
      >
        <Bookmark
          size={20}
          strokeWidth={1.5}
          fill={save ? "#EF4444" : "none"}
        />
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
          className={action === "like" ? "text-[#EF4444]" : ""}
          size={20}
        />
        <p className="text-xs">{likesCount}</p>
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
          className={action === "dislike" ? "text-[#EF4444]" : ""}
          size={20}
        />
        <p className="text-xs">{dislikesCount}</p>
      </div>
    </div>
  );
}
