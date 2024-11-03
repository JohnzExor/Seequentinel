"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { easeInOut, motion } from "framer-motion";
import backgroundImage from "/public/images/bg.png";

const AboutSection = () => {
  const matches = useMediaQuery("(min-width: 640px)");

  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary flex justify-center overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <motion.div
            initial={{
              x: matches ? 150 : 0,
              y: matches ? 0 : -30,
              opacity: 0,
            }}
            whileInView={{
              x: matches ? [150, 0] : 0,
              y: matches ? 0 : [-30, 0],
              opacity: [0, 1],
            }}
            transition={{ duration: 1, ease: easeInOut }}
            className="lg:order-last"
          >
            <Image
              alt="Campus map with incident markers"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full  shadow-xl"
              height="310"
              src={backgroundImage}
              width="550"
              placeholder="blur"
            />
          </motion.div>

          <motion.div
            initial={{ x: matches ? -150 : 0, opacity: 0 }}
            whileInView={{ x: matches ? [-150, 0] : 0, opacity: [0, 1] }}
            transition={{ duration: 1, ease: easeInOut }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
                About Seequentinel
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Seequentinel is a state-of-the-art emergency tracking and
                incident mapping system designed specifically for Palawan State
                University. Our mission is to create a safer campus environment
                by providing real-time incident reporting, tracking, and
                response coordination.
              </p>
            </div>
            <ul className="grid gap-2 py-4">
              {[
                "Developed by PSU students and faculty",
                "Tailored to PSU's unique campus layout",
                "Continuously updated with user feedback",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
