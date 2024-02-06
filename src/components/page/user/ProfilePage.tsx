import ChangePasswordForm from "@/components/feature/profile/ChangePasswordForm";
import ProfileForm from "@/components/feature/profile/ProfileForm";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="space-y-16 p-10 pb-16">
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your profile information.
          </p>
        </div>
        <Separator className="my-6" />
        <div>
          <ProfileForm />
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Change Password</h2>
          <p className="text-muted-foreground">Change your password.</p>
        </div>
        <Separator className="my-6" />
        <div>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
