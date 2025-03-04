import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="w-full h-[50px] justify-between items-center p-8 flex bg-amber-100">
      <p className="text-2xl font-bold">YCDirectory</p>
      <div className="flex space-x-2">
        <ModeToggle />
        <Button variant="ghost" className="border-none" asChild>
          <Link href="/create">Create</Link>
        </Button>
        <Button variant="ghost" className="border-none">
          Sign In
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
