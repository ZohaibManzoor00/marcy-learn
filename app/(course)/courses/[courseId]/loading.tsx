import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <Skeleton className="h-10 w-4/6" />
        <Skeleton className="h-10 w-1/6" />
      </div>
    </div>
  );
}
