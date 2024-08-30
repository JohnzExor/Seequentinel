import Link from "next/link";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <aside>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/dashboard/report-progress"}>Report Progress</Link>
        <Link href={"/dashboard/settings"}>Settings</Link>
      </aside>
      {children}
    </div>
  );
};

export default SideBar;
