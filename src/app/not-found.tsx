import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen -space-y-[30px]  md:-space-y-[100px] p-4 md:p-0">
      <h1 className=" text-[150px] md:text-[400px] font-bold text-muted -mt-[100px]">
        404
      </h1>
      <div className="flex flex-col gap-4 items-center text-center">
        <span className=" text-xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          We couldn&apos;t connect the dots.
        </span>
        <p className=" text-sm md:text-base w-full max-w-[400px] text-center">
          This page was not found. You may have mistyped the address or the page
          may have moved.
        </p>
        <Link href={"/"} className=" text-blue-400 text-sm">
          Take me to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
