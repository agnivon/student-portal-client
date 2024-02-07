import { Leave } from "@/types/leave.types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTableColumnHeader from "../../DataTableColumnHeader";
import { User } from "@/types/user.types";
import store from "@/redux/store";
import moment from "moment";
import { statuses } from "../constants";
import StudentLeaveTableRowActions from "./StudentLeaveRowActions";
import { differenceInDays } from "date-fns";

const columnHelper = createColumnHelper<Leave>();

export const studentLeaveTableColumns = [
  columnHelper.accessor((row) => row._id, {
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (row.getValue("id") as string).slice(-5);
    },
  }),
  columnHelper.accessor((row) => row.from_date, {
    id: "from_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From Date" />
    ),
    cell: ({ row }) => {
      return moment(row.getValue("from_date")).format("LL");
    },
  }),
  columnHelper.accessor((row) => row.to_date, {
    id: "to_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To Date" />
    ),
    cell: ({ row }) => {
      return moment(row.getValue("to_date")).format("LL");
    },
  }),
  columnHelper.accessor(
    (row) => Math.abs(differenceInDays(row.from_date, row.to_date)),
    {
      id: "duration",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Duration" />
      ),
      cell: ({ row }) => {
        const duration = Number(row.getValue("duration")) + 1;
        return `${duration} day${duration > 1 ? "s" : ""}`;
      },
    }
  ),
  columnHelper.accessor((row) => row.reason || "--", {
    id: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <span className="line-clamp-1">{row.getValue("reason")}</span>
    ),
  }),
  columnHelper.accessor(
    (row) => {
      const approved: boolean | null = row.approved;
      const status = statuses.find((s) => s.approved === approved)?.status;
      return status;
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: string = row.getValue("status");
        const Icon = statuses.find((s) => s.status === status)?.icon;
        return (
          <div className="flex w-[100px] items-center">
            {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>{status}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    }
  ),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <StudentLeaveTableRowActions row={row} />,
  }),
] as ColumnDef<Leave, string>[];
