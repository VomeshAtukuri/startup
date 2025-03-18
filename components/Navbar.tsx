import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signIn, signOut, auth } from "@/auth";
export default async function Navbar() {
  const session = await auth();
  const userid = session?.user?.id;
  return (
    <div className="w-full h-[50px] justify-between items-center p-8 flex">
      <Link className="text-2xl font-bold" href="/">
        YCDirectory
      </Link>
      <div className="flex space-x-2">
        <ModeToggle />
        <Button
          variant="ghost"
          className="border-2 border-transparent hover:border-red-500 transition-all duration-200"
          asChild
        >
          <Link href="/create">Create</Link>
        </Button>
        {session ? (
          <Button
            variant="ghost"
            className="border-2 border-transparent hover:border-red-500 transition-all duration-200"
            onClick={async () => {
              "use server";
              await signOut();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="border-2 border-transparent hover:border-red-500 transition-all duration-200"
            onClick={async () => {
              "use server";
              await signIn("github");
            }}
          >
            Login
          </Button>
        )}
        <Link href={`/profile/${userid}`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
