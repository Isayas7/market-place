import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Search({ placeholder, className }) {
  return (
    <div>
      <Input
        type="search"
        placeholder={placeholder}
        className={cn(
          "w-[160px] sm:w-[200px] md:w-[400px] rounded-3xl",
          className
        )}
      />
    </div>
  );
}
