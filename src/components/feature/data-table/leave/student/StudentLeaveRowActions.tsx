import RenderIf from "@/components/global/RenderIf";
import { Button } from "@/components/ui/button";
import { errorToast } from "@/lib/utils";
import store from "@/redux/store";
import {
  studentPortalApi,
  useDeleteLeaveMutation,
} from "@/redux/toolkit/query/services/student.portal";
import { StudentLeaveRecord } from "@/types/data.table.types";
import { Leave } from "@/types/leave.types";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";

export default function StudentLeaveTableRowActions({
  row,
}: {
  row: Row<Leave>;
}) {
  const [deleteLeave] = useDeleteLeaveMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteLeave(id).unwrap();
      store.dispatch(
        studentPortalApi.util.updateQueryData(
          "getMyLeaves",
          undefined,
          (draft) => {
            return draft.filter((l) => l._id !== id);
          }
        )
      );
      toast.success("Leave deleted");
    } catch (err) {
      errorToast(err);
    }
  };
  const status = row.getValue("status");
  const actionsDisabled = status !== "Pending";
  return (
    <div className="flex gap-2 h-8">
      <RenderIf isTrue={!actionsDisabled}>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="h-8 w-20"
          onClick={() => handleDelete(row.original._id)}
        >
          Delete
        </Button>
      </RenderIf>
      <RenderIf isTrue={actionsDisabled}>
        <div className="h-full flex items-center">No action</div>
      </RenderIf>
    </div>
  );
}
