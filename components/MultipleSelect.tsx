import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type MultipleSelectProps = {
  placeholder: string;
  options: string[];
  selectedValue?: string;
  className?: string;
  onChange: (value: string) => void;
};

export default function MultipleSelect(props: MultipleSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`transition ease-in-out duration-200 hover:opacity-70 rounded-lg bg-gray-100 flex ${
          props.className ?? ""
        }`}
      >
        <input
          type="text"
          disabled={true}
          className="cursor-pointer w-full h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
          placeholder={props.placeholder}
          value={props.selectedValue ?? undefined}
        />
        <FontAwesomeIcon icon={faChevronDown} className="my-3 mr-2" />
      </div>
      <div className="relative">
        <div className="absolute top-0 inline-block left-0 rounded-lg p-4 shadow-lg">
          <p className="text-md">hello</p>
        </div>
      </div>
    </>
  );
}
