import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit">Signin with GitHub</Button>
      </form>
    </div>
  );
}
