import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center relative">
      <Input type="text" placeholder="Search Startup" className="p-5 w-100 h-10 rounded-3xl " />
      <Button size='icon' className="rounded-full absolute right-1 ">
          <Search/>
      </Button>
    </div>
  );
}
