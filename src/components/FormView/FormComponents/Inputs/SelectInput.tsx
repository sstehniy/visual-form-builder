import { forwardRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ComplexValue, InputProps } from "../../../state/types";
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
    const baseStyle = `w-full border-2 tracking-wide pr-12 text-base rounded-md px-3 py-1.5`;

    return baseStyle;
  };

  const getIconProps = () => {
    const iconClassname = `absolute top-1/2 -translate-y-1/2  flex items-center justify-center shrink-0 text-current z-10 aspect-square right-0 rounded-full p-1.5 cursor-pointer text-xl right-3 ${
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
        className={`dropdown dropdown-top ${
          showOptions ? "dropdown-open" : ""
        }`}
        style={{ ...style }}
      >
        <label
          htmlFor={name}
          className="cursor-pointer label relative px-0"
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
            {showOptions ? (
              <FaChevronUp fill="rgb(148 163 184)" />
            ) : (
              <FaChevronDown fill="rgb(148 163 184)" />
            )}
          </div>
        </label>

        <ul
          tabIndex={0}
          className={`dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-3/4 max-h-44 overflow-y-scroll ${
            !showOptions ? "hidden" : ""
          }`}
        >
          {[defaultValue, ...data].map((val) => (
            <li
              key={`${name}_select_${val.value}`}
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
