import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userFullName } from "@/lib/utils";
import { IFile } from "@/types/file.types";
import { PopulatedPost } from "@/types/post.types";
import { format } from "date-fns/format";
import { ArrowDownCircleIcon, PaperclipIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import UserAvatar from "../avatar/UserAvatar";
import { useLazyGetFileQuery } from "@/redux/toolkit/query/services/student.portal";

interface AnnouncementDisplayProps {
  post: PopulatedPost | null;
}

export default function AnnouncementDisplay({
  post,
}: AnnouncementDisplayProps) {
  //const [fetchingFile, setFetchingFile] = React.useState<boolean>(false);
  const [getFile, fileQuery] = useLazyGetFileQuery();
  const handleDownload = async (attachment: IFile) => {
    let toastId;
    try {
      //setFetchingFile(true);
      toastId = toast.loading("Retrieving file...");
      const blobUrl = await getFile(attachment._id).unwrap();

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = attachment.name; // Set a default filename if not provided
      document.body.appendChild(link);

      toast.success(`${attachment.name} retrieved`, { id: toastId });

      // Trigger a click on the link to start the download
      link.click();

      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      //setFetchingFile(false);
    } catch (err) {
      toast.error((err as { data: string })?.data, { id: toastId });
    }
  };

  const fullName = post ? userFullName(post.user) : "";

  return (
    <div className="flex h-full flex-col">
      {post ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <UserAvatar name={fullName} imageId={post.user.profile_image} />
              <div className="grid gap-1">
                <div className="font-semibold">{post.title}</div>
                <div className="line-clamp-1 text-xs">
                  {userFullName(post.user)}
                </div>
                <div className="line-clamp-1 text-xs">{post.user.email}</div>
              </div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {format(post.createdAt, "PPpp")}
            </div>
          </div>
          <Separator />
          <div className="whitespace-pre-wrap p-4 text-sm">{post.content}</div>
          {post.attachments.length > 0 && (
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Attachments
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {post.attachments.map((attachment) => {
                  return (
                    <div className="flex" key={attachment._id}>
                      <div className="flex flex-grow gap-2 items-center border rounded-md rounded-r-none border-r-0 p-1 px-2">
                        <PaperclipIcon size={16} />
                        <span
                          className="text-sm line-clamp-1"
                          //onClick={() => handleDownload(attachment)}
                        >
                          {attachment.name}
                        </span>
                      </div>
                      <Button
                        className="text-sm rounded-l-none"
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => handleDownload(attachment)}
                        disabled={fileQuery.isLoading}
                      >
                        <ArrowDownCircleIcon className="mr-1" size={15} />
                        Download
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
