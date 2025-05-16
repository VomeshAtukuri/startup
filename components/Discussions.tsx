"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";

export function Discussions({ pitch_id , isAuthenticated}: { pitch_id: string , isAuthenticated: boolean}) {
  console.log("Discussions",pitch_id, isAuthenticated);
  return (
    <Sheet>
      <SheetTrigger>
        <MessageCircle size={20}/>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Disscussions</SheetTitle>
          <SheetDescription>
            Share your thoughts on the startup.
          </SheetDescription>
        </SheetHeader>
        <SheetDescription className="px-5 w-full h-full flex items-center justify-center">
          <p className="text-lg font-semibold text-center text-red-600">
            Coming soon
            <span className="animate-pulse">.....
            </span>
          </p>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
