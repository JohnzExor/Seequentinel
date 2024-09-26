import Link from "next/link";

const page = () => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <label>Seequentinel</label>
        <Link href={"/sign-in"}>Sign in</Link>
      </header>
      <div>
        <h1>Seequentinel</h1>
        <p>page</p>
      </div>
    </div>
  );
};

export default page;
