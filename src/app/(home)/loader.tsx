import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => {
  return (
    <div className="p-6 flex items-center">
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
    </div>
  );
};

export default HomeLoading;
