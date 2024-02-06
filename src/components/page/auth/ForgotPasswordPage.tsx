"use client";

import BrandLogo from "@/components/feature/BrandLogo";
import ErrorMessage from "@/components/formik/ErrorMessage";
import RenderIf from "@/components/global/RenderIf";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes } from "@/constants/routes.constants";
import { cn, errorToast } from "@/lib/utils";
import {
  useForgotPasswordMutation,
  useSendVerificationCodeMutation,
} from "@/redux/toolkit/query/services/student.portal";
import {
  ForgotPasswordEmailSchema,
  ForgotPasswordFormSchema,
} from "@/schema/validation/form";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function PageComponent() {
  const initialValues = {
    email: "",
    verification_code: "",
    password: "",
    confirm: "",
  };

  const [stage, setStage] = React.useState<"email" | "verification">("email");

  const router = useRouter();

  const [sendVerificationCode] = useSendVerificationCodeMutation();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    try {
      formik.setSubmitting(true);
      if (stage === "email") {
        await sendVerificationCode({ email: values.email }).unwrap();
        toast.success("Verification code sent");
        setStage("verification");
        formik.resetForm({ values: { ...initialValues, email: values.email } });
      } else {
        await forgotPassword(values).unwrap();
        toast.success("Password reset");
        router.push(Routes.LOGIN);
      }
      formik.setSubmitting(false);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <>
      <div className="container relative hidden flex-grow flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={Routes.LOGIN}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-xl font-medium gap-2">
            <BrandLogo />
            Student Portal
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Reset your password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your registered email to receive your verification code
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={
                stage === "email"
                  ? ForgotPasswordEmailSchema
                  : ForgotPasswordFormSchema
              }
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <>
                    <Form>
                      <div className="flex flex-col w-full gap-4 sm:w-[350px]">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            readOnly={stage === "verification"}
                          />
                          <ErrorMessage name="email" />
                        </div>
                        <RenderIf isTrue={stage === "verification"}>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="verification_code">
                              Verification Code
                            </Label>
                            <Input
                              id="verification_code"
                              name="verification_code"
                              type="text"
                              placeholder="Verification Code"
                              value={formik.values.verification_code}
                              onChange={formik.handleChange}
                            />
                            <ErrorMessage name="verification_code" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                            />
                            <ErrorMessage name="password" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirm">Confirm Password</Label>
                            <Input
                              id="confirm"
                              name="confirm"
                              type="password"
                              placeholder="Confirm Password"
                              value={formik.values.confirm}
                              onChange={formik.handleChange}
                            />
                            <ErrorMessage name="confirm" />
                          </div>
                        </RenderIf>
                        <Button
                          type="button"
                          className="w-full col-span-2"
                          onClick={() => formik.submitForm()}
                          disabled={formik.isSubmitting}
                        >
                          {stage === "email"
                            ? "Send Verification Email"
                            : "Reset Password"}
                        </Button>
                      </div>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ForgotPasswordPage() {
  return <PageComponent />;
}
