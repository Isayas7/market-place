"use client";

import { useState } from "react";

import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

const MultiText = ({ onChange, value, onRemove, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="flex flex-wrap gap-1 mt-4">
        {value.map((item, index) => (
          <Badge
            key={index}
            variant="secondary"
            className=" flex justify-between"
          >
            <div>{item}</div>
            <button
              className="ml-2 rounded-full outline-none   text-destructive"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
