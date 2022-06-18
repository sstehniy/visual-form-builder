import { forwardRef } from "react";
import { InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";

export const RangeInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon" | "size">
>((props, ref) => {
  const { additionalAttrs } = props;

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
      <input
        type="range"
        min="0"
        max="100"
        {...additionalAttrs}
        className="range range-primary range-sm"
      />
    </InputWrapper>
  );
});

RangeInput.displayName = "RangeInput";
