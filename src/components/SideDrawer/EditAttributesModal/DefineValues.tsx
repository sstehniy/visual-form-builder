import { useState } from "react";
import { KeyValue } from "../../../constants";

type DefineValuesProps = {
  onNewOption: (option: KeyValue) => void;
  onOptionDelete: (option: KeyValue) => void;
  onOptionChange: (option: KeyValue) => void;
};

export const DefineValues: React.FC<DefineValuesProps> = ({
  onNewOption,
  onOptionChange,
  onOptionDelete,
}) => {
  return <div className="form-control w-full max-w-xs col-span-2"></div>;
};

const DefineValueRow: React.FC<{
  keyValue: KeyValue;
  onEdit: (keyValue: KeyValue) => void;
}> = ({ keyValue, onEdit }) => {
  const [key, setKey] = useState(keyValue.label);
  const [value, setValue] = useState(keyValue.value);

  return <div></div>;
};
