import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./side-nav";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/home/settings",
  },
  {
    title: "Appearance",
    href: "/home/settings/appearance",
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="space-y-6 p-6 md:p-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
