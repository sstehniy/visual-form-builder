import { ElementSize } from "../state/types";
import { TextInput } from "./FormComponents/Inputs/TextInput";
import { MdAllInbox } from "react-icons/all";

export const Form = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <TextInput
        additionalAttrs={{ placeholder: "test" }}
        label="Test input"
        name="test_input"
        size={ElementSize.LARGE}
        style={{ width: 300 }}
        tooltip="Test input"
        validation={[]}
        icon={{ icon: MdAllInbox, position: "after" }}
      />
    </div>
  );
};
