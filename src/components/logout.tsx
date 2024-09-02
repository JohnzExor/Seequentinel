"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Logout = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <button onClick={handleLogout} className="text-sm flex items-center gap-2">
      <LogOut />
      Logout
    </button>
  );
};

export default Logout;
