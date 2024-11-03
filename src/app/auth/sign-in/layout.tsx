import { BringToFront } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/mode-toggle";

import backgroundImage from "/public/images/bg.jpeg";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen lg:p-[5em] flex flex-col items-center">
      <div className="h-full flex items-center shadow-2xl w-full max-w-[90em] rounded-xl dark:border">
        <div className="relative h-full w-full hidden lg:block rounded-s-xl overflow-hidden brightness-90 dark:brightness-75">
          <Image
            src={backgroundImage}
            alt="bg"
            fill
            className=" object-cover rounded-s-xl hover:scale-105 duration-500 ease-out"
          />
        </div>
        <div className="flex flex-col items-center h-full w-full rounded-e-xl overflow-hidden">
          <header className="flex justify-between px-10 pt-10 w-full">
            <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
              <BringToFront size={20} className="text-primary" />
              <Link
                href={"/"}
                className="text-xl font-semibold tracking-tighter "
              >
                Seequentinel
              </Link>
            </div>
            <ModeToggle />
          </header>
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
      </div>
      <footer className=" absolute bottom-0 pb-8">
        <p className="text-xs text-muted-foreground">
          © 2024 Seequentinel. All rights reserved. Palawan State University
        </p>
      </footer>
    </div>
  );
}
