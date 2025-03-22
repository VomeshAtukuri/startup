import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import PitchCard from "@/components/PitchCard";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
interface Pitch {
  id: string;
  title: string;
  description: string;
  category: string;
  imagesrc: string;
  created: string;
  views: number;
  name: string;
  email: string;
  image: string;
  userid: string;
  propic: string;
}
export default async function Profile({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  
  const { user_id } = await params;
  console.log(user_id);

  const session = await auth();
  if (!session?.user?.id) {
    return redirect(`/api/auth/signin`);
  }

  try {
    const res = await fetch(`${process.env.HOSTNAME}/api/user/${user_id}`);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    const totalViews = data.pitches.reduce((sum: number, pitch: Pitch) => sum + pitch.views, 0);
    return (
      <div className="mx-auto py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start">
            <ProfileCard
              name={data.name}
              image={data.image}
              email={data.email}
              pitchesLength={data.pitches.length}
              totalViews={totalViews}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Pitches</h2>
              <p className="text-muted-foreground mt-1">
                Browse through{" "}
                <span className="font-medium text-pink-500">
                  {data.name}
                </span>
                &#39;s pitches
              </p>
              <Separator className="my-4" />
            </div>

            {data.pitches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[80px] gap-y-4">
                {data.pitches.map((pitch: Pitch, index: string) => (
                    <PitchCard pitch={{ ...pitch, propic: data.image }} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-12 px-6 text-center">
                <span className="text-6xl">📭</span>
                <p className="text-muted-foreground mt-2">
                  No pitches available
                </p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/create">
                  Create Your First Pitch
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="container mx-auto flex flex-col justify-center items-center h-[calc(100vh-8rem)] p-4">
        <div className="max-w-md text-center bg-red-100 border border-red-300 rounded-lg shadow-lg p-6">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
          <h2 className="text-lg font-semibold text-red-700 mt-2">Error</h2>
          <p className="text-sm text-red-600 mt-1">
            There was a problem fetching the user data. Please try again later.
          </p>
          <Button
            className="mt-4"
            variant="destructive"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
}
