import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useBuilderState } from "../state/StateProvider";
import { StateActionType } from "../state/types";

export const FormTitleCreate: React.FC = () => {
  const [formTitle, setFormTitle] = useState("");
  const { dispatch } = useBuilderState();
  return (
    <div className="flex w-full gap-3 flex-nowrap">
      <input
        className="input input-md focus:input-primary input-bordered border-2 flex-1"
        placeholder="Enter form title..."
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <button
        className="btn btn-md btn-primary btn-square text-lg"
        onClick={() => {
          if (formTitle.trim().length)
            dispatch({
              type: StateActionType.FINISH_INITIALIZE_FORM,
              data: formTitle.trim(),
            });
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};
