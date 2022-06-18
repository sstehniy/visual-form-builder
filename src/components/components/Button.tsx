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
    const baseClassName = "btn flex gap-2 focus:ring-2 focus:ring-offset-2";
    let sizeClassNames!: string;
    let iconClassNames!: string;

    switch (size) {
      case "small": {
        sizeClassNames = "btn-sm";
        break;
      }
      case "normal": {
        sizeClassNames = "btn";
        break;
      }
      case "large": {
        sizeClassNames = "btn-lg";
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
