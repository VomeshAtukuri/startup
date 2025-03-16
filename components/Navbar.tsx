import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
export default function Navbar() {
  const user_id = "1";
  return (
    <div className="w-full h-[50px] justify-between items-center p-8 flex">
      <Link className="text-2xl font-bold" href="/">
        YCDirectory
      </Link>
      <div className="flex space-x-2">
        <ModeToggle />
        <Button variant="ghost" className="border-none" asChild>
          <Link href="/create">Create</Link>
        </Button>
        <Button
          variant="ghost"
          className="border-2 border-transparent hover:border-red-500 transition-all duration-200"
        >
          Sign In
        </Button>
        <Link href={`/profile/${user_id}`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
