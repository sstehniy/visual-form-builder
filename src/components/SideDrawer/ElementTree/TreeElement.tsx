import { useEffect, useState } from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiDotsVerticalRounded,
  BiEditAlt,
  BiPlus,
  BiTrash,
} from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";

import { Component } from "../../state/types";

type TreeElementProps = {
  depth: number;
  data: Component;
};

export const TreeElement: React.FC<TreeElementProps> = ({ depth, data }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const hasChildren = "children" in data;

  useEffect(() => {
    if (hasChildren) {
      setShowChildren(true);
    } else setShowChildren(false);
  }, [data]);

  return (
    <div tabIndex={depth}>
      <div
        tabIndex={0}
        className={`collapse base-100 ${
          showSettings ? "collapse-open" : "collapse-close"
        } bg-base-100 rounded-none`}
      >
        <div
          className="py-2 px-3 flex flex-nowrap items-center"
          onPointerEnter={() => {
            setShowToolbar(true);
          }}
          onPointerLeave={() => {
            setShowToolbar(false);
          }}
          onMouseEnter={() => {
            setShowToolbar(true);
          }}
          onMouseLeave={() => {
            setShowToolbar(false);
          }}
        >
          <div className="text-sm flex-1" style={{ paddingLeft: depth * 10 }}>
            {data.name}
          </div>
          {showToolbar && (
            <div className="flex gap-2">
              <button className="flex-shrink-0 items-center aspect-square text-lg">
                <BiEditAlt />
              </button>
              <button className="flex-shrink-0 items-center aspect-square text-lg">
                <RiSettings3Line
                  onClick={() => {
                    setShowSettings((prev) => !prev);
                  }}
                />
              </button>
              <button className="flex-shrink-0 items-center aspect-square text-lg">
                <BiTrash />
              </button>
            </div>
          )}
          {hasChildren && (
            <div className="flex gap-2 ml-3">
              <button className=" flex-shrink-0 text-2xl">
                <BiPlus />
              </button>
              <button
                className="flex-shrink-0 text-2xl hover:btn-primary focus:ring-2 focus:ring-primary transition-colors duration-100 ease"
                onClick={() => {
                  setShowChildren((prev) => !prev);
                }}
              >
                {showChildren ? <BiChevronUp /> : <BiChevronDown />}
              </button>
            </div>
          )}
        </div>
        <div className="collapse-content bg-base-100" data-theme="black">
          <p className="pt-3 text-sm">Serttings</p>
        </div>
      </div>
      {!!(showChildren && hasChildren) && (
        <>
          {data.children.map((child) => (
            <TreeElement key={child.uid} data={child} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
};
