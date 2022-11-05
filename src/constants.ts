import {
  ElementSize,
  InputIconData,
  InputType,
} from "./components/state/types";

export enum AttributeInputType {
  DEFINE_VALUES,
  SELECT_OPTION,
  TEXT,
  NUMBER,
  PERCENT,
  BOOLEAN,
}

type ComponentAttributeBase = {
  type: AttributeInputType;
  title: string;
  decorationIcon: InputIconData | null;
  sourcePropsKey: string;
};

export type KeyValue = {
  label: string;
  value: string | number | boolean;
};

export type DefineValuesComponentAttribute = ComponentAttributeBase & {
  values: KeyValue[];
};
export type SelectOptionComponentAttribute = ComponentAttributeBase & {
  predefinedValues: KeyValue[];
  selectedValues: KeyValue[];
  multiSelectAllowed: boolean;
};

export type ComponentAttribute = {
  type: AttributeInputType;
  title: string;
  decorationIcon: InputIconData | null;
  value:
    | KeyValue[]
    | number[]
    | string[]
    | KeyValue
    | number
    | string
    | boolean;
  options?: KeyValue[];
  sourcePropsKey: string;
};

export type StateComponentAttribute = ComponentAttribute & { uid: string };

export const attributesByType: Record<string, ComponentAttribute[]> = {
  [InputType.CHECKBOX]: [
    {
      type: AttributeInputType.DEFINE_VALUES,
      decorationIcon: null,
      value: [{ label: "Example Checkbox", value: "example-1" }],
      sourcePropsKey: "data",
      title: "Options",
    },
  ],
  [InputType.RADIO]: [
    {
      type: AttributeInputType.DEFINE_VALUES,
      decorationIcon: null,
      value: [{ label: "Example Radio", value: "example-1" }],
      sourcePropsKey: "data",
      title: "Options",
    },
  ],
  [InputType.TOGGLE]: [
    {
      type: AttributeInputType.TEXT,
      decorationIcon: null,
      value: "Default Label",
      sourcePropsKey: "label",
      title: "Label",
    },
    {
      type: AttributeInputType.BOOLEAN,
      decorationIcon: null,
      value: false,
      sourcePropsKey: "checked",
      title: "Default Checked",
    },
  ],
  [InputType.TEXT]: [
    {
      type: AttributeInputType.TEXT,
      decorationIcon: null,
      value: "Text input",
      sourcePropsKey: "label",
      title: "Label",
    },
    {
      type: AttributeInputType.TEXT,
      decorationIcon: null,
      value: "Default Input Placeholder",
      sourcePropsKey: "placeholder",
      title: "Placeholder",
    },
    {
      type: AttributeInputType.SELECT_OPTION,
      decorationIcon: null,
      value: ElementSize.NORMAL,
      options: [
        { label: "Small", value: ElementSize.SMALL },
        { label: "Normal", value: ElementSize.NORMAL },
        { label: "Large", value: ElementSize.LARGE },
      ],
      sourcePropsKey: "size",
      title: "Input Size",
    },
  ],
  [InputType.TEXTAREA]: [
    {
      type: AttributeInputType.PERCENT,
      decorationIcon: null,
      value: 100,
      sourcePropsKey: "width",
      title: "Width (%)",
    },
    {
      type: AttributeInputType.NUMBER,
      decorationIcon: null,
      value: 20,
      sourcePropsKey: "rows",
      title: "Rows",
    },
  ],
  [InputType.SELECT]: [
    {
      type: AttributeInputType.SELECT_OPTION,
      decorationIcon: null,
      value: ElementSize.NORMAL,
      options: [
        { label: "Small", value: ElementSize.SMALL },
        { label: "Normal", value: ElementSize.NORMAL },
        { label: "Large", value: ElementSize.LARGE },
      ],
      sourcePropsKey: "size",
      title: "Input Size",
    },
    {
      type: AttributeInputType.DEFINE_VALUES,
      decorationIcon: null,
      value: [],
      sourcePropsKey: "options",
      title: "Options",
    },
  ],
};
