"use client";

import { Routes } from "@/constants/routes.constants";
import { useAppDispatch } from "@/hooks/redux";
import useUser from "@/hooks/user/useUser";
import { deAuthenticate } from "@/redux/slices/authSlice";
import { useUserQuery } from "@/redux/toolkit/query/services/student.portal";
import { useRouter } from "next/navigation";
import React from "react";
import Navbar from "../feature/Navbar";
import Loading from "../global/Loading";

const message = (
  <div className="flex-grow flex items-center justify-center">{null}</div>
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const { user, authenticated } = useUser();

  const router = useRouter();

  const { isLoading, isFetching, isSuccess, isError } = useUserQuery(
    undefined,
    {
      pollingInterval: 300000,
      skipPollingIfUnfocused: true,
      refetchOnMountOrArgChange: true,
      skip: !authenticated,
    }
  );

  React.useEffect(() => {
    if (!isFetching) {
      if ((isSuccess && !user) || isError || !authenticated) {
        dispatch(deAuthenticate());
        router.push(Routes.LOGIN);
      }
    }
  }, [isFetching, isSuccess, isError, user, dispatch, authenticated, router]);

  return isLoading ? (
    <Loading className="flex-grow" />
  ) : isSuccess ? (
    user ? (
      <>
        <Navbar />
        {children}
      </>
    ) : (
      message
    )
  ) : (
    message
  );
}
