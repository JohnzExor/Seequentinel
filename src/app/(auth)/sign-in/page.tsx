import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginText from "./login-text";
import EmailForm from "./email-form";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div>
      <LoginText />
      <EmailForm />
    </div>
  );
};

export default page;
