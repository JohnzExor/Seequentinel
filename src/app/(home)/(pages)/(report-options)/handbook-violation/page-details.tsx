import { Book } from "lucide-react";

const PageDetails = () => {
  return (
    <div className="space-y-2 w-full">
      <h1 className="text-4xl font-semibold flex items-center gap-2">
        Handbook Violation Report
        <Book size={30} className="text-primary" />
      </h1>
      <p className="text-muted-foreground">
        The Handbook Violation Report page allows students, faculty, and staff
        to report any breaches of the campus handbook policies. Submit detailed
        reports to ensure compliance and address violations promptly, helping to
        maintain a safe and respectful environment for everyone on campus.
      </p>
    </div>
  );
};

export default PageDetails;
