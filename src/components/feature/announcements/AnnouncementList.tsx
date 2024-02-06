import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PopulatedPost } from "@/types/post.types";
import { SetState } from "@/types/util.types";
import { formatDistanceToNow } from "date-fns";

interface AnnouncementListProps {
  posts: PopulatedPost[];
  selectedPost: PopulatedPost | null;
  setSelectedPost: SetState<PopulatedPost | null>;
}

export default function AnnouncementList({
  posts,
  selectedPost,
  setSelectedPost,
}: AnnouncementListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {posts.map((post) => (
          <button
            key={post._id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selectedPost?._id === post._id && "bg-muted"
            )}
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{post.title}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedPost?._id === post._id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(post.createdAt, {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{`${post.user.first_name} ${post.user.last_name}`}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {post.content.substring(0, 300)}
            </div>
            <div>
              {post.attachments.length > 0 && (
                <Badge>{`${post.attachments.length} attachment${
                  post.attachments.length > 1 ? "s" : ""
                }`}</Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
