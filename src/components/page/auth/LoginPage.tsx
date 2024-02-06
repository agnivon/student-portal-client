"use client";

import BrandLogo from "@/components/feature/BrandLogo";
import ErrorMessage from "@/components/formik/ErrorMessage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes } from "@/constants/routes.constants";
import { cn, errorToast } from "@/lib/utils";
import { useLoginMutation } from "@/redux/toolkit/query/services/student.portal";
import { LoginFormSchema } from "@/schema/validation/form";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function PageComponent() {
  const initialValues = {
    username: "",
    password: "",
  };

  const [login] = useLoginMutation();

  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    try {
      formik.setSubmitting(true);
      await login(values).unwrap();
      toast.success("Logged in");
      router.push(Routes.ANNOUNCEMENTS);
      formik.setSubmitting(false);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <>
      <div className="container relative hidden flex-grow flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={Routes.REGISTER}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Register
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
          <div className="mx-auto flex w-full flex-col items-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to login
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginFormSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <>
                    <Form>
                      <div className="grid w-full items-start gap-4 sm:w-[350px]">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="username"
                            placeholder="Email"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name="username" />
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
                        <Button
                          type="button"
                          className="w-full"
                          onClick={() => formik.submitForm()}
                          disabled={formik.isSubmitting}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </>
                );
              }}
            </Formik>
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href={Routes.FORGOT_PASSWORD}
                className="hover:underline underline-offset-4 hover:text-primary"
              >
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return <PageComponent />;
}
