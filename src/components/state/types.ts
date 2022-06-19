import { CSSProperties } from "react";
import { IconType } from "react-icons";

export enum FORM_STATE {
  NOT_INITIALIZED,
  INITIALIZED,
  EDIT,
}

export type State = {
  components: Component[];
  actionsLog: ActionLog[];
  formState: FORM_STATE;
};

export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DATE = "date",
  RANGE = "range",
  FILE = "file",
  TEXTAREA = "textarea",
  SELECT = "select",
  TOGGLE = "toggle",
}

export enum ContainerType {
  ROW = "row",
  COLUMN = "column",
  FORM = "form",
}

export enum TextType {
  PARAGRAPH,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}

export type InputAttribute = Record<string, string | number | boolean>;

export type InputIconData = {
  icon: IconType;
  position: "before" | "after";
};

export type ValidationRules = {
  key: string;
  value: boolean | number | RegExp | string;
  errorText: string;
};

export enum ElementSize {
  SMALL,
  NORMAL,
  LARGE,
}

export type ComplexValue = { value: string | number | null; label: string };

export type InputDataType = {
  uid: string;
  inputType: InputType;
  name: string;
  label: string;
  additionalAttrs?: InputAttribute;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
  data?: ComplexValue[];
  icon?: InputIconData;
  size: ElementSize;
  validation: ValidationRules[] | null;
  tooltip?: string;
  parent: ContainerDataType | null;
};

export type InputProps = Omit<InputDataType, "uid" | "inputType">;

export type TextDataType = {
  uid: string;
  textType: TextType;
  style: CSSProperties | null;
};

export type ContainerDataType = {
  uid: string;
  containerType: ContainerType;
  children: Component[];
  style: CSSProperties | null;
  name?: string;
};

export type Component = InputDataType | ContainerDataType | TextDataType;

export type ActionLog = {
  actionType: StateActionType;
  oldValue: any;
  newValue: any;
};

export enum StateActionType {
  CREATE_COMPONENT,
  REMOVE_COMPONENT,
  REORDER_COMPONENT,
  EDIT_COMPONENT,
  SELECT_COMPONENT,
  UNDO_CHANGE,
  START_INITIALIZE_FORM,
  FINISH_INITIALIZE_FORM,
  RESET_FORM,
}

export type StateAction =
  | {
      type: StateActionType.CREATE_COMPONENT;
      data: {
        type: InputType | ContainerType | TextType;
      };
    }
  | {
      type: StateActionType.REMOVE_COMPONENT | StateActionType.SELECT_COMPONENT;
      data: {
        uid: string;
      };
    }
  | {
      type: StateActionType.REORDER_COMPONENT;
      data: { components: Component[] };
    }
  | {
      type: StateActionType.EDIT_COMPONENT;
      data: {
        component: Component;
      };
    }
  | {
      type:
        | StateActionType.UNDO_CHANGE
        | StateActionType.START_INITIALIZE_FORM
        | StateActionType.FINISH_INITIALIZE_FORM
        | StateActionType.RESET_FORM;
    };
