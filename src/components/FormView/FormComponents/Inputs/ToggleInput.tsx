import { forwardRef } from "react";
import { InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";

export const ToggleInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon" | "size">
>((props, ref) => {
  const { label, style } = props;

  return (
    <InputWrapper {...props} label="">
      {/* <div className="relative flex w-100">
          <input
            type="number"
            ref={ref}
            className={getInputClassame(size)}
            {...additionalAttrs}
            style={{ ...props.style }}
          />
        </div> */}

      <div className="form-control" style={{ ...style }}>
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span>
          <input
            type="checkbox"
            className="toggle toggle-md toggle-primary"
            ref={ref}
          />
        </label>
      </div>
    </InputWrapper>
  );
});

ToggleInput.displayName = "ToggleInput";
