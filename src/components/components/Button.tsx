import React from "react";
import { IconType } from "react-icons/lib";
import cx from "classnames";

type ButtonProps = {
  size: "small" | "normal" | "large";
  text?: string;
  icon?: { icon: IconType; position?: "before" | "after"; className?: string };
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  size,
  text,
  icon,
  onClick,
  className,
}) => {
  const getButtonClassName = () => {
    const baseClassName =
      "flex items-center justify-center gap-2 rounded-lg text-white font-medium transition-colors duration-150 focus:ring-2 focus:ring-offset-2";
    let sizeClassNames!: string;
    let iconClassNames!: string;

    switch (size) {
      case "small": {
        sizeClassNames = "h-8 px-4 text-sm shadow-md";
        break;
      }
      case "normal": {
        sizeClassNames = "h-10 px-5 text-base shadow-lg";
        break;
      }
      case "large": {
        sizeClassNames = "h-12 px-6 text-lg shadow-lg";
        break;
      }
      default:
        break;
    }

    if (icon) {
      switch (icon.position) {
        case "before":
          iconClassNames = "flex-row-reverse";
          break;
        case "after":
          break;
        default:
          break;
      }
    }
    return cx([baseClassName, sizeClassNames, iconClassNames, className || ""]);
  };

  const IconElement = icon?.icon;
  return (
    <button
      type="button"
      className={`${getButtonClassName()}`}
      onClick={onClick}
    >
      {text && <span>{text}</span>}
      {IconElement && <IconElement className={icon.className} />}
    </button>
  );
};
