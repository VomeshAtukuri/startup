"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  category: string;
  link: string;
  pitch: string;
}

export default function Create() {
  const { status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    link: "",
    pitch: "",
  });

  if (status === "unauthenticated") {
    return redirect(`/api/auth/signin?callbackUrl=/create`);
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formdata", formData);
    const response = await fetch("/api/pitch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    toast.success(data.message);
    setFormData({
      title: "",
      description: "",
      category: "",
      link: "",
      pitch: "",
    });
  };

  return (
    <div className="min-h-screen">
      {/* <div
        className="w-full h-60 flex justify-center items-center"
        style={{ backgroundImage: "url('/HomeBg.png')" }}
      >
        <Image
          src="/Frame 74.png"
          alt="Logo"
          width={350}
          height={45}
          className="object-contain"
          priority
        />
      </div> */}

      <div className="container max-w-xl mx-auto px-4 py-12">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="rounded-xl h-12"
              required
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
              onChange={handleChange}
              name="description"
              value={formData.description}
              placeholder="Short description of your startup idea (atmost 20 words)"
              className="rounded-xl h-15 resize-none scrollbar"
              required
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
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
              className="rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="link"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              Image link
            </Label>
            <Input
              type="text"
              id="link"
              value={formData.link}
              name="link"
              onChange={handleChange}
              placeholder="Paste a link to your demo or promotional media"
              className="rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pitch"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              Pitch
            </Label>
            <Textarea
              onChange={handleChange}
              value={formData.pitch}
              id="pitch"
              name="pitch"
              placeholder="Briefly describe your idea and what problem it solves"
              className="rounded-xl min-h-[200px]"
              required
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
