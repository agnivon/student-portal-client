"use client";

import ErrorMessage from "@/components/formik/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/toolkit/query/services/student.portal";
import { ChangePasswordFormSchema } from "@/schema/validation/form";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [changePassword] = useChangePasswordMutation();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirm: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    let toastId;
    try {
      formik.setSubmitting(true);
      toastId = toast.loading("Updating password");
      await changePassword(values).unwrap();
      toast.success("Password updated", { id: toastId });
      formik.setSubmitting(false);
    } catch (err) {
      toast.error((err as { data: string })?.data, { id: toastId });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ChangePasswordFormSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formik) => {
        return (
          <Form className="space-y-8">
            <div className="grid grid-cols-2 items-start gap-x-8 gap-y-4 w-2/3">
              <div className="flex flex-col gap-y-1.5">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Old password"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                />
                <ErrorMessage name="oldPassword" />
              </div>
              <div></div>
              <div className="flex flex-col gap-y-1.5">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                <ErrorMessage name="newPassword" />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  name="confirm"
                  type="password"
                  placeholder="Confirm password"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                />
                <ErrorMessage name="confirm" />
              </div>
            </div>
            <div>
              <Button
                onClick={() => formik.submitForm()}
                disabled={formik.isSubmitting}
              >
                Change Password
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
