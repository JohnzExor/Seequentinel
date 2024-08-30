import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>Select Report Option</h1>
      <Link href={"/dashboard/report/faulty-facilities"}>
        Faulty Facilities
      </Link>
      <Link href={"/dashboard/report/behavioral"}>Behavioral</Link>
      <Link href={"/dashboard/report/emergency"}>Emergency</Link>
    </div>
  );
};

export default page;
