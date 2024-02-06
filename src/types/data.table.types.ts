import { ColumnDef } from "@tanstack/react-table";
import { PopulatedLeave } from "./leave.types";
import { User } from "./user.types";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type StudentLeaveRecord = PopulatedLeave;
export type StudentRecord = User;
