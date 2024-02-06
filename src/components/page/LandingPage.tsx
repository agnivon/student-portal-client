"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Routes } from "@/constants/routes.constants";

export default function LandingPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <div className="text-6xl font-bold">Student Portal</div>
      <div className="flex gap-4">
        <Link href={Routes.LOGIN}>
          <Button className="w-20">Login</Button>
        </Link>
        <Link href={Routes.REGISTER}>
          <Button className="w-20">Register</Button>
        </Link>
      </div>
    </div>
  );
}
