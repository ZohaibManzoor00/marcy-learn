import CardSkeleton from "@/components/card-skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
