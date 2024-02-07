import { Button } from "@/components/ui/button";
import { errorToast } from "@/lib/utils";
import store from "@/redux/store";
import {
  studentPortalApi,
  useChangeUserStatusMutation,
} from "@/redux/toolkit/query/services/student.portal";
import { StudentRecord } from "@/types/data.table.types";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { AdminStudentTableContext } from "./AdminStudentTableContext";
import React from "react";

export default function AdminStudentTableRowActions({
  row,
}: {
  row: Row<StudentRecord>;
}) {
  const isActive = row.getValue("status") == "true";

  const [changeStatus] = useChangeUserStatusMutation();

  const adminStudentTableContext = React.useContext(AdminStudentTableContext);

  const handleChangeStatus = async (id: string, is_active: boolean) => {
    try {
      await changeStatus({
        user_id: id,
        is_active,
      }).unwrap();
      store.dispatch(
        studentPortalApi.util.updateQueryData(
          "getMyStudents",
          undefined,
          (draft) => {
            const candidate = draft.find((l) => l._id === id);
            if (candidate) {
              candidate.is_active = is_active;
            } else {
              throw new Error("Something went wrong");
            }
          }
        )
      );
      toast.success("User " + (is_active ? "activated" : "blocked"));
    } catch (err) {
      errorToast(err);
    }
  };
  return (
    <div className="flex gap-2 h-8">
      <Button
        size={"sm"}
        className="h-8 w-20"
        onClick={() => handleChangeStatus(row.original._id, !isActive)}
        variant={isActive ? "destructive" : "outline"}
      >
        {isActive ? "Block" : "Activate"}
      </Button>
      <Button
        size={"sm"}
        className="h-8"
        onClick={() =>
          adminStudentTableContext?.setShowResetPasswordDialog(row)
        }
        variant={"secondary"}
      >
        {`(Re)set Password`}
      </Button>
    </div>
  );
}
