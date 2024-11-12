import { Button } from "@/components/ui/button";
import { UserRoundCog, UserRoundPlus } from "lucide-react";
import { useServerAction } from "zsa-react";
import { accountStatusToggleAction } from "./actions";
import { toast } from "@/hooks/use-toast";
import { UserStatusEnum } from "@prisma/client";

const DeactivateAccountBtn = ({
  userId,
  status,
}: {
  userId: string;
  status: UserStatusEnum;
}) => {
  const { execute, isPending } = useServerAction(accountStatusToggleAction);

  const handleOnClick = async (newStatus: UserStatusEnum) => {
    try {
      await execute({ userId, newStatus });
      toast({
        title: "Account Changes",
        description: "Successfully changed account status.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Account Changes",
        description: "Failed to change account status",
      });
    }
  };

  return (
    <>
      {status === "ACTIVE" ? (
        <Button
          onClick={() => handleOnClick("DISABLED")}
          disabled={isPending}
          className="space-x-1"
        >
          <UserRoundCog size={15} />
          <span>{isPending ? "Deactivating..." : "Deactivate"}</span>
        </Button>
      ) : (
        <Button
          onClick={() => handleOnClick("ACTIVE")}
          disabled={isPending}
          className="space-x-1"
        >
          <UserRoundPlus size={15} />
          <span>{isPending ? "Activating..." : "Activate"}</span>
        </Button>
      )}
    </>
  );
};

export default DeactivateAccountBtn;
