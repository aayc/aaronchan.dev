import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type DropdownProps = {
    placeholder: string;
    options: string[];
    className?: string;
    onChange: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  return (
    <div className={`rounded-lg bg-gray-100 flex ${props.className}`}>
      <input
        type="text"
        disabled={true}
        className="w-full h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
        placeholder={props.placeholder}
      />
      <FontAwesomeIcon icon={faChevronDown} className="cursor-pointer my-3 mr-2" />
    </div>
  );
}
