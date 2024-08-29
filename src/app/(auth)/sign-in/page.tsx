import { getServerSession } from "next-auth";
import LoginForm from "./login-form";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
