import {
  CardHeader,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
//Mock data
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function PitchCard({pitch} : {pitch: any}) {
  return (
    <Card className="max-w-md mx-auto rounded-3xl py-5 px-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="flex items-center gap-1.5">
            <Calendar className="size-5 text-pink-600"/>
            {formatDate(pitch.created)}
          </p>
          <div className="inline-flex items-center">
            <Eye className="mr-1 size-5 text-pink-600" />
            <p>{pitch.views}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span>
            <p className="text-sm">{pitch.userid}</p>
            <p className="font-semibold text-2xl">{pitch.title}</p>
          </span>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardDescription>
            {pitch.description.length > 100
              ? `${pitch.description.substring(0, 97)}...`
              : pitch.description}
          </CardDescription>
        </div>
        <Image
          src={pitch.image}
          alt="Pitch Image"
          width={400}
          height={200}
          className="w-full h-40 rounded-3xl object-cover border-black-500 border-2"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p>{pitch.category}</p>
        <Button className="border-none rounded-3xl" asChild>
          <Link href="/create">Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
