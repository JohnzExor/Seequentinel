import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div>
      <div className="p-6 flex items-center">
        <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
        <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
        <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
        <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
        <Skeleton className="h-[40px] w-[40px] rounded-full m-[10px]" />
      </div>
    </div>
  );
};

export default loading;
