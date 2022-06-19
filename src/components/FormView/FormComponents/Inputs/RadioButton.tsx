import { forwardRef } from "react";
import { InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";

export const RadioButton = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon" | "size">
>((props, ref) => {
  const { data, name, style } = props;

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
      <div className={`flex gap-1`} style={{ ...style }}>
        {data.map((val, idx) => {
          return (
            <div className="form-control" key={`${name}_${idx}`}>
              <label htmlFor={`${name}_${val.value}`} className="label">
                <input
                  type="radio"
                  className={`radio radio-primary radio-sm`}
                  value={val.value || ""}
                  name={name}
                  id={`${name}_${val.value}`}
                />
                <span className="label-text ml-1.5">{val.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </InputWrapper>
  );
});

RadioButton.displayName = "RadioButton";
