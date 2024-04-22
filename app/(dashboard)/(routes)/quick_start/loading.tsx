import { Spinner } from "@/components/spinner";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center h-full items-center gap-2">
      {/* <Image src="/blue-spinner.gif" alt="loading" width={300} height={300} /> */}
      <h1>Loading</h1>
      <Spinner />
    </div>
  );
}
