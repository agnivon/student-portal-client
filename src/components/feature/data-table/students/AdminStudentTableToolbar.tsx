"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import DataTableFacetedFilter from "../DataTableFacetedFilter";
import { AddStudentDialog } from "./AddStudentDialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AdminStudentTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [showAddStudentDialog, setShowAddStudentDialog] =
    React.useState<boolean>(false);

  const isFiltered = table.getState().columnFilters.length > 0;

  const statusFilterOptions = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];

  return (
    <>
      <AddStudentDialog
        open={showAddStudentDialog}
        onOpenChange={(open) => setShowAddStudentDialog(open)}
      />
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter students..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statusFilterOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div>
          <Button
            size={"sm"}
            className="h-8"
            onClick={() => setShowAddStudentDialog(true)}
            variant={"outline"}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
    </>
  );
}
