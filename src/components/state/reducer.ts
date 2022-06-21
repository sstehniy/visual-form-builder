/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cloneDeep } from "lodash";
import { MdAllInbox } from "react-icons/md";
import { v4 } from "uuid";
import { flat } from "../../util/flat";
import {
  ContainerDataType,
  ContainerType,
  ElementSize,
  FORM_STATE,
  InputType,
  State,
  StateAction,
  StateActionType,
  Component,
  InputDataType,
  TextDataType,
  TextType,
} from "./types";

const mapTypeToName = {
  [InputType.CHECKBOX]: "Checkbox Group",
  [InputType.DATE]: "Datepicker",
  [InputType.FILE]: "Filepicker",
  [InputType.NUMBER]: "Number Input",
  [InputType.PASSWORD]: "Password Input",
  [InputType.RADIO]: "Radio Group",
  [InputType.RANGE]: "Range Slider",
  [InputType.SELECT]: "Select",
  [InputType.TEXT]: "Text Input",
  [InputType.TEXTAREA]: "Textarea",
  [InputType.TOGGLE]: "Switch Toggle",
  [ContainerType.COLUMN]: "Column",
  [ContainerType.ROW]: "Row",
  [ContainerType.FORM]: "Form",
  [TextType.H3]: "Heading-3",
  [TextType.H4]: "Heading-4",
  [TextType.H5]: "Heading-5",
  [TextType.PARAGRAPH]: "Paragraph",
};

const getDefaultName = (
  flatElements: Component[],
  elementType: InputType | ContainerType | TextType
) => {
  console.log(flatElements);
  const countOfSameType =
    flatElements.reduce((acc, curr) => {
      if (curr.type === elementType) {
        return acc + 1;
      }
      return acc;
    }, 0) + 1;

  return mapTypeToName[elementType] + " " + countOfSameType;
};

export const stateReducer = (state: State, action: StateAction): State => {
  const flattenedElements = flat(state.components, "children");

  switch (action.type) {
    case StateActionType.START_INITIALIZE_FORM:
      state.formState = FORM_STATE.INITIALIZED;
      break;
    case StateActionType.FINISH_INITIALIZE_FORM: {
      const formTitle = action.data;
      const formUid = v4();
      const form: ContainerDataType = {
        name: formTitle,
        type: ContainerType.FORM,
        parentUid: null,
        uid: formUid,
        style: {},
        children: [],
      };
      state.components = [form];
      state.formState = FORM_STATE.EDIT;
      break;
    }
    case StateActionType.CREATE_COMPONENT: {
      const { type, parentUid } = action.data;

      const parent = flattenedElements.find(
        (el) => el.uid === parentUid
      ) as ContainerDataType;
      const name = getDefaultName(cloneDeep(flattenedElements), type);
      let element!: Component;
      const uid = v4();

      switch (type) {
        case InputType.DATE:
        case InputType.NUMBER:
        case InputType.FILE:
        case InputType.PASSWORD:
        case InputType.RANGE:
        case InputType.TEXTAREA:
        case InputType.TOGGLE:
        case InputType.TEXT: {
          element = {
            label: mapTypeToName[type],
            parentUid,
            type,
            size: ElementSize.NORMAL,
            uid,
            validation: null,
            additionalAttrs: {},
            name,
            data: [],
            icon: null,
            style: {},
            tooltip: "",
            wrapperStyle: {},
          } as InputDataType;
          break;
        }
        case InputType.RADIO:
        case InputType.SELECT:
        case InputType.CHECKBOX: {
          element = {
            label: "Text Input",
            parentUid,
            type,
            size: ElementSize.NORMAL,
            uid,
            validation: null,
            additionalAttrs: {},
            name,
            data: [],
            icon: null,
            style: {},
            tooltip: "",
            wrapperStyle: {},
          } as InputDataType;
          break;
        }
        case ContainerType.COLUMN:
        case ContainerType.ROW: {
          element = {
            name,
            children: [],
            parentUid,
            style: {},
            type,
            uid,
          } as ContainerDataType;
          break;
        }
        case TextType.H3:
        case TextType.H4:
        case TextType.H5:
        case TextType.PARAGRAPH: {
          element = {
            name,
            parentUid,
            style: {},
            type,
            uid,
          } as TextDataType;
          break;
        }
      }

      parent.children.push(element);
      break;
    }
    case StateActionType.EDIT_COMPONENT: {
      const object = action.data.changes;
      const element = flattenedElements.find(
        (el) => el.uid === action.data.uid
      );
      if (element) {
        Object.keys(object).forEach((key: string) => {
          const value = object[key as keyof object];
          if (
            key in element &&
            // @ts-ignore
            typeof element[key as keyof element] === typeof value
          ) {
            // @ts-ignore
            element[key as keyof element] = value;
          }
        });
      }
      break;
    }
    case StateActionType.REMOVE_COMPONENT: {
      const { uid } = action.data;
      const parentUid = flattenedElements.find(
        (el) => el.uid === uid
      )?.parentUid;
      if (!parentUid) break;
      const parent = flattenedElements.find(
        (el) => el.uid === parentUid
      ) as ContainerDataType;
      if (!parent) break;
      if (state.selectedElement && state.selectedElement.uid === uid) {
        state.selectedElement = null;
      }
      parent.children = parent.children.filter((child) => child.uid !== uid);
      break;
    }
    case StateActionType.SELECT_COMPONENT: {
      const { uid } = action.data;
      const element = flattenedElements.find((el) => el.uid === uid);
      if (element) {
        state.selectedElement = element;
      }
      break;
    }
    default:
      break;
  }
  return state;
};
