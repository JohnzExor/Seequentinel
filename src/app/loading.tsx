import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex justify-center h-screen w-screen items-center">
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
    </div>
  );
};

export default loading;
