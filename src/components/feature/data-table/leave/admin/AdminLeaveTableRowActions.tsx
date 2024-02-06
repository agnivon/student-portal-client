import RenderIf from "@/components/global/RenderIf";
import { Button } from "@/components/ui/button";
import { errorToast } from "@/lib/utils";
import store from "@/redux/store";
import { studentPortalApi } from "@/redux/toolkit/query/services/student.portal";
import { StudentLeaveRecord } from "@/types/data.table.types";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";

export default function AdminLeaveTableRowActions({
  row,
}: {
  row: Row<StudentLeaveRecord>;
}) {
  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const promise = store.dispatch(
        studentPortalApi.endpoints.leaveApproval.initiate({ id, approved })
      );
      await promise.unwrap();
      store.dispatch(
        studentPortalApi.util.updateQueryData(
          "getAllLeaves",
          undefined,
          (draft) => {
            const candidate = draft.find((l) => l._id === id);
            if (candidate) {
              candidate.approved = approved;
            } else {
              throw new Error("Something went wrong");
            }
          }
        )
      );
      toast.success("Leave " + (approved ? "approved" : "rejected"));
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
          className="h-8 w-20"
          onClick={() => handleApproval(row.original._id, true)}
        >
          Approve
        </Button>
        <Button
          size={"sm"}
          className="h-8 w-20"
          onClick={() => handleApproval(row.original._id, false)}
          variant="secondary"
        >
          Reject
        </Button>
      </RenderIf>
      <RenderIf isTrue={actionsDisabled}>
        <div className="h-full flex items-center">No action</div>
      </RenderIf>
    </div>
  );
}
