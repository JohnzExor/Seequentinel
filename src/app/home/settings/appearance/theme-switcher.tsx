"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    {
      name: "Light",
      colorClasses: {
        bg: "bg-[#ecedef]",
        innerBg: "bg-white",
        rounded: "bg-[#ecedef]",
      },
      value: "light",
    },
    {
      name: "Dark",
      colorClasses: {
        bg: "bg-slate-950",
        innerBg: "bg-slate-800",
        rounded: "bg-slate-400",
      },
      value: "dark",
    },
    {
      name: "System",
      colorClasses: {
        bg: systemTheme === "light" ? "bg-[#ecedef]" : "bg-slate-950",
        innerBg: systemTheme === "light" ? "bg-white" : "bg-slate-800",
        rounded: systemTheme === "light" ? "bg-[#ecedef]" : "bg-slate-400",
      },
      value: "system",
    },
  ];

  if (!mounted) return <Skeleton className="w-full h-[250px]" />;

  const onThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div className="text-sm space-y-2">
      <h1 className="font-semibold">Theme</h1>
      <span className="text-muted-foreground">
        Select the theme for the dashboard.
      </span>
      <RadioGroup
        onValueChange={onThemeChange}
        defaultValue={theme}
        className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-2"
      >
        {themes.map(({ colorClasses, value, name }) => (
          <label
            key={value}
            className="[&:has([data-state=checked])>div]:border-primary"
          >
            <RadioGroupItem value={value} className="sr-only" />
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className={`space-y-2 rounded-sm ${colorClasses.bg} p-2`}>
                <div
                  className={`space-y-2 rounded-md ${colorClasses.innerBg} p-2 shadow-sm`}
                >
                  <div
                    className={`h-2 w-[80px] rounded-lg ${colorClasses.rounded}`}
                  />
                  <div
                    className={`h-2 w-[100px] rounded-lg ${colorClasses.rounded}`}
                  />
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md ${colorClasses.innerBg} p-2 shadow-sm`}
                >
                  <div
                    className={`h-4 w-4 rounded-full ${colorClasses.rounded}`}
                  />
                  <div
                    className={`h-2 w-[100px] rounded-lg ${colorClasses.rounded}`}
                  />
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md ${colorClasses.innerBg} p-2 shadow-sm`}
                >
                  <div
                    className={`h-4 w-4 rounded-full ${colorClasses.rounded}`}
                  />
                  <div
                    className={`h-2 w-[100px] rounded-lg ${colorClasses.rounded}`}
                  />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              {name}
            </span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ThemeSwitcher;
