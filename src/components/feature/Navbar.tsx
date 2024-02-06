"use client";

import useUser from "@/hooks/user/useUser";
import { userFullName } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/toolkit/query/services/student.portal";
import { User } from "@/types/user.types";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import BrandLogo from "./BrandLogo";
import UserAvatar from "./avatar/UserAvatar";

export default function Navbar() {
  const { user } = useUser();

  //const router = useRouter();

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    logout(undefined)
      .unwrap()
      .then(() => {
        toast.success("Logout successful", { id: toastId });
      })
      .catch((err) =>
        toast.error((err as { data: string })?.data, { id: toastId })
      );
  };

  const fullName = userFullName(user as User);

  return (
    <nav className="border-b">
      <div className="p-4 flex">
        <div className="flex gap-2 items-center">
          <BrandLogo />
          <span className="mt-1 text-xl font-semibold">Student Portal</span>
        </div>
        <div className="ml-auto flex gap-4 lg:gap-6 items-center">
          {/* {!user ? (
            <>
              <Link
                href={Routes.REGISTER}
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Register
              </Link>
              <Link
                href={Routes.LOGIN}
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Login
              </Link>
            </>
          ) : (
            <div
              onClick={handleLogout}
              className="font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
            >
              Logout
            </div>
          )} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserAvatar name={fullName} imageId={user?.profile_image} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              forceMount
              sideOffset={10}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
