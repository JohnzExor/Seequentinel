import { MapPin, Bell, Shield, BarChart, Users } from "lucide-react";

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
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Key Features
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 border-border p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
