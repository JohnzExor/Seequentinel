import SideBar from "./sidebar";

const SideBarToggle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="hidden md:block h-screen">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default SideBarToggle;
