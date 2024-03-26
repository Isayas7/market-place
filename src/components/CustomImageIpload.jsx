import { CldUploadWidget } from "next-cloudinary";
import { CardContent } from "./ui/card";
import Image from "next/image";
import { XIcon } from "lucide-react";

const CustomImageIpload = ({ value, onChange, onRemove }) => {
  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className=" flex justify-center items-center ">
        <div className="size-36 flex justify-center items-center p-3 rounded-full   border  dark:border-gray-600 border-dashed hover:bg-gray-400/20  transition-all duration-500">
          <CldUploadWidget uploadPreset="tzsilibg" onUpload={onUpload}>
            {({ open }) => {
              return (
                <button type="button" onClick={() => open()}>
                  Upload Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>

      <CardContent className="flex flex-wrap gap-3 justify-center ">
        {value.map((url) => (
          <div className="rounded-md overflow-hidden relative">
            <>
              <Image
                width={300}
                height={500}
                src={url}
                alt="products"
                className="size-20 "
              />

              <XIcon
                onClick={() => onRemove(url)}
                className="absolute top-0.5 right-0.5 size-6 cursor-pointer  p-1 bg-transparent/40 hover:bg-transparent/80 rounded-full  text-white "
              />
            </>
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default CustomImageIpload;
