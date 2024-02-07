"use client";

import ErrorMessage from "@/components/formik/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/user/useUser";
import { errorToast, userFullName } from "@/lib/utils";
import {
  useChangeProfileImageMutation,
  useGetFileQuery,
  useUpdateProfileMutation,
} from "@/redux/toolkit/query/services/student.portal";
import { ProfileFormSchema } from "@/schema/validation/form";
import { User } from "@/types/user.types";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { skipToken } from "@reduxjs/toolkit/query";
import { Form, Formik, FormikHelpers } from "formik";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

export default function ProfileForm() {
  const { user, isAdmin } = useUser() as { user: User, isAdmin: boolean };

  const [updateProfile] = useUpdateProfileMutation();
  const [changeProfileImage, profileImageMutation] =
    useChangeProfileImageMutation();
  const { data: profileImageUrl, isFetching: profileImageFetching } =
    useGetFileQuery(user?.profile_image || skipToken);

  const profileImageRef = React.useRef<HTMLInputElement | null>(null);

  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    phone: user?.phone || "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    let toastId;
    try {
      formik.setSubmitting(true);
      toastId = toast.loading("Updating profile");
      await updateProfile(values).unwrap();
      toast.success("Profile updated", { id: toastId });
      formik.setSubmitting(false);
    } catch (err) {
      errorToast(err, toastId);
    }
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      let toastId = toast.loading("Uploading...");
      try {
        const formData = new FormData();
        formData.set("file", file);
        await changeProfileImage(formData).unwrap();
        toast.success(`Profile image changed`, { id: toastId });
      } catch (err) {
        errorToast(err, toastId);
      }
    } else {
      toast.error("File selection failed");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileFormSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formik) => {
        return (
          <Form className="space-y-8">
            <div className="grid grid-cols-3 gap-2">
              <div className="grid grid-cols-2 items-start gap-x-8 gap-y-4 col-span-2">
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="first_name" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="last_name" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="username" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="username">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="phone" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={user.email}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={isAdmin ? "Admin" : "Student"}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="border rounded-full w-48 h-48 place-self-center col-span-1 relative">
                {profileImageFetching ? (
                  <Skeleton className="h-full w-full rounded-full" />
                ) : profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    className="h-full w-full rounded-full"
                    alt={"Profile Image"}
                    width={192}
                    height={192}
                  />
                ) : (
                  <div
                    className={
                      "flex h-full w-full items-center justify-center rounded-full text-muted-foreground"
                    }
                  >
                    No Profile Image
                  </div>
                )}
                <Input
                  type="file"
                  className="hidden"
                  ref={profileImageRef}
                  onChange={handleProfileImageChange}
                  accept="image/*"
                />
                {!profileImageFetching && !profileImageMutation.isLoading && (
                  <div
                    className="h-full w-full rounded-full absolute inset-0 bg-transparent hover:bg-primary hover:opacity-75 flex items-center justify-center group cursor-pointer"
                    onClick={() => profileImageRef?.current?.click()}
                  >
                    <div className="flex items-center gap-x-1 group-hover:visible invisible">
                      <PencilIcon
                        className="inline-block text-white"
                        size={20}
                        strokeWidth={2}
                      />
                      <span className="text-white font-semibold">Change</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Button
                onClick={() => formik.submitForm()}
                disabled={formik.isSubmitting}
              >
                Update Profile
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
