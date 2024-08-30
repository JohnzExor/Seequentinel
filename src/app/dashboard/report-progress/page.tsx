import { authOptions } from "@/lib/auth";
import { getUserReportsUseCase } from "@/use-cases/faulty-facilities";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  const data = await getUserReportsUseCase(
    session?.user.id.toString() as string
  );
  return (
    <div>
      {data.map(({ type, status }) => (
        <div>
          <h1>{type}</h1>
          <p>{status}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
