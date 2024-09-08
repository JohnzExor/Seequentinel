"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
const Logout = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Button onClick={handleLogout} className="flex items-center gap-1">
      <LogOut />
      Logout
    </Button>
  );
};

export default Logout;
