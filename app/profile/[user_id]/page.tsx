import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import PitchCard from "@/components/PitchCard";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button"; // Added button for better UX

export default async function Profile({ params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  console.log(user_id);

  try {
    const res = await fetch(`${process.env.HOSTNAME}/api/user/${user_id}`);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data2 = await res.json();

    return (
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 lg:self-start">
            {/* <div className="overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6"> */}
              <ProfileCard
                name={data2.name}
                image={data2.image}
                email={data2.email}
                pitchesLength={data2.pitches.length}
              />
          </div>

          {/* Pitches Section */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Pitches</h2>
              <p className="text-muted-foreground mt-1">
                Browse through <span className="font-medium text-indigo-600">{data2.name}</span>'s pitches
              </p>
              <Separator className="my-4" />
            </div>

            {data2.pitches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {data2.pitches.map((pitch, index) => (
                  <div
                    key={index}
                    className=""
                  >
                    <PitchCard pitch={pitch} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-12 px-6 border rounded-lg bg-muted/50 text-center">
                <span className="text-6xl">📭</span>
                <p className="text-muted-foreground mt-2">No pitches available</p>
                <Button className="mt-4" variant="outline">
                  Create Your First Pitch
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto flex flex-col justify-center items-center h-[calc(100vh-8rem)] p-4">
        <div className="max-w-md text-center bg-red-100 border border-red-300 rounded-lg shadow-lg p-6">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
          <h2 className="text-lg font-semibold text-red-700 mt-2">Error</h2>
          <p className="text-sm text-red-600 mt-1">
            There was a problem fetching the user data. Please try again later.
          </p>
          <Button className="mt-4" variant="destructive" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }
}
