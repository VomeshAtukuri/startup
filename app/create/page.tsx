import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function Create() {
  return (
    <div className="min-h-screen">
      <div className="w-full py-12 flex justify-center items-center">
        <Image
          src="/Frame 74.png"
          alt="Logo"
          width={350}
          height={45}
          className="object-contain"
          priority
        />
      </div>

      <div className="container max-w-xl mx-auto px-4 py-12">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              Title
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="Title"
              className="rounded-xl h-12 placeholder:opacity-40"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Short description of your startup idea"
              className="rounded-xl h-15 placeholder:opacity-40 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              Category
            </Label>
            <Input
              type="text"
              id="category"
              placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
              className="rounded-xl h-12 placeholder:opacity-40"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="file"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              Image link
            </Label>
            <Input
              type="text"
              id="link"
              placeholder="Paste a link to your demo or promotional media"
              className="rounded-xl h-12 placeholder:opacity-40"
            />
          </div>

          {/*TODO: RTE editor */}
          <div className="space-y-2">
            <Label
              htmlFor="pitch"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              pitch
            </Label>
            <Textarea
              id="pitch"
              placeholder="Briefly describe your idea and what problem it solves"
              className="rounded-xl min-h-[200px] placeholder:opacity-40"
            />
          </div>

          <Button type="submit" className="w-full rounded-xl h-12 mt-6">
            Submit Your Pitch <Send className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
