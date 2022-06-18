import { forwardRef, useState } from "react";
import { ElementSize, InputDataType, InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon">
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { size, additionalAttrs } = props;

  const getInputClassame = (size: InputDataType["size"]) => {
    const baseStyle = `w-full border-2 tracking-wide`;
    let sizeClassnames = "";
    let iconSpecificClassnames = "";
    switch (size) {
      case ElementSize.SMALL: {
        sizeClassnames = "text-sm rounded px-3 py-1";
        break;
      }
      case ElementSize.NORMAL: {
        sizeClassnames = "text-base rounded-md px-3 py-1.5";
        break;
      }
      case ElementSize.LARGE: {
        sizeClassnames = "text-lg rounded-lg px-3.5 py-1.5";
        break;
      }
      default:
        break;
    }

    switch (size) {
      case ElementSize.SMALL: {
        iconSpecificClassnames = "pr-10";
        break;
      }
      case ElementSize.NORMAL: {
        iconSpecificClassnames = "pr-12";
        break;
      }
      case ElementSize.LARGE: {
        iconSpecificClassnames = "pr-14";
        break;
      }
      default:
        break;
    }

    return `${baseStyle} ${sizeClassnames} ${iconSpecificClassnames}`;
  };

  const getIconProps = (size: ElementSize) => {
    const iconClassname =
      "absolute top-1/2 -translate-y-1/2  flex items-center justify-center shrink-0 text-current z-10 aspect-square right-0 rounded-full p-1.5 hover:bg-slate-200 cursor-pointer transition-colors duration-150 ease text-slate-400";
    let iconSizeClassname!: string;

    switch (size) {
      case ElementSize.SMALL: {
        iconSizeClassname = " text-base right-2";
        break;
      }
      case ElementSize.NORMAL: {
        iconSizeClassname = " text-xl right-3";
        break;
      }
      case ElementSize.LARGE: {
        iconSizeClassname = "text-2xl right-3.5";
        break;
      }
      default:
        break;
    }

    return `${iconClassname} ${iconSizeClassname}`;
  };
  return (
    <InputWrapper {...props}>
      <div className="form-control">
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={`input input-bordered focus:input-primary ${getInputClassame(
            size
          )}`}
          {...additionalAttrs}
        />
        <div
          className={getIconProps(size)}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
    </InputWrapper>
  );
});

PasswordInput.displayName = "PasswordInput";
