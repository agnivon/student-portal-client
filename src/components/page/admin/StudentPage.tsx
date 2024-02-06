"use client";

import { AdminStudentTable } from "@/components/feature/data-table/students/AdminStudentTable";
import { adminStudentTableColumns } from "@/components/feature/data-table/students/columns";
import Loading from "@/components/global/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetMyStudentsQuery } from "@/redux/toolkit/query/services/student.portal";

export default function StudentPage() {
  const studentsQuery = useGetMyStudentsQuery(undefined);

  if (studentsQuery.isFetching) {
    return <Loading className="flex-grow" />;
  }

  if (studentsQuery.isSuccess && studentsQuery.data) {
    return (
      <div className="h-full flex-1 flex-col space-y-6 p-10 flex">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">My Students</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your students
          </p>
        </div>
        <Separator />
        <AdminStudentTable
          data={studentsQuery.data}
          columns={adminStudentTableColumns}
        />
      </div>
    );

    return null;
  }
}
