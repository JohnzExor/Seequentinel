"use client";
import { Checkbox } from "@/components/ui/checkbox";
const EmergencyCall = () => {
  return (
    <div className=" h-screen w-full z-20 flex flex-col gap-4 items-center justify-center fixed bg-white bg-opacity-50">
      <div className=" bg-red-300 w-80 h-80 rounded-full flex items-center justify-center p-10 cursor-pointer shadow-2xl">
        <div className=" bg-red-500 w-full h-full rounded-full flex flex-col items-center justify-center text-white">
          <h1 className=" text-7xl font-bold">SOS</h1>
          <p className="text-sm">Tap 3 times</p>
        </div>
      </div>
      <div className="items-top flex space-x-2 bg-white p-4 rounded-xl shadow-2xl">
        <Checkbox id="locationConsent" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="locationConsent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Share Device Location
          </label>
          <p className="text-sm text-muted-foreground w-full max-w-80">
            By checking this box, you agree to share your device location with
            us for a better experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCall;
