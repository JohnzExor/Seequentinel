"use client";

import { MapPin, Bell, Shield, BarChart, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: MapPin,
    title: "Real-time Incident Mapping",
    description: "Visualize and track emergencies across campus in real-time.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Receive immediate notifications for any reported incidents.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Improve overall campus safety with proactive monitoring.",
  },
  {
    icon: BarChart,
    title: "Data Analytics",
    description:
      "Analyze incident patterns to improve emergency response strategies.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description:
      "Empower students and staff to report incidents quickly and easily.",
  },
];

const KeyFeaturesSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
      <div className="container px-4 md:px-6">
        <motion.h1
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: [-40, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground"
        >
          Key Features
        </motion.h1>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: [-10, 0], opacity: [0, 1] }}
              transition={{ delay: index * 0.4, duration: 0.5 }}
              className="flex flex-col items-center space-y-2 border-border p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
