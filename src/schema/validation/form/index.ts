import { Content } from "next/font/google";
import * as Yup from "yup";

export const LoginFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

export const ProfileFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is required")
    .max(64, "A maximum of 64 characters is allowed"),
  last_name: Yup.string()
    .required("Last Name is required")
    .max(64, "A maximum of 64 characters is allowed"),
  username: Yup.string().max(64, "A maximum of 64 characters is allowed"),
  phone: Yup.string().max(15, "A maximum of 15 characters is allowed"),
});

export const RegisterFormSchema = Yup.object()
  .shape({
    registration_id: Yup.string().required("Registration code is required"),
    password: Yup.string()
      .min(10, "Password must be a minimum of 10 characters")
      .max(100, "Password must be a maximum of 100 characters")
      .required("Password is required"),
    confirm: Yup.string()
      .required("Confirm Password is required")
      .when("password", {
        is: (password: string) => password && password.length > 0,
        then: (schema) =>
          schema.oneOf([Yup.ref("password")], "Passwords must match"),
      }),
  })
  .concat(ProfileFormSchema);

export const ChangePasswordFormSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: RegisterFormSchema.fields.password,
  confirm: Yup.string()
    .required("Confirm Password is required")
    .when("newPassword", {
      is: (password: string) => password && password.length > 0,
      then: (schema) =>
        schema.oneOf([Yup.ref("newPassword")], "Passwords must match"),
    }),
});

export const AddStudentFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is required")
    .max(64, "A maximum of 64 characters is allowed"),
  last_name: Yup.string()
    .required("Last Name is required")
    .max(64, "A maximum of 64 characters is allowed"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email")
    .test(
      "unique-email",
      "This email already exists. Email must be unique",
      function (value) {
        const existing_emails = this.parent.existing_emails || [];
        return !existing_emails.includes(value);
      }
    ),
});

export const ResetPasswordFormSchema = Yup.object().shape({
  user_id: Yup.string().required(),
  password: RegisterFormSchema.fields.password,
  confirm: RegisterFormSchema.fields.confirm,
});

export const CreateAnnouncementFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(150, "Maximum 150 characters allowed"),
  content: Yup.string()
    .required("Content is required")
    .max(3000, "Maximum 3000 characters allowed"),
  attachments: Yup.array()
    .of(Yup.string())
    .max(5, "Maximum 5 attachments allowed"),
});

const dateSchema = Yup.string()
  .required("From and To Date is required")
  .matches(
    /^(?:(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,}))?(?:Z|([+-])(\d{2}):(\d{2})))?$/,
    "Invalid ISO date format"
  )
  .test("isValidIsoDate", "Invalid date", (value) => {
    return value ? new Date(value).toISOString() === value : true;
  });

export const ApplyLeaveFormSchema = Yup.object().shape({
  from_date: dateSchema,
  to_date: dateSchema,
  reason: Yup.string().max(150, "Maximum 150 characters allowed"),
});

export const ForgotPasswordEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ForgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  verification_code: Yup.string()
    .required("Verification code is required")
    .max(100),
  password: RegisterFormSchema.fields.password,
  confirm: RegisterFormSchema.fields.confirm,
});
