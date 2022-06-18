import { forwardRef, useState } from "react";
import { InputProps } from "../../../../state/types";
import { InputWrapper } from "../InputWrapper";
import styles from "./index.module.css";

export const FileInput = forwardRef<HTMLInputElement, Omit<InputProps, "icon">>(
  (props, ref) => {
    const { additionalAttrs } = props;

    return (
      <InputWrapper {...props}>
        <div className="form-control">
          <input
            type="file"
            ref={ref}
            className={styles.file}
            {...additionalAttrs}
          />
        </div>
      </InputWrapper>
    );
  }
);

FileInput.displayName = "FileInput";
