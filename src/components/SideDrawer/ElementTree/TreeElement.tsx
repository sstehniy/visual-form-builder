import { useEffect, useRef, useState } from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiDotsVertical,
  BiEditAlt,
  BiPlus,
  BiTrash,
} from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useBuilderState } from "../../state/StateProvider";
import { Component, ContainerType, StateActionType } from "../../state/types";
import { AddItemsModal } from "../AddItemsModal";
import { EditModal } from "../EditModal";
import { ActiveContent, useTreeContext } from "./TreeContextProvider";

type TreeElementProps = {
  depth: number;
  data: Component;
};

export const TreeElement: React.FC<TreeElementProps> = ({ depth, data }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [toolbarHovered, setToolbarHovered] = useState(false);
  const hasChildren = "children" in data;
  const {
    activeContent,
    editLabel,
    handleCancelEditLabel,
    handleConfirmEditLabel,
    handleEditLabel,
    handleSetActiveContent,
    handleShowEditLabel,
    transitionData,
  } = useTreeContext();
  const showEditLabel = editLabel && editLabel.uid === data.uid;
  const editLabelRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useBuilderState();

  const showToolbar =
    showEditLabel ||
    toolbarHovered ||
    (transitionData.timeout && transitionData.uid === data.uid) ||
    (activeContent !== null && activeContent.uid === data.uid);

  useEffect(() => {
    if (hasChildren) {
      setShowChildren(true);
    } else setShowChildren(false);
  }, [data, hasChildren]);

  const fontWeight =
    data.type === ContainerType.FORM
      ? "font-bold"
      : data.type === ContainerType.ROW || data.type === ContainerType.COLUMN
      ? "font-medium"
      : "font-normal";

  useEffect(() => {
    if (!editLabelRef.current || !showEditLabel) return;
    editLabelRef.current.focus();
  }, [showEditLabel]);

  return (
    <li tabIndex={depth} className="p-0 m-0">
      <div
        tabIndex={0}
        className={`relative collapse group base-100 ${
          activeContent?.uid === data.uid ? "collapse-open" : "collapse-close"
        } bg-base-100 rounded-none border-b-2`}
      >
        <div
          className="py-0 pl-2 flex flex-nowrap items-center h-9 "
          onPointerEnter={() => {
            setToolbarHovered(true);
          }}
          onPointerLeave={() => {
            setToolbarHovered(false);
          }}
          onMouseEnter={() => {
            setToolbarHovered(true);
          }}
          onMouseLeave={() => {
            setToolbarHovered(false);
          }}
        >
          <div className="text-xs flex-1 cursor-pointer h-full flex items-center">
            {showEditLabel ? (
              <div
                className="relative flex-1 ml-0.5 mr-3"
                style={{ maxWidth: 185 }}
              >
                <input
                  className="input input-xs input-primary  w-full focus:outline-offset-1"
                  ref={editLabelRef}
                  value={editLabel.value}
                  onChange={(e) => {
                    handleEditLabel(e.target.value);
                  }}
                />
                <div className="absolute h-full top-0 right-0 flex text-sm py-0.5 pr-0.5">
                  <button
                    className=" aspect-square grid place-items-center text-primary hover:bg-red-500 hover:text-base-100 rounded-sm transition-colors duration-75 ease"
                    onClick={handleCancelEditLabel}
                  >
                    <FaTimes />
                  </button>
                  <button
                    className="aspect-square grid place-items-center text-primary hover:bg-green-500 hover:text-base-100 rounded-sm transition-colors duration-75 ease"
                    onClick={handleConfirmEditLabel}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
            ) : (
              <span
                style={{ paddingLeft: depth * 8 + 8 }}
                className={fontWeight + " flex-1"}
                onDoubleClick={() => {
                  handleShowEditLabel({ uid: data.uid, value: data.name });
                }}
              >
                {data.name}
              </span>
            )}
          </div>
          {showToolbar && (
            <>
              <div className="flex h-full">
                <button
                  className={`flex-shrink-0 h-full items-center text-lg px-1.5 ${
                    activeContent?.type === ActiveContent.EDIT_ELEMENT &&
                    activeContent.uid === data.uid
                      ? "bg-primary text-primary-content"
                      : ""
                  }`}
                  onClick={() => {
                    handleSetActiveContent({
                      type: ActiveContent.EDIT_ELEMENT,
                      uid: data.uid,
                    });
                  }}
                >
                  <BiDotsVertical />
                </button>
                <button
                  className="flex-shrink-0 h-full items-center text-lg p-1.5"
                  onClick={() =>
                    dispatch({
                      type: StateActionType.REMOVE_COMPONENT,
                      data: { uid: data.uid },
                    })
                  }
                >
                  <BiTrash />
                </button>
              </div>
              {hasChildren && (
                <div className="flex flex-shrink-0 gap-1 mx-1 items-center h-full ">
                  <button
                    className={`flex-shrink-0 h-full items-center text-xl p-1.5 ${
                      activeContent?.type === ActiveContent.ADD_CHILD_ELEMENT &&
                      activeContent.uid === data.uid
                        ? "bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() => {
                      handleSetActiveContent({
                        type: ActiveContent.ADD_CHILD_ELEMENT,
                        uid: data.uid,
                      });
                    }}
                  >
                    <BiPlus />
                  </button>
                  <button
                    className="text-2xl h-full w-6"
                    onClick={() => {
                      setShowChildren((prev) => !prev);
                    }}
                  >
                    {showChildren ? <BiChevronUp /> : <BiChevronDown />}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div
          className={`w-full collapse-content bg-base-100 overflow-y-scroll`}
          style={{ zIndex: 10000 }}
          data-theme="black"
        >
          {!!(
            activeContent?.uid === data.uid &&
            activeContent.type === ActiveContent.EDIT_ELEMENT
          ) && (
            <EditModal
              element={data}
              onClose={() =>
                handleSetActiveContent({
                  type: ActiveContent.EDIT_ELEMENT,
                  uid: data.uid,
                })
              }
            />
          )}
          {!!(
            activeContent?.uid === data.uid &&
            activeContent.type === ActiveContent.ADD_CHILD_ELEMENT
          ) && (
            <AddItemsModal
              parentUid={data.uid}
              onClose={() =>
                handleSetActiveContent({
                  type: ActiveContent.ADD_CHILD_ELEMENT,
                  uid: data.uid,
                })
              }
            />
          )}
        </div>
      </div>
      {!!(showChildren && hasChildren) && (
        <ol className="relative list-none m-0 p-0 shadow-inner">
          {data.children.map((child) => (
            <TreeElement key={child.uid} data={child} depth={depth + 1} />
          ))}
        </ol>
      )}
    </li>
  );
};
