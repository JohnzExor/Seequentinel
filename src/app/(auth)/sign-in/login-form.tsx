"use client";

import { useServerAction } from "zsa-react";
import loginUserAction from "./actions";
import { useState } from "react";

const LoginForm = () => {
  const { execute, isError, error, isPending } =
    useServerAction(loginUserAction);

  const [loginErrors, setLoginErrors] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { 0: error } = await execute({ email, password });
    if (error) {
      setLoginErrors(error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div>Errors: {loginErrors}</div>
      <input
        type="email"
        name="email"
        placeholder="Enter your corporate email"
      />
      {isError ? (error.fieldErrors ? error.fieldErrors["email"] : null) : null}
      <input
        type="password"
        name="password"
        placeholder="Enter your Password"
      />
      {isError
        ? error.fieldErrors
          ? error.fieldErrors["password"]
          : null
        : null}

      <button type="submit" disabled={isPending}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
