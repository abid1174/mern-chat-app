import React from "react";

type Props = {
  children: any;
  type: "button" | "submit";
  handleClick?: () => void;
};

export default function Button({ children, type, handleClick }: Props) {
  return (
    <button
      className="bg-primary px-4 py-2 rounded"
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
