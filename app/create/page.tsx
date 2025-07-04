"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  category: string;
  link: File | null;
  pitch: string;
}

export default function Create() {

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    link: null,
    pitch: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.type === "file" ? target.files?.[0] : target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    if (formData.link) {
      formDataToSend.append("link", formData.link);
    }
    formDataToSend.append("pitch", formData.pitch);
    const response = await fetch("/api/pitch", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    toast.success(data.message);
    setFormData({
      title: "",
      description: "",
      category: "",
      link: null,
      pitch: "",
    });
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = "";
  };

  return (
    <div className="min-h-screen mx-auto">
      <div
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
      </div>

      <div className="max-w-xl mx-auto px-4 py-12">
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
              type="file"
              id="link"
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
              id="pitch"
              name="pitch"
              value={formData.pitch}
              placeholder="Briefly describe your idea and what problem it solves"
              className="rounded-xl min-h-[200px]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-3xl h-12 mt-6 border-[3px] border-black dark:border-white bg-[#EE2B69] hover:bg-[#EE2B69]"
          >
            Submit Your Pitch <Send className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}

