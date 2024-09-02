"use client";

import { useSession } from "next-auth/react";
import Logout from "./logout";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();

  return (
    <header className="flex justify-between p-6 items-center">
      <Link href={"/"} className=" font-medium text-primary text-2xl">
        Seequentinel
      </Link>
      {data?.user ? (
        <div>
          {data.user.email} <Logout />
        </div>
      ) : (
        <Link
          href={"/sign-in"}
          className=" bg-primary rounded-xl px-4 py-2 text-white"
        >
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
