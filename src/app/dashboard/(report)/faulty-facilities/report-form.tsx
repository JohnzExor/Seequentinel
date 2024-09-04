"use client";

import { useServerAction } from "zsa-react";
import faultyFacilitiesAction from "./actions";
import { useSession } from "next-auth/react";

const ReportForm = () => {
  const session = useSession();
  const { execute, isError, error, isPending } = useServerAction(
    faultyFacilitiesAction
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const type = formData.get("type") as string;
    const media = formData.get("media") as string;
    const location = formData.get("location") as string;
    const status = "Request";
    const userId = session.data?.user.id.toString();
    const data = await execute({ type, media, location, status, userId });
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Faulty facilities</h1>
      <input type="text" name="type" placeholder="type" />
      {isError ? (error.fieldErrors ? error.fieldErrors["type"] : null) : null}

      <input type="text" name="media" placeholder="enter images/videos" />
      {isError ? (error.fieldErrors ? error.fieldErrors["media"] : null) : null}

      <input type="text" name="location" placeholder="location" />
      {isError
        ? error.fieldErrors
          ? error.fieldErrors["location"]
          : null
        : null}

      <button type="submit" disabled={isPending}>
        Submit Report
      </button>
    </form>
  );
};

export default ReportForm;
