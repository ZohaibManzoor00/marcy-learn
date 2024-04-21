import Skeleton from "./skeleton";

export default function CardSkeleton() {
  return (
    <div className="mb-14">
      <Skeleton className="rounded h-40 w-full" />
      <div className="px-2">
        <Skeleton className="h-5 w-4/6 mt-2" />

        <Skeleton className="h-3 full mt-1" />

        <Skeleton className="h-6 w-2/6 mt-3" />
        <Skeleton className="h-2 w-full mt-3" />
      </div>
    </div>
  );
}
