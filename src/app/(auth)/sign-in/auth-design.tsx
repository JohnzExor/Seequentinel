import { ModeToggle } from "@/components/theme/mode-toggle";
import { BringToFront } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthDesign = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" h-screen flex flex-col md:flex-row">
      <header className=" absolute z-20 w-full flex items-center justify-between p-6 md:p-16">
        <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          <BringToFront size={20} className="text-primary" />
          <Link
            href={"/welcome"}
            className="text-xl font-semibold tracking-tighter "
          >
            Seequentinel
          </Link>
        </div>
        <ModeToggle />
      </header>
      <div className=" h-screen w-full relative hidden md:block shadow-2xl">
        <Image
          src={"/images/bg.jpeg"}
          fill
          alt="bg"
          className=" object-cover brightness-90"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className=" space-y-5 max-w-[400px]">
          <div className=" w-full">{children}</div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthDesign;
