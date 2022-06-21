import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillBuild } from "react-icons/ai";
import { Button } from "../components/Button";
import { useBuilderState } from "../state/StateProvider";
import { FORM_STATE, StateActionType } from "../state/types";
import { FormTitleCreate } from "./FormTitleCreate";
import { ElementTree } from "./ElementTree";

export const SideDrawer: React.FC = () => {
  const {
    state: { formState },
    dispatch,
  } = useBuilderState();
  return (
    <div
      className="h-screen sticky top-0 shrink-0 bg-base-200 prose"
      style={{ width: "clamp(300px, 25%, 335px)" }}
    >
      <div className="shadow py-4 flex justify-center gap-2 items-center text-primary">
        <AiFillBuild className="text-4xl" />
        <h2 className="text-center  tracking-wide leading-2 font-medium  text-2xl m-0">
          Form Builder
        </h2>
      </div>
      {/* <button
        className="flex justify-center items-center gap-3 relative w-64 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 h-12 rounded-md text-white shadow-md"
        type="button"
      >
        <span className="text-xl leading-8 font-medium">Create Form</span>
        <span className="inline-block text-2xl">
          <IoMdAddCircleOutline />
        </span>
      </button> */}
      {formState === FORM_STATE.NOT_INITIALIZED && (
        <div className="px-3 mt-5">
          <Button
            size="normal"
            text="Create Form"
            icon={{
              icon: IoMdAddCircleOutline,
              position: "after",
              className: "text-xl",
            }}
            onClick={() =>
              dispatch({
                type: StateActionType.START_INITIALIZE_FORM,
              })
            }
            className="relative btn-block btn-primary focus:ring-primary"
          />
        </div>
      )}
      {formState === FORM_STATE.INITIALIZED && (
        <div className="px-3 mt-5">
          <FormTitleCreate />
        </div>
      )}
      {formState === FORM_STATE.EDIT && (
        <div
          className="w-full bg-transparent"
          style={{ maxHeight: "calc(100% - 70px)", overflow: "auto" }}
        >
          <ElementTree />
        </div>
      )}
    </div>
  );
};
