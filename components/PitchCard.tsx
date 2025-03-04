import {
  CardHeader,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import  { Button } from '@/components/ui/button'
import { Eye } from "lucide-react";

//Mock data
const pitch = {
  id: "1",
  title: "Pitch Title",
  user: "User Name",
  image: "https://via.placeholder.com/150",
  description: "Pitch Description",
  created: "20 May, 2023",
  views: 100,
};
export default function PitchCard() {
  return (
    <Card className="w-55 h-75 bg-amber-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>{pitch.created}</p>
          <div className="inline-flex items-center">
            <Eye/>
            <p>{pitch.views}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div>
            {}
        </div>
        <div>
            <p>{pitch.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p>Senior Level</p>
        <Button className="rounded-3xl">Details</Button>
      </CardFooter>
    </Card>
  );
}
