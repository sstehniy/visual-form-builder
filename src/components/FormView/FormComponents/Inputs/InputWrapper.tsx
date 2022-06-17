import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { ElementSize, InputProps } from "../../../state/types";

export const InputWrapper: React.FC<React.PropsWithChildren<InputProps>> = ({
  children,
  ...childProps
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getLabelClassName = () => {
    switch (childProps.size) {
      case ElementSize.SMALL:
        return "block text-gray-600 text-sm font-medium mb-0";
      case ElementSize.NORMAL:
        return "block text-gray-600 text-base font-medium mb-0.5";
      case ElementSize.LARGE:
        return "block text-gray-600 text-base font-medium mb-1";
    }
  };

  const { style, label, name, tooltip } = childProps;
  return (
    <div style={{ ...style }}>
      <div className="relative flex justify-between">
        {label && (
          <label className={getLabelClassName()} htmlFor={name}>
            {label}
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
              className="cursor-pointer text-xl text-slate-500"
            />
            {!!tooltip && showTooltip && (
              <div
                className="absolute left-1/2 -translate-x-1/2 p-2 text-center shadow bg-slate-600 text-white rounded text-sm"
                style={{
                  bottom: "calc(100% + 5px)",
                  minWidth: 100,
                }}
              >
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
