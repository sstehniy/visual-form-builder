import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillBuild } from "react-icons/ai";
import { Button } from "../components/Button";

export const SideDrawer: React.FC = () => {
  return (
    <div
      className="h-full bg-slate-100"
      style={{ width: "clamp(300px, 25%, 335px)" }}
    >
      <div className="shadow-md py-4 mb-5 flex gap-2 items-center pl-9 text-zinc-700">
        <AiFillBuild className="text-4xl" />
        <h2 className="text-center  tracking-wide leading-2 font-medium  text-2xl">
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
      <Button
        onClick={() => {
          console.log("clicked");
        }}
        size="normal"
        text="Create Form"
        icon={{
          icon: IoMdAddCircleOutline,
          position: "after",
          className: "text-xl",
        }}
        className="relative w-52 mx-auto bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-800"
      />
      <div
        className="mt-3 w-100"
        style={{ maxHeight: "calc(100% - 138px)", overflow: "auto" }}
      >
        <ul className="py-4"></ul>
      </div>
    </div>
  );
};
