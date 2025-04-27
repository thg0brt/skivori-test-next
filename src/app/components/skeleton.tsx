import { Skeleton } from "@/components/ui/skeleton"
 
export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
    <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
    </div>
    <Skeleton className="h-[210px] w-[250px] rounded-xl bg-black" />
    </div>
  )
}