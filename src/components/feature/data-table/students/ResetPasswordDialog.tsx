import ErrorMessage from "@/components/formik/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { errorToast } from "@/lib/utils";
import { useResetPasswordMutation } from "@/redux/toolkit/query/services/student.portal";
import { ResetPasswordFormSchema } from "@/schema/validation/form";
import { StudentRecord } from "@/types/data.table.types";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Row } from "@tanstack/react-table";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { toast } from "sonner";

export default function ResetPasswordDialog(
  props: React.ComponentProps<typeof DialogPrimitive.Root> & {
    row: Row<StudentRecord> | null;
  }
) {
  const [resetPassword] = useResetPasswordMutation();

  const initialValues = {
    password: "",
    confirm: "",
  };

  const user_id = props.row?.original._id;

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    try {
      if (user_id) {
        formik.setSubmitting(true);
        await resetPassword({
          ...values,
          user_id,
        }).unwrap();
        toast.success(`Password (re)set successful`);
        formik.setSubmitting(false);
        props.onOpenChange?.(false);
      } else {
        toast.error("User ID not available");
      }
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[450px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ResetPasswordFormSchema}
        >
          {(formik) => {
            return (
              <Form>
                <DialogHeader>
                  <DialogTitle>Reset Student Password</DialogTitle>
                  <DialogDescription>
                    Set/Change the password of the student:
                    <br />
                    <b>{`${props.row?.getValue(
                      "full_name"
                    )}/${props.row?.getValue("email")}`}</b>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="col-span-3"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name="password"
                      className="text-right col-span-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                    <Label htmlFor="confirm" className="text-right">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm"
                      name="confirm"
                      type="password"
                      placeholder="Re-enter password"
                      className="col-span-3"
                      value={formik.values.confirm}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name="confirm"
                      className="text-right col-span-4"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => formik.submitForm()}
                    disabled={formik.isSubmitting}
                  >
                    Reset Password
                  </Button>
                </DialogFooter>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
