import { useField } from "formik";
import { Input, InputProps } from "../ui/input";

export default function FormikInput(
  props: Omit<InputProps, "name"> & { name: string }
) {
  const [field] = useField({ name: props.name });

  return <Input {...field} {...props} />;
}
