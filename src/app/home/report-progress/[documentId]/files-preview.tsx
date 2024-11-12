"use client";
import { fileUrl } from "@/lib/storage";
import { ArrowBigDownDash } from "lucide-react";
import Image from "next/image";

const FilesPreview = ({ files }: { files: string[] }) => {
  return (
    <section>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <ArrowBigDownDash size={20} />
        <span>Uploaded Files</span>
      </div>
      <span className="text-sm font-medium">
        No. of uploaded files:{" "}
        <span className=" font-bold">{files ? files.length : null}</span>
      </span>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {files
          ? files.length > 0
            ? files.map((path, index) => (
                <div className="border w-full h-[300px] rounded-xl" key={index}>
                  <div className=" w-full h-full relative">
                    <Image
                      src={`${fileUrl}${path}`}
                      alt={path}
                      fill
                      className=" object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))
            : null
          : null}
      </div>
    </section>
  );
};

export default FilesPreview;
