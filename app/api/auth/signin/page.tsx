import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Signin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="hidden lg:flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Image src="/signin.svg" alt="Signin" width={500} height={500} />
      </div>

      <div className="flex items-center justify-center bg-gray-50 px-6 py-12 dark:bg-gray-700">
        <Card className="w-full max-w-sm border border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Welcome back
            </CardTitle>
          </CardHeader>

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <CardContent>
              <Button
                type="submit"
                className="flex items-center justify-center w-full gap-2 hover:bg-gray-800 dark:hover:bg-gray-500"
              >
                <GitHubIcon />
                Sign in with GitHub
              </Button>
            </CardContent>

            <CardFooter className="text-xs text-gray-500 flex flex-col items-center mt-4">
              <p className="text-center">
                By continuing, you agree to our{" "}
                <a href="#" className="underline hover:text-gray-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-gray-700">
                  Privacy Policy
                </a>
                .
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

const GitHubIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.111.793-.26.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.419-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.237-3.221-.124-.303-.536-1.524.118-3.176 0 0 1.008-.322 3.3 1.23a11.513 11.513 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.656 1.653.244 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.628-5.479 5.921.43.371.814 1.103.814 2.222v3.293c0 .319.192.694.8.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z"
      clipRule="evenodd"
    />
  </svg>
);
