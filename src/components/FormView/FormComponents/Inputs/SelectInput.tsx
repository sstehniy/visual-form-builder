import { forwardRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ComplexValue, ElementSize, InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";

const defaultValue: ComplexValue = {
  label: "No selection",
  value: null,
};
export const SelectInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon" | "size">
>((props, ref) => {
  const { data, name, style } = props;
  const [selectedValue, setSelectedValue] =
    useState<ComplexValue>(defaultValue);
  const [showOptions, setShowOptions] = useState(false);

  const getInputClassame = () => {
    const baseStyle = `w-full border-2 bg-primary-content pr-12 input-md`;
    let sizeClassnames!: string;

    return baseStyle + " " + sizeClassnames;
  };

  const getIconProps = () => {
    const iconClassname = `absolute top-1/2 -translate-y-1/2  flex items-center justify-center shrink-0  z-10 aspect-square right-0 rounded-full p-1.5 cursor-pointer text-xl right-3 ${
      showOptions ? "rotate-180" : ""
    } transition-transform duration-300 ease`;

    return iconClassname;
  };

  if (!data) return null;

  return (
    <InputWrapper {...props}>
      {/* <div className="relative flex w-100">
          <input
            type="number"
            ref={ref}
            className={getInputClassame(size)}
            {...additionalAttrs}
            style={{ ...props.style }}
          />
        </div> */}
      <div
        className={`dropdown ${showOptions ? "dropdown-open" : ""}`}
        style={{ ...style }}
      >
        <label
          htmlFor={name}
          className="cursor-pointer label relative p-0"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <input
            type="SelectInput"
            className={`input input-bordered ${
              showOptions ? "input-primary" : ""
            } ${getInputClassame()} pointer-events-none`}
            value={selectedValue.label || ""}
            id={`${name}_select`}
          />
          <div className={getIconProps()}>
            {showOptions ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </label>

        <ul
          tabIndex={0}
          className={`dropdown-content  p-0  menu shadow-lg bg-base-100 rounded-md w-full max-h-44 overflow-y-scroll ${
            !showOptions ? "hidden" : ""
          } top-14`}
        >
          {[defaultValue, ...data].map((val) => (
            <li
              key={`${name}_select_${val.value}`}
              className="p-0 m-0"
              onClick={() => {
                setShowOptions(false);
                setSelectedValue(val);
              }}
            >
              <a>{val.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </InputWrapper>
  );
});

SelectInput.displayName = "SelectInput";
