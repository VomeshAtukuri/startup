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

//title,description,category,link,pitch,userid,created,views,id
interface PitchCardProps {
  title: string;
  description: string;
  category: string;
  imagesrc: string;
  created: string;
  views: number;
  id: string;
  name: string;
  propic: string;
  userid: string;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function PitchCard({ pitch }: { pitch: PitchCardProps }) {
  return (
    <Card className="w-[320px] mx-auto rounded-3xl border-2 border-black border-r-[6px] border-b-[6px] transition-transform transform hover:scale-102 duration-300 dark:border-white flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="flex items-center gap-1.5">
            <Calendar className="size-5 text-pink-600" />
            {formatDate(pitch.created)}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Eye className="size-5 text-pink-600" />
            {pitch.views}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="flex-1 min-h-[50px]">
            <p className="text-sm min-h-[20px]">{pitch.name}</p>
            <p className="font-semibold text-2xl min-h-[28px]">{pitch.title}</p>
          </span>
          <Link href={`/profile/${pitch.userid}`} prefetch={false}>
            <Avatar className="size-10">
              <AvatarImage src={pitch.propic} alt="Profile Picture"/>
              <AvatarFallback className="animate-pulse"></AvatarFallback>
            </Avatar>
          </Link>
        </div>

    
        <div className="flex-1">
          <CardDescription className="min-h-[40px]">
            {pitch.description.length > 100
              ? `${pitch.description.substring(0, 75)}...`
              : pitch.description}
          </CardDescription>
        </div>

        <Image
          src={pitch.imagesrc}
          alt="Pitch Image"
          width={400}
          height={200}
          className="w-full h-40 rounded-3xl object-cover"
        />
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <p>{pitch.category}</p>
        <Button className="border-none rounded-3xl" asChild>
          <Link href={`/pitch/${pitch.id}`} prefetch={false}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

