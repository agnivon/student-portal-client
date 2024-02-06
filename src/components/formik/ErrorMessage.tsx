import { cn } from "@/lib/utils";
import { ErrorMessage as FErrorMessage } from "formik";
import { ComponentProps } from "react";

export default function ErrorMessage({
  className,
  ...rest
}: ComponentProps<typeof FErrorMessage>) {
  return (
    <FErrorMessage {...rest}>
      {(message) => (
        <div className={cn("text-sm text-destructive", className)}>
          {message}
        </div>
      )}
    </FErrorMessage>
  );
}
