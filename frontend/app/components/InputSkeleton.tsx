import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton() {
    return (
        <div className="space-y-4 py-6">
            <Skeleton className="h-4 w-[200px] mx-auto bg-gray-800" />
            <Skeleton className="h-8 w-[150px] mx-auto bg-gray-800" />
        </div>
    )
}

