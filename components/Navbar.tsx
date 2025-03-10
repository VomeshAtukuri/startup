import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signIn , signOut , auth } from "@/auth";
export default async function Navbar() {
  const session = await auth();
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
        {
          session ? (
            <Button variant="ghost" className="border-none" onClick={
              async () => {
                "use server";
                await signOut();
              } 
            }  
            >
              Logout
            </Button>
          ):(
            <Button variant="ghost" className="border-none" onClick={
              async () => {
                "use server";
                await signIn("github");
              }
            }>
              Login
            </Button>
          )
        }
        <Link href={`/profile/${session?.user?.id}`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
