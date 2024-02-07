import { StudentRecord } from "@/types/data.table.types";
import { SetState } from "@/types/util.types";
import { Row } from "@tanstack/react-table";
import React from "react";

type AdminStudentTableContextType = {
  setShowResetPasswordDialog: SetState<Row<StudentRecord> | null>;
};

export const AdminStudentTableContext =
  React.createContext<AdminStudentTableContextType | null>(null);
