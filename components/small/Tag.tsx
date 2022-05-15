import React from "react";

type TagProps = {
  text: string;
  isSelected?: boolean;
  className?: string;
  color?: string;
  onClick?: (text: string) => void;
};

export default function Tag(props: TagProps) {
  const handleClick = () => {
    if (props.onClick !== undefined) {
      props.onClick(props.text);
    }
  };

  const isClickable = props.onClick !== undefined;
  const isSelected = props.isSelected ?? true;
  const isClickableAndSelected =
    "cursor-pointer bg-purple-500 text-white hover:bg-purple-400";
  const isClickableAndDeselected =
    "cursor-poinrter bg-gray-50 text-black hover:bg-purple-100";
  const customClasses = isClickable
    ? isSelected
      ? isClickableAndSelected
      : isClickableAndDeselected
    : "bg-purple-500 text-white";

  return (
    <div
      className={`px-4 py-2 transition ease-in-out duration-100 ${customClasses} 
       rounded-lg shadow-md inline ${props.className}`}
      onClick={handleClick}
    >
      <span>{props.text}</span>
    </div>
  );
}
