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
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
};

export default page;
