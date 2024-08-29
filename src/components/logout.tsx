"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
