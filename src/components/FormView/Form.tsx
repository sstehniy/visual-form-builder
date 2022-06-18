import { ElementSize } from "../state/types";
import {
  TextInput,
  NumberInput,
  PasswordInput,
  CheckBox,
  RadioButton,
  DateInput,
  RangeInput,
  TextareaInput,
  FileInput,
} from "./FormComponents/Inputs";
import { CgDollar, MdAllInbox } from "react-icons/all";
import { SelectInput } from "./FormComponents/Inputs/SelectInput";

export const Form = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8" style={{ width: 425 }}>
      <TextInput
        additionalAttrs={{ placeholder: "test" }}
        label="Test input"
        name="test_input"
        size={ElementSize.NORMAL}
        tooltip="Test input"
        validation={[]}
        parent={null}
        icon={{ icon: MdAllInbox, position: "after" }}
      />
      <NumberInput
        additionalAttrs={{ placeholder: "test" }}
        label="Test input"
        name="test_input"
        size={ElementSize.NORMAL}
        wrapperStyle={{ width: "100%" }}
        tooltip="Test input"
        validation={[]}
        parent={null}
        icon={{ icon: CgDollar, position: "after" }}
      />
      <PasswordInput
        additionalAttrs={{ placeholder: "test" }}
        label="Test input"
        name="test_input"
        size={ElementSize.NORMAL}
        wrapperStyle={{ width: "100%" }}
        tooltip="Test password"
        parent={null}
        validation={[]}
      />
      <CheckBox
        label="Checkbox"
        name="checkdata"
        parent={null}
        tooltip={"Checkbox"}
        direction="vertical"
        validation={[]}
        data={[
          { label: "Value 1", value: "val1" },
          { label: "Value 2", value: "val2" },
          { label: "Value 3", value: "val3" },
        ]}
      />
      <RadioButton
        label="Radio"
        name="radio"
        parent={null}
        direction="horizontal"
        tooltip={"Checkbox"}
        validation={[]}
        data={[
          { label: "Value 1", value: "val1" },
          { label: "Value 2", value: "val2" },
          { label: "Value 3", value: "val3" },
        ]}
      />
      <DateInput
        label="Test Date"
        name="date_input"
        parent={null}
        size={ElementSize.NORMAL}
        validation={[]}
      />
      <RangeInput
        label="Test Range"
        name="date_input"
        parent={null}
        validation={[]}
      />
      <SelectInput
        label="Checkbox"
        name="checkdata"
        parent={null}
        tooltip={"Checkbox"}
        validation={[]}
        data={[
          { label: "Value 1", value: "val1" },
          { label: "Value 2", value: "val2" },
          { label: "Value 3", value: "val3" },
        ]}
      />
      <TextareaInput
        label="Checkbox"
        name="checkdata"
        parent={null}
        tooltip={"Checkbox"}
        validation={[]}
      />
      <FileInput
        additionalAttrs={{ placeholder: "test" }}
        label="Test input"
        name="test_input"
        size={ElementSize.NORMAL}
        wrapperStyle={{ width: "100%" }}
        tooltip="Test password"
        parent={null}
        validation={[]}
      />
    </div>
  );
};
