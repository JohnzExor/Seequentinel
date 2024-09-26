"use client";

import ReportForm from "./report-form";
import { useState } from "react";
import PageDetails from "./page-details";
import Stepper from "./stepper";
import StepsText from "./steps-text";
import { steps } from "./steps";
import { Separator } from "@/components/ui/separator";

const ReportContent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  return (
    <div className="p-6 space-y-4">
      <PageDetails />
      <Separator className=" w-full" />
      <div className=" space-y-4 md:flex gap-8 md:pt-10 justify-center">
        <Stepper currentStep={currentStep} stepDetails={steps} />
        <div className=" space-y-4 w-full max-w-[800px]">
          <StepsText currentStep={currentStep} stepDetails={steps} />
          <Separator className=" w-full" />
          <ReportForm
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportContent;
