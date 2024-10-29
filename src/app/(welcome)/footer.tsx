import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40">
        <p className="text-xs text-muted-foreground">
          © 2024 Seequentinel. All rights reserved. Palawan State University
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
