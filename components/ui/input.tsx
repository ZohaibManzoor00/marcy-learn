import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    return (
      // <div className="flex">
      //   <input
      //     type={type}
      //     className={cn(
      //       "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      //       className
      //     )}
      //     ref={ref}
      //     {...props}
      //   />
      //   <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      //     <span className="text-xs">⌘</span>K
      //   </kbd>
      // </div>
      <div className="flex items-center">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded-sm border border-slate-300 dark:border-slate-500 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 -ml-10">
          <span className="text-base">⌘</span>K
        </kbd>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
