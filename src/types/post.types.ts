import { IFile } from "./file.types";
import { User } from "./user.types";

export type Post = {
  _id: string;
  user: string;
  title: string;
  content: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PopulatedPost = Omit<Post, "user" | "attachments"> & {
  user: User;
  attachments: IFile[];
};
