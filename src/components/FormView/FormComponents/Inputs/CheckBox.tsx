import { forwardRef } from "react";
import { InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";

export const CheckBox = forwardRef<
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
              <label
                htmlFor={`${name}_${val.value}`}
                className="cursor-pointer label justify-start gap-1.5"
              >
                <input
                  type="checkbox"
                  className={`checkbox checkbox-primary checkbox-sm rounded`}
                  value={val.value || ""}
                  id={`${name}_${val.value}`}
                />

                <span className="label-text">{val.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </InputWrapper>
  );
});

CheckBox.displayName = "CheckBox";
