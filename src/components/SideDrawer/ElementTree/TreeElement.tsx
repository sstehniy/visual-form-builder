import { useEffect, useRef, useState } from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiEditAlt,
  BiPlus,
  BiTrash,
} from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";

import { Component } from "../../state/types";
import { AddItemsModal } from "../AddItemsModal";
import { EditModal } from "../EditModal";

type TreeElementProps = {
  depth: number;
  data: Component;
};

enum ActiveContent {
  EDIT_ELEMENT,
  ADD_CHILD_ELEMENT,
}

export const TreeElement: React.FC<TreeElementProps> = ({ depth, data }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [toolbarHovered, setToolbarHovered] = useState(false);
  const [activeContent, setActiveContent] = useState<ActiveContent | null>(
    null
  );
  const [showEditTitle, setShowEditTitle] = useState(false);
  const hasChildren = "children" in data;
  const switchTimeoutRef = useRef<number>();

  const showToolbar =
    toolbarHovered || !!switchTimeoutRef.current || activeContent !== null;

  useEffect(() => {
    if (hasChildren) {
      setShowChildren(true);
    } else setShowChildren(false);
  }, [data]);

  return (
    <li tabIndex={depth} className="p-0 m-0">
      <div
        tabIndex={0}
        className={`relative collapse base-100 ${
          activeContent !== null ? "collapse-open" : "collapse-close"
        } bg-base-100 rounded-none`}
      >
        <div
          className="py-0 px-2 flex flex-nowrap items-center h-9"
          style={{ paddingLeft: depth * 8 + 8 }}
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
          <div className="text-xs flex-1">{data.name}</div>
          {showToolbar && (
            <>
              <div className="flex gap-0.5 h-full">
                <button className="flex-shrink-0 h-full items-center text-lg p-1.5">
                  <BiEditAlt />
                </button>
                <button
                  className={`flex-shrink-0 h-full items-center text-lg p-1.5 ${
                    activeContent === ActiveContent.EDIT_ELEMENT
                      ? "bg-primary text-primary-content"
                      : ""
                  }`}
                >
                  <RiSettings3Line
                    onClick={() => {
                      clearTimeout(switchTimeoutRef.current);
                      switchTimeoutRef.current = 0;
                      if (activeContent === ActiveContent.EDIT_ELEMENT) {
                        setActiveContent(null);
                      } else if (activeContent !== null) {
                        setActiveContent(null);
                        switchTimeoutRef.current = setTimeout(() => {
                          clearTimeout(switchTimeoutRef.current);
                          switchTimeoutRef.current = 0;
                          setActiveContent(ActiveContent.EDIT_ELEMENT);
                        }, 275);
                      } else setActiveContent(ActiveContent.EDIT_ELEMENT);
                    }}
                  />
                </button>
                <button className="flex-shrink-0 h-full items-center text-lg p-1.5">
                  <BiTrash />
                </button>
              </div>
              {hasChildren && (
                <div className="flex flex-shrink-0 gap-1 ml-2 items-center h-full ">
                  <button
                    className={`flex-shrink-0 h-full items-center text-xl p-1.5 ${
                      activeContent === ActiveContent.ADD_CHILD_ELEMENT
                        ? "bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() => {
                      clearTimeout(switchTimeoutRef.current);
                      switchTimeoutRef.current = 0;
                      if (activeContent === ActiveContent.ADD_CHILD_ELEMENT) {
                        setActiveContent(null);
                      } else if (activeContent !== null) {
                        setActiveContent(null);
                        switchTimeoutRef.current = setTimeout(() => {
                          clearTimeout(switchTimeoutRef.current);
                          switchTimeoutRef.current = 0;
                          setActiveContent(ActiveContent.ADD_CHILD_ELEMENT);
                        }, 275);
                      } else setActiveContent(ActiveContent.ADD_CHILD_ELEMENT);
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
          className={`w-full collapse-content bg-base-100 overflow-y-scroll ${
            activeContent !== null ? "pt-4 pb-0" : ""
          }`}
          style={{ zIndex: 10000 }}
          data-theme="black"
        >
          {activeContent === ActiveContent.EDIT_ELEMENT && (
            <EditModal element={data} onClose={() => setActiveContent(null)} />
          )}
          {activeContent === ActiveContent.ADD_CHILD_ELEMENT && (
            <AddItemsModal
              parentUid={data.uid}
              onClose={() => setActiveContent(null)}
            />
          )}
        </div>
      </div>
      {!!(showChildren && hasChildren) && (
        <ol className="relative list-none m-0 p-0">
          {data.children.map((child) => (
            <TreeElement key={child.uid} data={child} depth={depth + 1} />
          ))}
        </ol>
      )}
    </li>
  );
};
