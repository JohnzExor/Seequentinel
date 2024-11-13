import React, { ReactNode } from "react";
import SideNavigations from "./side-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "./header";
import UserDataProvider from "./data-provider";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex h-screen">
      <SideNavigations session={session} />
      <main className="md:overflow-y-auto w-full">
        <Header session={session} />
        <UserDataProvider>{children}</UserDataProvider>
      </main>
    </div>
  );
};

export default layout;
