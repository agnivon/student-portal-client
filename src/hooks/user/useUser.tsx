import { useAppSelector } from "../redux";

export default function useUser() {
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const isAdmin = user?.admin_id === null;
  return { user, isAdmin, authenticated };
}
