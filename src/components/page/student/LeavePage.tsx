"use client";

import { StudentLeaveTable } from "@/components/feature/data-table/leave/student/StudentLeaveTable";
import { studentLeaveTableColumns } from "@/components/feature/data-table/leave/student/columns";
import Loading from "@/components/global/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetMyLeavesQuery } from "@/redux/toolkit/query/services/student.portal";

export default function LeavePage() {
  const leavesQuery = useGetMyLeavesQuery(undefined);

  if (leavesQuery.isFetching) {
    return <Loading className="flex-grow" />;
  }

  if (leavesQuery.isSuccess && leavesQuery.data) {
    return (
      <div className="h-full flex-1 flex-col space-y-6 p-10 flex">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Your Leaves</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your applied leaves
          </p>
        </div>
        <Separator />
        <StudentLeaveTable
          data={leavesQuery.data}
          columns={studentLeaveTableColumns}
        />
      </div>
    );
  }
  return null;
}
