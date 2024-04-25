import { CldUploadWidget } from "next-cloudinary";
import { CardContent } from "./ui/card";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomSingleImageIpload = ({
  className,
  value,
  onChange,
  name,
  onRemove,
}) => {
  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className=" flex justify-center items-center ">
        <div
          className={cn(
            "relative size-36 flex justify-center items-center  rounded-full   border  dark:border-gray-600 border-dashed hover:bg-gray-400/20  transition-all duration-500",
            className
          )}
        >
          {value ? (
            <div className="rounded-full overflow-hidden ">
              <>
                <Image
                  width={300}
                  height={500}
                  src={value}
                  alt="products"
                  className={cn("size-36", className)}
                />

                <XIcon
                  onClick={() => onRemove(value)}
                  className="absolute top-0.5 right-0.5 size-6 cursor-pointer p-1 bg-transparent/40 hover:bg-transparent/80 rounded-full text-white"
                />
              </>
            </div>
          ) : (
            <CldUploadWidget uploadPreset="tzsilibg" onUpload={onUpload}>
              {({ open }) => (
                <button type="button" onClick={open}>
                  {name}
                </button>
              )}
            </CldUploadWidget>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSingleImageIpload;
