import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import EmergencyCall from "./emergency-call";
import { EmergencyDataProvider } from "./emergency-data-provider";
import EmergencyResponse from "./emergency-response";
import InterviewForm from "./interview-form";

const page = ({ params }: { params: Params }) => {
  const { emergencyId } = params;

  return (
    <div className="h-screen grid grid-cols-1 xl:grid-cols-3">
      <EmergencyDataProvider emergencyId={emergencyId}>
        <EmergencyCall />
        <InterviewForm />
        <EmergencyResponse />
      </EmergencyDataProvider>
    </div>
  );
};

export default page;
