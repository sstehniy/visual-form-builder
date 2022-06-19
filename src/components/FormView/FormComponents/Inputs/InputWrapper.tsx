import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { ElementSize, InputProps } from "../../../state/types";

export const InputWrapper: React.FC<
  React.PropsWithChildren<Partial<InputProps>>
> = ({ children, ...childProps }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { wrapperStyle, label, name, tooltip } = childProps;
  return (
    <div className="mb-4 " style={{ ...wrapperStyle }}>
      <div className="relative flex justify-between items-center">
        {label && (
          <label className="label" htmlFor={name}>
            <span className="label-text">{label}</span>
          </label>
        )}
        {tooltip && (
          <div className="relative">
            {!!tooltip && (
              <div className="tooltip" data-tip={tooltip}>
                <BiInfoCircle
                  onPointerEnter={() => {
                    setShowTooltip(true);
                  }}
                  onPointerLeave={() => {
                    setShowTooltip(false);
                  }}
                  onMouseEnter={() => {
                    setShowTooltip(true);
                  }}
                  onMouseLeave={() => {
                    setShowTooltip(false);
                  }}
                  className="cursor-pointer text-lg mt-0.5 opacity-60"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative form-control w-full">{children}</div>
    </div>
  );
};
