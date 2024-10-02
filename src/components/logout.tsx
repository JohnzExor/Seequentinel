"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const Logout = ({ text }: { text?: string }) => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-gap-1 items-center justify-center text-sm gap-1 font-semibold p-2.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300">
        <LogOut size={17} />
        {text ? text : null}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to sign out?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account. You can sign out again to
            access your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={handleLogout}>
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
