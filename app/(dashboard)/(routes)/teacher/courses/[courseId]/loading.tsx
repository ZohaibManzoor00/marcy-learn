import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex h-80 justify-center items-center">
      <Spinner />
    </div>
  );
}
