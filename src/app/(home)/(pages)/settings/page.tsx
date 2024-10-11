import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "./change-password-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" space-y-4">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          In the account settings, users can change their password.
        </p>
      </div>
      <Separator />

      {session?.user ? (
        <div className=" border rounded-xl p-3 mt-4">
          <h1 className=" font-semibold">{session?.user.email}</h1>
          <span className=" text-muted-foreground text-sm">
            ID: {session?.user.id}
          </span>
        </div>
      ) : null}

      <div>
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground pb-4">
          To secure your account, please change your password.
        </p>
        <ChangePasswordForm userId={session?.user.id} />
      </div>
    </div>
  );
};

export default page;
