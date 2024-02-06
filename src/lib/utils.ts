import { User } from "@/types/user.types";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { ValidationError } from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function userFullName(user: User) {
  return `${user.first_name} ${user.last_name}`;
}

export function errorToast(err: unknown, toastId?: string | number) {
  if (err instanceof ValidationError) {
    toast.error(err.errors.join("\n"), {
      id: toastId,
    });
  } else if (err instanceof Error) {
    toast.error(err.message, {
      id: toastId,
    });
  } else {
    const error = err as AxiosError;
    toast.error((error.response?.data as string) || error.message, {
      id: toastId,
    });
  }
}
