import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="h-full grid place-content-center">
      <Spinner />
    </div>
  );
}
