import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import EmergencyCall from "./emergency-call";
import { EmergencyDataProvider } from "./emergency-data-provider";
import EmergencyResponse from "./emergency-response";
import InterviewForm from "./interview-form";
import { Emergencies } from "@prisma/client";
import { getEmergencyUseCase } from "@/use-cases/emergencies";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Params }) => {
  const { emergencyId } = params;

  let data;
  let error;

  try {
    data = await getEmergencyUseCase(emergencyId);
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }

  if (!data) {
    notFound();
  }

  return (
    <div className="h-screen grid grid-cols-1 xl:grid-cols-3">
      <EmergencyDataProvider data={data}>
        <EmergencyCall />
        <InterviewForm />
        <EmergencyResponse />
      </EmergencyDataProvider>
    </div>
  );
};

export default page;
