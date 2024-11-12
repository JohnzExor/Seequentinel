"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import AddForm from "./add-form";

const AddAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="px-3 py-2 flex items-center gap-1 bg-primary text-sm text-white rounded-xl mt-4">
        <UserPlus /> <span>Add Admin</span>
      </DialogTrigger>
      <DialogContent className=" max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add User to Seequentinel</DialogTitle>
          <DialogDescription>
            Enter the corporate email that you want to add
          </DialogDescription>
        </DialogHeader>
        <AddForm open={isOpen} setOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAdmin;
