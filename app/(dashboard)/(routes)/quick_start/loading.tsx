import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center h-full items-center gap-2">
      <Spinner />
    </div>
  );
}
