import { Button } from "@/components/ui/button";
import { BringToFront } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border/40">
      <div className="flex items-center">
        <BringToFront className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-medium bg-clip-text ">
          Seequentinel
        </span>
      </div>
      <Button
        variant="outline"
        className="shadow-lg hover:shadow-primary/50 transition-all duration-300"
      >
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
    </header>
  );
};

export default Header;
