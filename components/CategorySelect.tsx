"use client"
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CategorySelect({
  category,
  setCategory,
}: {
  category: string
  setCategory: (value: string) => void
}) {
  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Tech">Tech</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Agriculture">Agriculture</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Finance">Finance</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

