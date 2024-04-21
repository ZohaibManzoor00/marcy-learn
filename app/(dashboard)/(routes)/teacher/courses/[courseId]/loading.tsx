import Skeleton from "@/components/skeleton";
import { Spinner } from "@/components/spinner";

export default function Loading() {

  return <div className="h-full grid place-content-center"><Spinner /></div>

  // return (
  //   <div className="px-6">
  //     <div className="flex items-center justify-between">
  //       <div className="flex flex-col gap-y-2">
  //         <Skeleton className="h-20 w-3/12" />
  //         <Skeleton className="h-20 w-3/12" />
  //       </div>
  //       <Skeleton className="h-5 w-1/12" />
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
  //       <div>
  //         <div className="flex items-center gap-x-2">
  //           <Skeleton className="h-20 w-10" />
  //           <Skeleton className="h-20 w-20" />
  //         </div>
  //         <Skeleton className="h-20 w-20" />
  //       </div>
  //       <div className="space-y-6">
  //         <div>
  //           <div className="flex items-center gap-x-2">
  //             <Skeleton className="h-20 w-20" />
  //           </div>
  //           <Skeleton className="h-20 w-20" />
  //         </div>
  //         <div>
  //           <div className="flex items-center gap-x-2">
  //             icon
  //             <h2 className="text-xl">
  //               {" "}
  //               <Skeleton className="h-20 w-20" />
  //             </h2>
  //           </div>
  //           <Skeleton className="h-20 w-20" />
  //         </div>
  //         <Skeleton className="h-20 w-20" />
  //       </div>
  //     </div>
  //   </div>
  // );
}
