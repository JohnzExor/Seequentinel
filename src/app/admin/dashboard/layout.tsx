import React, { ReactNode } from "react";
import SideNavigations from "./side-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "./header";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") {
    redirect("/home");
  }

  return (
    <div className="flex h-screen">
      <SideNavigations session={session} />
      <main className="md:overflow-y-auto w-full">
        <Header session={session} />
        {children}
      </main>
    </div>
  );
};

export default layout;
