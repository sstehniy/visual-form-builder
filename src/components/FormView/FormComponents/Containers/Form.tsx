import { ReactNode } from "react";
import {
  Component,
  ContainerDataType,
  ContainerType,
  InputType,
} from "../../../state/types";
import {
  CheckBox,
  DateInput,
  FileInput,
  NumberInput,
  PasswordInput,
  RadioButton,
  RangeInput,
  TextareaInput,
  TextInput,
  ToggleInput,
} from "../Inputs";
import { SelectInput } from "../Inputs/SelectInput";
import { Column } from "./Column";
import { Row } from "./Row";

export const Form: React.FC<ContainerDataType> = (data) => {
  const { style, children } = data;

  const getFormElement = (element: Component) => {
    let renderElement!: ReactNode;

    switch (element.type) {
      case ContainerType.ROW: {
        renderElement = <Row {...element} />;
        break;
      }
      case ContainerType.COLUMN: {
        renderElement = <Column {...element} />;
        break;
      }
      case InputType.CHECKBOX: {
        renderElement = <CheckBox {...element} />;
        break;
      }
      case InputType.RADIO: {
        renderElement = <RadioButton {...element} />;
        break;
      }
      case InputType.DATE: {
        renderElement = <DateInput {...element} />;
        break;
      }
      case InputType.FILE: {
        renderElement = <FileInput {...element} />;
        break;
      }
      case InputType.NUMBER: {
        renderElement = <NumberInput {...element} />;
        break;
      }
      case InputType.PASSWORD: {
        renderElement = <PasswordInput {...element} />;
        break;
      }
      case InputType.RANGE: {
        renderElement = <RangeInput {...element} />;
        break;
      }
      case InputType.SELECT: {
        renderElement = <SelectInput {...element} />;
        break;
      }
      case InputType.TEXT: {
        renderElement = <TextInput {...element} />;
        break;
      }
      case InputType.TEXTAREA: {
        renderElement = <TextareaInput {...element} />;
        break;
      }
      case InputType.TOGGLE: {
        renderElement = <ToggleInput {...element} />;
        break;
      }
      default: {
        renderElement = null;
      }
    }

    return renderElement;
  };
  const formTitle = (data as ContainerDataType).name;

  return (
    <form
      style={{
        ...style,
        width: 425,
        height: "clamp(400px, 80%, 700px)",
        overflowY: "auto",
      }}
      autoComplete="off"
      className="bg-primary-content rounded-md shadow-xl p-8 prose"
    >
      <h2 className="mb-2 text-center">{formTitle}</h2>
      {children.map((child) => (
        <div key={child.uid} className="w-full">
          {getFormElement(child)}
        </div>
      ))}
    </form>
  );
};
