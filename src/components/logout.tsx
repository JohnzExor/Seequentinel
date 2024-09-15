"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
const Logout = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 border p-2.5 rounded-md"
    >
      <LogOut size={17} />
    </button>
  );
};

export default Logout;
