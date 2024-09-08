import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthDesign from "./auth-design";

// import Sidebar from "./sidebar";
// import Header from "./header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/report");
  }
  return (
    <>
      {/* <Header /> */}
      <AuthDesign>{children}</AuthDesign>
    </>
  );
}
