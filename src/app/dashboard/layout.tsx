import { getServerSession } from "next-auth";
import SideBar from "./side-bar";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  return <SideBar>{children}</SideBar>;
}
