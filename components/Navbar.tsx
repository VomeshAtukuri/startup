import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signIn, auth } from "@/auth";
import { DialogButton } from "@/components/Dialog";
export default async function Navbar() {
  const session = await auth();
  const userid = session?.user?.id;
  return (
    <div className="max-w-screen h-[50px] justify-between items-center p-8 flex">
      <Link className="text-2xl font-bold" href="/" prefetch={false}>
        <span className="text-[#EF4444]">Pitch</span>
        Startup
      </Link>
      <div className="flex space-x-2">
        <ModeToggle />
        <Button
          variant="ghost"
          className="border-2 border-transparent hover:border-red-500 transition-all duration-200"
          asChild
        >
          <Link href="/create" prefetch={false}>
            Create
          </Link>
        </Button>
        {session ? (
          <>
            <DialogButton />
            <Link href={`/profile/${userid}`} prefetch={false}>
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} alt="Profile Picture"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </>
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
      </div>
    </div>
  );
}

