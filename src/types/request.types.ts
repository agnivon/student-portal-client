import {
  CreateAnnouncementFormSchema,
  AddStudentFormSchema,
  ChangePasswordFormSchema,
  LoginFormSchema,
  ProfileFormSchema,
  RegisterFormSchema,
  ApplyLeaveFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/schema/validation/form";
import { InferType } from "yup";

export type LoginPayload = InferType<typeof LoginFormSchema>;

export type RegisterPayload = InferType<typeof RegisterFormSchema>;

export type UpdateUserProfilePayload = InferType<typeof ProfileFormSchema>;

export type ChangePasswordPayload = InferType<typeof ChangePasswordFormSchema>;

export type AddStudentPayload = InferType<typeof AddStudentFormSchema>;

export type CreateAnnouncementPayload = InferType<
  typeof CreateAnnouncementFormSchema
>;

export type ApplyLeavePayload = InferType<typeof ApplyLeaveFormSchema>;

export type ResetPasswordPayload = InferType<typeof ResetPasswordFormSchema>;

export type ForgotPasswordPayload = InferType<typeof ForgotPasswordFormSchema>;
