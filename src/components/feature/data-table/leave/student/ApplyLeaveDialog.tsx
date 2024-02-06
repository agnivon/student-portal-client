import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux";
import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { errorToast } from "@/lib/utils";
import {
  studentPortalApi,
  useApplyLeaveMutation,
} from "@/redux/toolkit/query/services/student.portal";
import { ApplyLeaveFormSchema } from "@/schema/validation/form";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export default function ApplyLeaveDialog(
  props: React.ComponentProps<typeof DialogPrimitive.Root>
) {
  const dispatch = useAppDispatch();
  const [applyLeave, applyLeaveMutation] = useApplyLeaveMutation();
  const currentDate = new Date();

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [reason, setReason] = React.useState<string>("");
  const handleSubmit = async () => {
    try {
      const payload = ApplyLeaveFormSchema.validateSync({
        from_date: date?.from?.toISOString(),
        to_date: date?.to?.toISOString(),
        reason,
      });
      const leave = await applyLeave(payload).unwrap();
      dispatch(
        studentPortalApi.util.updateQueryData(
          "getMyLeaves",
          undefined,
          (draft) => {
            draft.unshift(leave);
          }
        )
      );
      toast.success("Leave applied");
      props.onOpenChange?.(false);
    } catch (err) {
      errorToast(err);
    }
  };

  const buttonsDisabled =
    applyLeaveMutation.isLoading || !date?.from || !date?.to;

  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[625px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Apply Leave</DialogTitle>
          <DialogDescription>
            Select a range of dates and provide a reason
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-6">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate}
            fromDate={addDays(currentDate, 1)}
            toDate={addDays(currentDate, 60)}
            fixedWeeks
            // min={1}
            // max={20}
            //numberOfMonths={2}
            className="w-fit"
            footer={
              <Button
                size="sm"
                className="h-fit mt-4"
                variant={"secondary"}
                onClick={() => setDate(undefined)}
                disabled={!date}
              >
                Clear Selection
              </Button>
            }
          />
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between">
              <span className="font-bold">From :</span>{" "}
              <span>
                {date?.from ? format(date?.from, "LLL d, yyyy") : "--"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">To :</span>{" "}
              {date?.to ? format(date?.to, "LLL d, yyyy") : "--"}
            </div>
            <div>
              <Textarea
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => props.onOpenChange?.(false)}
          >
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={buttonsDisabled}>
            Apply Leave
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
