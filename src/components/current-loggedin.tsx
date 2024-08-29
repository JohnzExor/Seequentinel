"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import Logout from "./logout";

const CurrentLoggedin = () => {
  const { data } = useSession();
  return (
    <div>
      {data?.user ? (
        <div>
          currently logged in: {data.user.email} <Logout />
        </div>
      ) : (
        <Link href={"/sign-in"}>Login</Link>
      )}
    </div>
  );
};

export default CurrentLoggedin;
