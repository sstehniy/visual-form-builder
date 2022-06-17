import { forwardRef } from "react";
import { ElementSize, InputDataType, InputProps } from "../../../state/types";
import { InputWrapper } from "./InputWrapper";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { size, icon, additionalAttrs } = props;

    const getInputClassame = (
      size: InputDataType["size"],
      icon: InputDataType["icon"]
    ) => {
      const baseStyle = `block w-100 border-2 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ring-slate-400 bg-white shadow-sm outline-none`;
      let sizeClassnames = "";
      let iconSpecificClassnames = "";
      switch (size) {
        case ElementSize.SMALL: {
          sizeClassnames = "text-sm rounded shadow-sm px-3 py-0.5";
          break;
        }
        case ElementSize.NORMAL: {
          sizeClassnames = "text-base rounded-md shadow px-3 py-1.5";
          break;
        }
        case ElementSize.LARGE: {
          sizeClassnames = "text-lg rounded-lg shadow-lg px-3.5 py-1.5";
          break;
        }
        default:
          break;
      }
      if (icon) {
        switch (icon.position) {
          case "before": {
            switch (size) {
              case ElementSize.SMALL: {
                iconSpecificClassnames = "pl-8";
                break;
              }
              case ElementSize.NORMAL: {
                iconSpecificClassnames = "pl-11";
                break;
              }
              case ElementSize.LARGE: {
                iconSpecificClassnames = "pl-12";
                break;
              }
              default:
                break;
            }
            break;
          }
          case "after": {
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
            break;
          }
          default:
            break;
        }
      }
      return `${baseStyle} ${sizeClassnames} ${iconSpecificClassnames}`;
    };

    const getIconProps = (size: ElementSize, icon: InputDataType["icon"]) => {
      if (!icon) return "";
      const iconClassname =
        "absolute top-0 bottom-0 flex items-center justify-center shrink-0 bg-slate-200 text-slate-500 p-2 z-10 aspect-square	";
      let iconSizeClassname!: string;
      let iconPositionSpecificClassname!: string;
      switch (size) {
        case ElementSize.SMALL: {
          iconSizeClassname = " text-base rounded";
          break;
        }
        case ElementSize.NORMAL: {
          iconSizeClassname = " text-xl rounded-md";
          break;
        }
        case ElementSize.LARGE: {
          iconSizeClassname = "text-2xl rounded-lg";
          break;
        }
        default:
          break;
      }

      switch (icon.position) {
        case "before": {
          iconPositionSpecificClassname = "left-0 rounded-r-none";
          break;
        }
        case "after": {
          iconPositionSpecificClassname = "right-0 rounded-l-none";
          break;
        }
        default:
          break;
      }

      return `${iconClassname} ${iconSizeClassname} ${iconPositionSpecificClassname}`;
    };
    return (
      <InputWrapper {...props}>
        <div className="relative flex w-100">
          <input
            type="text"
            ref={ref}
            className={getInputClassame(size, icon)}
            {...additionalAttrs}
            style={{ ...props.style }}
          />
          {!!icon && (
            <div className={getIconProps(size, icon)}>
              <icon.icon />
            </div>
          )}
        </div>
      </InputWrapper>
    );
  }
);

TextInput.displayName = "TextInput";
