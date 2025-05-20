"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Dialogtologin() {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleClick(){
    router.push("/api/auth/signin")
    setOpen(false)
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => setOpen(true), 60000); // 60000 milliseconds = 1 minute
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
          <p className="text-sm text-muted-foreground">
            You&apos;re currently not logged in. Some features might be unavailable. Please log in for full access.
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleClick}
            className="bg-[#EF4444]"
            variant={"ghost"}
          >
            Log In with GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

