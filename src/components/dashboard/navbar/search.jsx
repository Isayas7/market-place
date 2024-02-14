import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className=" lg:w-[300px] rounded-3xl"
      />
    </div>
  );
}
