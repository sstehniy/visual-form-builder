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
      <div className="relative flex justify-between">
        {label && (
          <label className="label" htmlFor={name}>
            <span className="label-text">{label}</span>
          </label>
        )}
        {tooltip && (
          <div className="relative">
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
              className="cursor-pointer text-lg mt-0.5 text-slate-500"
            />
            {!!tooltip && showTooltip && (
              <div
                className="absolute left-1/2 -translate-x-1/2 py-2 px-3 text-center shadow bg-slate-600 text-white rounded text-sm z-50"
                style={{
                  bottom: "calc(100% + 5px)",
                  maxWidth: 250,
                  minWidth: 125,
                }}
              >
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative form-control w-full">{children}</div>
    </div>
  );
};
