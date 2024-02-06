import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFileQuery } from "@/redux/toolkit/query/services/student.portal";
import { skipToken } from "@reduxjs/toolkit/query";
import React from "react";

type UserAvatarProps = {
  name: string;
  imageId?: string | null;
};

export default function UserAvatar({ name, imageId }: UserAvatarProps) {
  //const [imageFetching, setImageFetching] = React.useState<boolean>(false);
  //const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);

  /*   React.useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (imageId) {
      setImageFetching(true);
      getFile(imageId, cancelTokenSource.token)
        .then((blobData) => {
          const blob = new Blob([blobData]);
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          setImageFetching(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(err.message);
          }
          setImageFetching(false);
        });
    }

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      cancelTokenSource.cancel("Avatar fetch cancelled");
    };
  }, [imageId]); */

  const { data: imageUrl, isFetching: imageFetching } = useGetFileQuery(
    imageId || skipToken
  );

  const fallback = React.useMemo(
    () =>
      name
        .split(" ")
        .map((chunk) => chunk[0])
        .join(""),
    [name]
  );

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>
        {imageFetching ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : (
          fallback
        )}
      </AvatarFallback>
    </Avatar>
  );
}
