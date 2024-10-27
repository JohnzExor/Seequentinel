import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "./header";
import SideNavigations from "./side-nav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session?.user && session.user.type !== "admin")) {
    redirect("/");
  }
  return (
    <div className="flex h-screen">
      <SideNavigations session={session} />
      <main className="md:overflow-y-auto w-full ">
        <Header />
        <div className="p-4 md:p-10 ">{children}</div>
      </main>
    </div>
  );
}
