import { forwardRef, useState } from "react";
import { ElementSize, InputDataType, InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const TextareaInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon" | "size">
>((props, ref) => {
  const getInputClassame = () => {
    const baseStyle = `w-full border-2 tracking-wide pr-12 text-base rounded-md px-3 py-1.5`;

    return baseStyle;
  };
  return (
    <InputWrapper {...props}>
      <div className="form-control">
        <textarea
          className={`textarea input-bordered  focus:input-primary ${getInputClassame()} resize-y`}
          placeholder="Info"
          rows={5}
        />
      </div>
    </InputWrapper>
  );
});

TextareaInput.displayName = "TextareaInput";
