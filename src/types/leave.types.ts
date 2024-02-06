import { User } from "./user.types";

export type Leave = {
  _id: string;
  student: string;
  from_date: string;
  to_date: string;
  reason: string | null;
  approved: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type PopulatedLeave = Omit<Leave, "student"> & { student: User };
