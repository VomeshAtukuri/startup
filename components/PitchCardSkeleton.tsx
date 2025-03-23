import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonPitchCard() {
  return (
    <Card className="w-[320px] mx-auto rounded-3xl border-2 border-black border-r-[6px] border-b-[6px] transition-transform transform hover:scale-102 duration-300 dark:border-white flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="flex-1 min-h-[50px]">
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-7 w-48" />
          </span>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <div className="flex-1">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <Skeleton className="w-full h-40 rounded-3xl" />
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-24 rounded-3xl" />
      </CardFooter>
    </Card>
  )
}

