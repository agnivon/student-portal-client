export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  username: string | null;
  email: string;
  phone: string | null;
  is_active: boolean;
  admin_id: string | null;
  profile_image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
