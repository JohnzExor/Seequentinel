import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "./header";
import SideNavigations from "./side-nav";
import EmergencyDataProvider from "./emergency-data-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen">
      <SideNavigations session={session} />
      <main className="md:overflow-y-auto w-full">
        <Header />
        <EmergencyDataProvider>{children}</EmergencyDataProvider>
      </main>
    </div>
  );
}
