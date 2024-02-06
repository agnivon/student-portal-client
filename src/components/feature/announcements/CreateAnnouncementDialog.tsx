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
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/redux";

import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { toast } from "sonner";
import { CreateAnnouncementFormSchema } from "@/schema/validation/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpToLineIcon, PaperclipIcon, TrashIcon } from "lucide-react";
import React from "react";
import {
  studentPortalApi,
  useCreatePostMutation,
  useDeleteFileMutation,
  useUploadFileMutation,
} from "@/redux/toolkit/query/services/student.portal";
import { IFile } from "@/types/file.types";
import useUser from "@/hooks/user/useUser";
import { User } from "@/types/user.types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { errorToast } from "@/lib/utils";

export default function CreateAnnouncementDialog(
  props: React.ComponentProps<typeof DialogPrimitive.Root>
) {
  const fileUploadRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadFile, uploadFileMutation] = useUploadFileMutation();
  const [deleteFile, deleteFileMutation] = useDeleteFileMutation();
  const [createPost] = useCreatePostMutation();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const [attachments, setAttachments] = React.useState<IFile[]>([]);

  const initialValues: {
    title: string;
    content: string;
    attachments: string[];
  } = {
    title: "",
    content: "",
    attachments: [],
  };

  const handleFileUpload = async (
    formik: FormikProps<typeof initialValues>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      //toastId = toast.loading("Uploading file...");
      const files = e.target.files;

      if (files) {
        const attachments = (
          await Promise.all(
            Array.from(files).map(async (file) => {
              let toastId;
              try {
                toastId = toast.loading("Uploading file...");
                const formData = new FormData();
                formData.set("file", file);
                const attachment = await uploadFile(formData).unwrap();
                toast.success(`${file.name} uploaded`, { id: toastId });
                return attachment;
              } catch (err) {
                errorToast(err, toastId);
                return null;
              }
            })
          )
        ).filter(Boolean) as IFile[];
        setAttachments((a) => a.concat(attachments));
        formik.setFieldValue(
          "attachments",
          formik.values.attachments.concat(attachments.map((a) => a._id))
        );
      } else {
        toast.error("File selection failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleFileDelete = async (
    formik: FormikProps<typeof initialValues>,
    id: string
  ) => {
    let toastId;
    try {
      toastId = toast.loading("Deleting file...");

      const attachment = await deleteFile(id).unwrap();
      setAttachments((a) => a.filter((a) => a._id !== id));
      formik.setFieldValue(
        "attachments",
        formik.values.attachments.filter((aid) => aid !== id)
      );
      toast.success(`${attachment.name} deleted`, { id: toastId });
    } catch (err) {
      errorToast(err, toastId);
    }
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    try {
      formik.setSubmitting(true);
      const post = await createPost(values).unwrap();
      dispatch(
        studentPortalApi.util.updateQueryData(
          "getAllPosts",
          undefined,
          (draft) => {
            draft.unshift({
              ...post,
              user: user as User,
              attachments,
            });
          }
        )
      );
      toast.success(`Announcement created`);
      formik.setSubmitting(false);
      props.onOpenChange?.(false);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[45vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={CreateAnnouncementFormSchema}
        >
          {(formik) => {
            const buttonsDisabled =
              uploadFileMutation.isLoading ||
              formik.isSubmitting ||
              deleteFileMutation.isLoading;

            return (
              <Form>
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>
                    Create a new announcement to broadcast to the students
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 my-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage name="title" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      rows={10}
                      placeholder="Type content here"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      className="max-h-[50vh]"
                    />
                    <ErrorMessage name="content" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button
                      type="button"
                      size={"sm"}
                      className="w-fit"
                      variant={"outline"}
                      onClick={() => fileUploadRef.current?.click()}
                      disabled={buttonsDisabled}
                    >
                      <ArrowUpToLineIcon className="mr-1" size={18} />
                      Upload File
                    </Button>
                    <Input
                      type="file"
                      className="hidden"
                      ref={fileUploadRef}
                      onChange={(e) => handleFileUpload(formik, e)}
                      multiple
                      accept="image/*,.doc,.docx,.pdf"
                    />
                    {attachments.map((attachment) => {
                      return (
                        <div className="flex" key={attachment._id}>
                          <div className="flex flex-grow gap-2 items-center border rounded-md rounded-r-none border-r-0 p-1 px-2 flex-1">
                            <PaperclipIcon size={16} />
                            <span className="text-sm line-clamp-1">
                              {attachment.name}
                            </span>
                          </div>
                          <Button
                            type="button"
                            className="text-sm rounded-l-none"
                            size={"sm"}
                            variant={"destructive"}
                            onClick={() =>
                              handleFileDelete(formik, attachment._id)
                            }
                            disabled={buttonsDisabled}
                          >
                            <TrashIcon className="mr-1" size={15} />
                            Delete
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant={"outline"}
                    onClick={() => props.onOpenChange?.(false)}
                    disabled={buttonsDisabled}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => formik.submitForm()}
                    disabled={buttonsDisabled}
                  >
                    Create
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
