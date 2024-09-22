"use client";

import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import NavLinks from "./nav-links";
import { BringToFront, PanelLeftDashed, PanelRightClose } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Logout from "@/components/logout";
import { Session } from "next-auth";

import { useLocalStorage } from "usehooks-ts";

const MotionDiv = [
  {
    logo: "Account and Settings",
    name: "",
    type: "dot",
  },

  {
    logo: <ModeToggle />,
    name: "Theme",
  },
  {
    logo: <Logout />,
    name: "Signout",
  },
];

const SideNavigations = ({ session }: { session: Session | null }) => {
  const user = session?.user;

  const [isMinimized, setisMinimized] = useLocalStorage("isMinimized", false);

  const sidebarWidth = { width: isMinimized ? 100 : 400 };

  const HandleMinimize = () => {
    const newValue = !isMinimized;
    setisMinimized(newValue);
  };

  return (
    <motion.aside
      initial={sidebarWidth}
      animate={sidebarWidth}
      transition={{ delay: 0.2, ease: easeInOut, type: "spring" }}
      className=" w-[400px] hidden md:flex flex-col py-10 px-7 shadow-2xl overflow-hidden dark:border-r"
    >
      <div
        className={clsx("flex items-center mb-9 w-full justify-between", {})}
      >
        <motion.div
          initial={{ opacity: isMinimized ? 0 : 1 }}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ delay: 0.5, ease: easeInOut }}
          className="flex items-center font-semibold gap-2 text-xl overflow-hidden"
        >
          <BringToFront size={30} className="text-primary" />
          Seequentinel
        </motion.div>
        <motion.button
          initial={{ marginRight: isMinimized ? 8 : 0 }}
          animate={{ marginRight: isMinimized ? 8 : 0 }}
          onClick={HandleMinimize}
        >
          {isMinimized ? <PanelRightClose /> : <PanelLeftDashed />}
        </motion.button>
      </div>
      <div className="flex flex-col w-full gap-3">
        <span className="text-sm font-semibold text-muted-foreground pl-3 text-nowrap">
          <motion.div
            initial={{
              marginLeft: 5,
              opacity: isMinimized ? 1 : 0,
            }}
            animate={{
              opacity: isMinimized ? 1 : 0,
            }}
            className="h-2 w-2 bg-muted-foreground rounded-full absolute mt-1.5"
          ></motion.div>
          <motion.span
            initial={{ opacity: isMinimized ? 0 : 1 }}
            animate={{ opacity: isMinimized ? 0 : 1 }}
          >
            Main Menu
          </motion.span>
        </span>
        <NavLinks isMinimized={isMinimized} />
      </div>
      <footer className=" mt-auto flex flex-col gap-4 text-sm">
        {MotionDiv.map(({ logo, name, type }, index) => (
          <div key={index} className="flex items-center gap-2 text-nowrap">
            {type ? (
              <span className="text-sm font-semibold text-muted-foreground pl-3 text-nowrap">
                <motion.div
                  initial={{
                    marginLeft: 5,
                    opacity: isMinimized ? 1 : 0,
                  }}
                  animate={{
                    opacity: isMinimized ? 1 : 0,
                  }}
                  className="h-2 w-2 bg-muted-foreground rounded-full absolute mt-1.5"
                ></motion.div>
                <motion.span
                  initial={{ opacity: isMinimized ? 0 : 1 }}
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {logo}
                </motion.span>
              </span>
            ) : (
              <div>{logo}</div>
            )}
            <motion.span
              initial={{
                opacity: isMinimized ? 0 : 1,
              }}
              animate={{
                opacity: isMinimized ? 0 : 1,
              }}
              transition={{ delay: 0.3 }}
            >
              {name}
            </motion.span>
          </div>
        ))}
        <div className="flex items-center gap-2 w-full text-nowrap">
          <Avatar>
            <AvatarFallback className="text-primary bg-primary-foreground text-xl font-bold">
              S
            </AvatarFallback>
          </Avatar>
          <motion.div
            initial={{
              opacity: isMinimized ? 0 : 1,
            }}
            animate={{
              opacity: isMinimized ? 0 : 1,
            }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <label className=" font-medium text-sm">{user?.email}</label>
            <span className=" text-muted-foreground text-xs">
              ID: {user?.id}
            </span>
          </motion.div>
        </div>
      </footer>
    </motion.aside>
  );
};

export default SideNavigations;
