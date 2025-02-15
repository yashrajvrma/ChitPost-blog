import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-auto rounded-md border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-md file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-md placeholder:font-sans placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
          className
        )}
        ref={ref}
        {...props}
      />
      // <input
      //   type={type}
      //   className={cn(
      //     "flex h-12 w-full rounded-md border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-md file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-md placeholder:font-sans placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
      //     className
      //   )}
      //   ref={ref}
      //   {...props}
      // />
    );
  }
);
Input.displayName = "Input";

export { Input };
