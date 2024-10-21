import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative w-full">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-3 md:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-200 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && showPassword ? (
          <EyeOff
            onClick={() => setShowPassword(!showPassword)}
            size={16}
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
          />
        ) : (
          type === "password" &&
          !showPassword && (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              size={16}
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
            />
          )
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
