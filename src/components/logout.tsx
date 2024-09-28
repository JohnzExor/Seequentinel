"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
const Logout = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Button
      onClick={handleLogout}
      variant={"outline"}
      className="flex items-center gap-1 border rounded-md px-2.5"
    >
      <LogOut size={17} />
    </Button>
  );
};

export default Logout;
