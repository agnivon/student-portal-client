"use client";

import BrandLogo from "@/components/feature/BrandLogo";
import ErrorMessage from "@/components/formik/ErrorMessage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes } from "@/constants/routes.constants";
import { cn, errorToast } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/toolkit/query/services/student.portal";
import { RegisterFormSchema } from "@/schema/validation/form";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function PageComponent() {
  const initialValues = {
    registration_id: "",
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    password: "",
    confirm: "",
  };

  const router = useRouter();

  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    try {
      formik.setSubmitting(true);
      await register(values).unwrap();
      toast.success("Registration complete");
      router.push(Routes.LOGIN);
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
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Register
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below along with the registration code sent
                to your email
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterFormSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <>
                    <Form>
                      <div className="grid grid-cols-2 w-full items-start gap-4">
                        <div className="flex flex-col space-y-1.5 col-span-2">
                          <Label htmlFor="registration_id">
                            Registration Code
                          </Label>
                          <Input
                            id="registration_id"
                            name="registration_id"
                            placeholder="Registration Code"
                            value={formik.values.registration_id}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name="registration_id" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name="first_name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name="last_name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name="username" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name="phone" />
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
                        <Button
                          type="button"
                          className="w-full col-span-2"
                          onClick={() => formik.submitForm()}
                          disabled={formik.isSubmitting}
                        >
                          Register
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

export default function RegisterPage() {
  return <PageComponent />;
}
