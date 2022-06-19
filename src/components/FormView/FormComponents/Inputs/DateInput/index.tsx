import { forwardRef } from "react";
import {
  BsFillCalendar2MinusFill,
  BsFillCalendar2WeekFill,
} from "react-icons/bs";
import {
  ElementSize,
  InputDataType,
  InputProps,
} from "../../../../state/types";
import { InputWrapper } from "../InputWrapper";

import styles from "./index.module.css";

export const DateInput = forwardRef<HTMLInputElement, Omit<InputProps, "icon">>(
  (props, ref) => {
    const { size, additionalAttrs } = props;

    const getInputClassame = (size: InputDataType["size"]) => {
      const baseStyle = `w-full border-2 cursor-pointer`;
      let sizeClassnames = "";
      let iconSpecificClassnames = "";
      switch (size) {
        case ElementSize.SMALL: {
          sizeClassnames = "input-sm";
          break;
        }
        case ElementSize.NORMAL: {
          sizeClassnames = "input-md";
          break;
        }
        case ElementSize.LARGE: {
          sizeClassnames = "input-lg";
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
        "absolute top-0 bottom-0 flex items-center justify-center shrink-0 opacity-50 p-1.5  hrink-0 z-10";
      let iconSizeClassname!: string;

      switch (size) {
        case ElementSize.SMALL: {
          iconSizeClassname = " text-base right-2";
          break;
        }
        case ElementSize.NORMAL: {
          iconSizeClassname = " text-xl right-2";
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
        <div className="form-control flex w-100 cursor-pointer">
          <input
            type="date"
            ref={ref}
            placeholder="Select date"
            className={`input input-bordered focus:input-primary ${getInputClassame(
              size
            )} ${styles.dateInput}`}
            {...additionalAttrs}
            onClick={async (e) => {
              try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await e.currentTarget?.showPicker();
              } catch (error) {
                console.error(error);
              }
            }}
          />
          <div className={getIconProps(size)}>
            <BsFillCalendar2WeekFill />
          </div>
        </div>
      </InputWrapper>
    );
  }
);

{
  /* <input
            type="date"
            ref={ref}
            placeholder="Select date"
            className={`${getInputClassame(size)} ${styles.dateInput}`}
            {...additionalAttrs}
            onClick={async (e) => {
              try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await e.currentTarget?.showPicker();
              } catch (error) {
                console.error(error);
              }
            }}
          /> */
}

DateInput.displayName = "DateInput";
