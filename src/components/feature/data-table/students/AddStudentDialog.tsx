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
import { useAppDispatch } from "@/hooks/redux";
import { errorToast } from "@/lib/utils";
import {
  studentPortalApi,
  useCreateUserMutation,
  useGetMyStudentsQuery,
} from "@/redux/toolkit/query/services/student.portal";
import { AddStudentFormSchema } from "@/schema/validation/form";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { toast } from "sonner";

export function AddStudentDialog(
  props: React.ComponentProps<typeof DialogPrimitive.Root>
) {
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const { data: students } = useGetMyStudentsQuery(undefined);

  const studentEmails = React.useMemo(
    () => students?.map((s) => s.email) || [],
    [students]
  );

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    existing_emails: studentEmails,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    try {
      formik.setSubmitting(true);
      const { existing_emails, ...payload } = values;
      const user = await createUser(payload).unwrap();
      if (user) {
        dispatch(
          studentPortalApi.util.updateQueryData(
            "getMyStudents",
            undefined,
            (draft) => {
              draft.unshift(user);
            }
          )
        );
      }
      toast.success(`${values.first_name} ${values.last_name} added`);
      formik.setSubmitting(false);
      props.onOpenChange?.(false);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={AddStudentFormSchema}
        >
          {(formik) => {
            return (
              <Form>
                <DialogHeader>
                  <DialogTitle>Add student</DialogTitle>
                  <DialogDescription>
                    Add a new student. Mail will be sent with the registration
                    code to the email.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                    <Label htmlFor="first_name" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      className="col-span-3"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name="first_name"
                      className="text-right col-span-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                    <Label htmlFor="last_name" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      className="col-span-3"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name="last_name"
                      className="text-right col-span-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="col-span-3"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name="email"
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
                    Add student
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
