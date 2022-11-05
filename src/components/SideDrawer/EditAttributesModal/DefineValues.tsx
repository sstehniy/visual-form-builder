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
  return <div></div>;
};
