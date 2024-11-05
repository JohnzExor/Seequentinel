import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "./header";
import SideNavigations from "./side-nav";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className="flex h-screen">
      <SideNavigations session={session} />
      <main className="md:overflow-y-auto w-full ">
        <Header />
        {children}
      </main>
    </div>
  );
}
