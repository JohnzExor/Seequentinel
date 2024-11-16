"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { easeInOut, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormInput, LibraryBig, QrCode } from "lucide-react";

const texts = [
  "Real-time incident reporting",
  1000,
  "Interactive campus safety maps",
  1000,
  "Efficient emergency response",
  1000,
  "Data-driven decision making",
  1000,
];

const formLink =
  "https://docs.google.com/forms/u/1/d/e/1FAIpQLSfSur2PW97HCwgCZ067dn1zl48BmwmVgM_BOQVgE7ja7B52Ww/viewform";

const TitleSection = () => {
  const router = useRouter();
  return (
    <motion.section
      initial={{ height: 0, y: -40 }}
      animate={{ height: [0, 500], y: [-40, 0] }}
      transition={{ duration: 1, ease: easeInOut }}
      className=" bg-secondary flex flex-col items-center justify-center space-y-4 overflow-hidden"
    >
      <div className="space-y-2 text-center px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground"
        >
          Streamlined Emergency Tracking and Incident Mapping
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ delay: 1, duration: 1 }}
          className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
        >
          Enhancing campus safety and emergency response at Palawan State
          University
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ delay: 1.5, duration: 1 }}
        className="gap-2 items-center flex flex-col justify-center w-full md:flex-row p-4"
      >
        <Button
          onClick={() => window.open(formLink, "_blank")}
          className="gap-2 w-full md:w-fit"
        >
          <QrCode />
          Answer our form
        </Button>
        <Button
          onClick={() => router.push("#about")}
          variant="outline"
          className="gap-2 w-full md:w-fit"
        >
          <LibraryBig />
          Learn More
        </Button>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 2, duration: 1 }}
      >
        <TypeAnimation
          sequence={texts}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className=" text-xl h-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground"
        />
      </motion.span>
    </motion.section>
  );
};

export default TitleSection;
