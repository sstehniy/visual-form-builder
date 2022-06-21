import { BiHeading } from "react-icons/bi";
import {
  BsCalendar2DateFill,
  BsFillFileEarmarkCodeFill,
  BsGripHorizontal,
  BsGripVertical,
  BsSegmentedNav,
  BsTextareaResize,
  BsUiRadios,
} from "react-icons/bs";
import { HiViewList } from "react-icons/hi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoToggleSharp } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { RiLockPasswordFill, RiParagraph, RiText } from "react-icons/ri";
import { TbNumbers } from "react-icons/tb";
import { useBuilderState } from "../state/StateProvider";
import {
  ContainerType,
  InputType,
  StateActionType,
  TextType,
} from "../state/types";

type AddItemsModalProps = { parentUid: string; onClose: () => void };

type AddItem = {
  icon: IconType;
  title: string;
  type: InputType | ContainerType | TextType;
};

type AddItemSection = {
  title: string;
  items: AddItem[];
};

const addItemsSectionsList: AddItemSection[] = [
  {
    title: "Container",
    items: [
      { title: "Row", type: ContainerType.ROW, icon: BsGripHorizontal },
      { title: "Column", type: ContainerType.COLUMN, icon: BsGripVertical },
    ],
  },
  {
    title: "Data Input",
    items: [
      { title: "Text", type: InputType.TEXT, icon: RiText },
      { title: "Number", type: InputType.NUMBER, icon: TbNumbers },
      {
        title: "Checkbox",
        type: InputType.CHECKBOX,
        icon: IoMdCheckboxOutline,
      },
      { title: "Radio", type: InputType.CHECKBOX, icon: BsUiRadios },
      { title: "Date Picker", type: InputType.DATE, icon: BsCalendar2DateFill },
      {
        title: "File Upload",
        type: InputType.FILE,
        icon: BsFillFileEarmarkCodeFill,
      },
      { title: "Password", type: InputType.PASSWORD, icon: RiLockPasswordFill },
      { title: "Range", type: InputType.RANGE, icon: BsSegmentedNav },
      { title: "Select", type: InputType.SELECT, icon: HiViewList },
      { title: "Text Area", type: InputType.TEXTAREA, icon: BsTextareaResize },
      { title: "Toggle", type: InputType.TOGGLE, icon: IoToggleSharp },
    ],
  },
  {
    title: "Texts",
    items: [
      { title: "Heading 3", type: TextType.H3, icon: BiHeading },
      { title: "Heading 4", type: TextType.H4, icon: BiHeading },
      { title: "Heading 5", type: TextType.H5, icon: BiHeading },
      { title: "Paragraph", type: TextType.PARAGRAPH, icon: RiParagraph },
    ],
  },
];

export const AddItemsModal: React.FC<AddItemsModalProps> = ({
  parentUid,
  onClose,
}) => {
  const { dispatch } = useBuilderState();
  const handleAddElement = (element: AddItem) => {
    dispatch({
      type: StateActionType.CREATE_COMPONENT,
      data: { parentUid, type: element.type },
    });
    onClose();
  };

  return (
    <div className="h-64 overflow-y-scroll scrollbar-none mt-2 -mb-4">
      <h3 className="text-primary-content m-0 mb-2 sticky top-0 bg-base-100 z-20">
        Add new item
      </h3>
      {addItemsSectionsList.map((section, idx) => (
        <div key={idx} className="mb-4 w-full">
          <div className="text-sm font-medium x-10 bg-base-100">
            {section.title}
          </div>
          <div className="grid grid-flow-row grid-cols-2 gap-3 mt-1  rounded">
            {section.items.map((val, idx2) => (
              <button
                key={`${idx}_${idx2}`}
                onClick={() => handleAddElement(val)}
                className="flex items-center bg-base-300 gap-2 text-xs font-medium p-2 rounded leading-5 hover:text-base-300 hover:bg-primary-content transition-colors ease duration-100 pointer-events-auto"
              >
                <val.icon className="w-4 h-4 shrink-0" />
                {val.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
