import { MdAllInbox } from "react-icons/md";
import { v4 } from "uuid";
import {
  ContainerDataType,
  ContainerType,
  ElementSize,
  FORM_STATE,
  InputType,
  State,
  StateAction,
  StateActionType,
} from "./types";

export const stateReducer = (state: State, action: StateAction): State => {
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
        children: [
          {
            type: InputType.TEXT,
            label: "Test text",
            name: "TextInput 1",
            parentUid: formUid,
            size: ElementSize.NORMAL,
            uid: v4(),
            validation: [],
            icon: { icon: MdAllInbox, position: "after" },
            tooltip: "Test tooltip",
          },
        ],
      };
      state.components = [form];
      state.formState = FORM_STATE.EDIT;
      break;
    }

    default:
      break;
  }
  return state;
};
