"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <TypeAnimation
              sequence={[
                "Ready to enhance campus safety?",
                1000,
                "Streamline reporting with ease.",
                1000,
                "Join the Seequentinel network today!",
                1000,
              ]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground"
            />
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join the Seequentinel network and contribute to a safer Palawan
              State University.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex flex-col gap-2 min-[400px]:flex-row">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button type="submit">
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link
                className="underline underline-offset-2 hover:text-primary transition-colors"
                href="#"
              >
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
