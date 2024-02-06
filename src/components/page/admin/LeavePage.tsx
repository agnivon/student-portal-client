"use client";

import { AdminLeaveTable } from "@/components/feature/data-table/leave/admin/AdminLeaveTable";
import { adminLeaveTableColumns } from "@/components/feature/data-table/leave/admin/columns";
import Loading from "@/components/global/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetAllLeavesQuery } from "@/redux/toolkit/query/services/student.portal";

export default function LeavePage() {
  const leavesQuery = useGetAllLeavesQuery(undefined);

  if (leavesQuery.isFetching) {
    return <Loading className="flex-grow" />;
  }

  if (leavesQuery.isSuccess && leavesQuery.data) {
    return (
      <div className="h-full flex-1 flex-col space-y-6 p-10 flex">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Student Leaves</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all student leaves
          </p>
        </div>
        <Separator />
        <AdminLeaveTable
          data={leavesQuery.data}
          columns={adminLeaveTableColumns}
        />
      </div>
    );
  }
  return null;
}
