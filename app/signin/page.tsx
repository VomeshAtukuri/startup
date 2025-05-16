// import { signIn } from "next-auth/react";

// type ProvidersType = Record<string, { id: string; name: string }>;

// function signin({ providers }: { providers: ProvidersType }) {
//   return (
//     <div>
//       {Object.values(providers).map((provider) => {
//         return (
//           <div key={provider.name}>
//             <button onClick={() => signIn(provider.id)}>
//               Sign in with {provider.name}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default signin;

import { signIn } from "next-auth/react";
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

