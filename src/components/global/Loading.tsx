import { cn } from "@/lib/utils";
import { LoaderIcon, LucideProps } from "lucide-react";
import React from "react";

export const LoadingIcon = (props: LucideProps) => (
  <LoaderIcon size={15} className="animate-rotate" {...props} />
);

export default function Loading({
  className,
  message = "Loading...",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { message?: string }) {
  return (
    <div
      className={cn("flex justify-center items-center gap-2", className)}
      {...rest}
    >
      <LoadingIcon />
      <span>{message}</span>
    </div>
  );
}
