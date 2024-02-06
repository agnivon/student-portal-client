import { CheckCircledIcon, ClockIcon, CrossCircledIcon } from "@radix-ui/react-icons";

export const statuses = [
  {
    status: "Pending",
    approved: null,
    icon: ClockIcon,
  },
  {
    status: "Approved",
    approved: true,
    icon: CheckCircledIcon,
  },
  {
    status: "Rejected",
    approved: false,
    icon: CrossCircledIcon,
  },
];
