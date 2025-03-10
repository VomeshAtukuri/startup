import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center relative">
      <Input type="text" placeholder="Search Startup" className="border-black-800 p-5 w-100 h-10 rounded-3xl placeholder:text-black" />
      <Button size='icon' variant="ghost" className="border-none rounded-full absolute right-1 top-0.5 bottom-0.5">
          <Search/>
      </Button>
    </div>
  );
}
