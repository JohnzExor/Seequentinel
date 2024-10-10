import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "./change-password-form";

const page = () => {
  return (
    <div className=" space-y-3">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          In the account settings, users can change their password.
        </p>
      </div>
      <Separator />
      <ChangePasswordForm />
    </div>
  );
};

export default page;
