"use client";

import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { BringToFront } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b">
      <div className="flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
        <BringToFront size={30} className="text-primary" />
        <span className="text-xl font-semibold tracking-tighter ">
          Seequentinel
        </span>
      </div>
      <div className=" flex items-center gap-2">
        <ModeToggle />
        <Button onClick={() => router.push("/sign-in")} variant="outline">
          Sign in
        </Button>
      </div>
    </header>
  );
};

export default Header;
