"use client";

import AnnouncementDisplay from "@/components/feature/announcements/AnnouncementDisplay";
import AnnouncementList from "@/components/feature/announcements/AnnouncementList";
import CreateAnnouncementDialog from "@/components/feature/announcements/CreateAnnouncementDialog";
import Loading from "@/components/global/Loading";
import { Button } from "@/components/ui/button";
import DebouncedInput from "@/components/ui/debounced-input";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import useUser from "@/hooks/user/useUser";
import { useGetAllPostsQuery } from "@/redux/toolkit/query/services/student.portal";
import { PopulatedPost } from "@/types/post.types";
import { PlusIcon, Search } from "lucide-react";
import React from "react";

function searchFilter(post: PopulatedPost, query: string) {
  const lQuery = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(lQuery) ||
    post.content.toLowerCase().includes(lQuery) ||
    (
      post.user.first_name.toLowerCase() +
      " " +
      post.user.last_name.toLowerCase()
    ).includes(lQuery)
  );
}

export default function AnnouncementPage() {
  const { isAdmin } = useUser();
  const [selectedPost, setSelectedPost] = React.useState<PopulatedPost | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [showCreateAnnouncementDialog, setShowCreateAnnouncementDialog] =
    React.useState<boolean>(false);

  const postsQuery = useGetAllPostsQuery(undefined);
  setSelectedPost;

  if (postsQuery.isFetching) {
    return <Loading className="flex-grow" />;
  }

  if (postsQuery.isSuccess && postsQuery.data) {
    const posts = searchQuery
      ? postsQuery.data.filter((post) => searchFilter(post, searchQuery))
      : postsQuery.data;
    return (
      <>
        {showCreateAnnouncementDialog && (
          <CreateAnnouncementDialog
            open={showCreateAnnouncementDialog}
            onOpenChange={(open) => setShowCreateAnnouncementDialog(open)}
          />
        )}
        <div>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={35}>
              <div className="flex justify-between items-center gap-2 pt-4 px-4">
                <h1 className="text-2xl font-bold">Announcements</h1>
                {isAdmin && (
                  <Button
                    size={"sm"}
                    className="h-8"
                    onClick={() => setShowCreateAnnouncementDialog(true)}
                  >
                    <PlusIcon className="mr-1" size={18} />
                    New Announcement
                  </Button>
                )}
              </div>
              {/* <Separator /> */}
              <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <DebouncedInput
                    placeholder="Search"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e as string)}
                  />
                </div>
              </div>
              <AnnouncementList
                posts={posts}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={35}>
              <AnnouncementDisplay post={selectedPost} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </>
    );
  }
}
