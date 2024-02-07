import { userFullName } from "@/lib/utils";
import { StudentRecord } from "@/types/data.table.types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTableColumnHeader from "../DataTableColumnHeader";
import AdminStudentTableRowActions from "./AdminStudentTableRowActions";

const columnHelper = createColumnHelper<StudentRecord>();

export const adminStudentTableColumns = [
  columnHelper.accessor((row) => row._id, {
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (row.getValue("id") as string).slice(-5);
    },
  }),
  columnHelper.accessor((row) => userFullName(row), {
    id: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  }),
  columnHelper.accessor((row) => row.username || "--", {
    id: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor((row) => row.email, {
    id: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  }),
  columnHelper.accessor((row) => row.phone || "--", {
    id: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor((row) => String(row.is_active), {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>{row.getValue("status") === "true" ? "Active" : "Inactive"}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <AdminStudentTableRowActions row={row} />,
  }),
] as ColumnDef<StudentRecord, string>[];
