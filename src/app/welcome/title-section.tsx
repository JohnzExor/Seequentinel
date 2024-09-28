import { Button } from "@/components/ui/button";
import React from "react";

const TitleSection = () => {
  return (
    <section className=" bg-secondary h-[500px] flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center px-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          Streamlined Emergency Tracking and Incident Mapping
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Enhancing campus safety and emergency response at Palawan State
          University
        </p>
      </div>
      <div className="space-x-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
};

export default TitleSection;
