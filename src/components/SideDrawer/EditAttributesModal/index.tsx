import { useCallback } from "react";
import {
  AttributeInputType,
  StateComponentAttribute,
} from "../../../constants";

import { useBuilderState } from "../../state/StateProvider";
import { Component, StateActionType } from "../../state/types";
import { DefineValues } from "./DefineValues";

type EditAttributesModalProps = { element: Component; onClose: () => void };

const { BOOLEAN, DEFINE_VALUES, NUMBER, PERCENT, SELECT_OPTION, TEXT } =
  AttributeInputType;

export const EditAttributesModal: React.FC<EditAttributesModalProps> = ({
  element,
  onClose,
}) => {
  const { dispatch } = useBuilderState();

  const handleChangeAttribute = useCallback(
    (
      element: Component,
      attribute: StateComponentAttribute,
      value: StateComponentAttribute["value"]
    ) => {
      dispatch({
        type: StateActionType.EDIT_COMPONENT_ATTRIBUTE,
        data: {
          element,
          attribute,
          value,
        },
      });
    },
    [dispatch]
  );

  const getAttributeEditComponent = (
    attribute: StateComponentAttribute
  ): React.ReactNode => {
    switch (attribute.type) {
      case TEXT: {
        return (
          <div className="form-control w-full max-w-xs" key={attribute.uid}>
            <label className="label  mb-0 pb-1 px-0.5">
              <span className="label-text  text-xs">{attribute.title}</span>
            </label>
            <input
              type="text"
              value={
                typeof attribute.value === "string"
                  ? attribute.value
                  : attribute.title || ""
              }
              onChange={(e) =>
                handleChangeAttribute(element, attribute, e.target.value)
              }
              placeholder={`Edit ${attribute.title.toLowerCase()}`}
              className="input input-bordered w-full max-w-xs input-sm rounded-sm"
            />
          </div>
        );
      }
      case BOOLEAN: {
        return (
          <div className="form-control w-full max-w-xs col-span-2">
            <label className="label  mb-0 pb-1">
              <span className="label-text  text-sm">{attribute.title}</span>
              <input
                type="checkbox"
                checked={
                  typeof attribute.value === "boolean" ? attribute.value : false
                }
                className="checkbox checkbox-sm bg-gray-900"
                onChange={(e) =>
                  handleChangeAttribute(element, attribute, e.target.value)
                }
                placeholder={`Edit ${attribute.title.toLowerCase()}`}
              />
              {/* <span className="label-text-alt">Alt label</span> */}
            </label>
          </div>
        );
      }
      case NUMBER: {
        return (
          <div className="form-control w-full max-w-xs" key={attribute.uid}>
            <label className="label  mb-0 pb-1 px-0.5">
              <span className="label-text  text-xs">{attribute.title}</span>
              {/* <span className="label-text-alt">Alt label</span> */}
            </label>
            <input
              type="number"
              min={0}
              value={
                typeof attribute.value === "string" ||
                typeof attribute.value === "number"
                  ? attribute.value
                  : attribute.title || ""
              }
              onChange={(e) =>
                handleChangeAttribute(element, attribute, e.target.value)
              }
              placeholder={`Edit ${attribute.title.toLowerCase()}`}
              className="input input-bordered w-full max-w-xs input-sm rounded-sm"
            />
          </div>
        );
      }
      case PERCENT: {
        return (
          <div className="form-control w-full max-w-xs" key={attribute.uid}>
            <label className="label  mb-0 pb-1 px-0.5">
              <span className="label-text  text-xs">{attribute.title}</span>
              {/* <span className="label-text-alt">Alt label</span> */}
            </label>
            <label className="input-group">
              <input
                type="number"
                step={1}
                min={0}
                max={100}
                value={
                  typeof attribute.value === "string" ||
                  typeof attribute.value === "number"
                    ? attribute.value
                    : attribute.title || ""
                }
                onChange={(e) =>
                  handleChangeAttribute(element, attribute, e.target.value)
                }
                placeholder={`Edit ${attribute.title.toLowerCase()}`}
                className="input input-bordered w-full max-w-xs input-sm rounded-sm"
              />
              <span>%</span>
            </label>
          </div>
        );
      }
      case SELECT_OPTION: {
        const options = attribute.options || [];
        return (
          <div className="form-control w-full max-w-xs" key={attribute.uid}>
            <label className="label">
              <span className="label-text">{attribute.title}</span>
            </label>
            <select
              className="select select-bordered"
              onChange={(e) =>
                handleChangeAttribute(element, attribute, e.target.value)
              }
            >
              {options.map((opt) => (
                <option
                  key={`${attribute.uid}-${opt.value}`}
                  value={typeof opt.value === "string" ? opt.value : ""}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      }
      case DEFINE_VALUES: {
        return (
          <DefineValues
            onNewOption={(newOption) => {
              console.log(newOption);
            }}
            onOptionChange={(changedOption) => {
              console.log(changedOption);
            }}
            onOptionDelete={(deletedOption) => {
              console.log(deletedOption);
            }}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-scroll scrollbar-none mt-2">
      <h3 className="text-primary-content m-0 mb-1 sticky top-0 bg-base-100 z-20">
        Edit
      </h3>
      <div className="grid grid-flow-row grid-cols-2 gap-3">
        {element.attributes.map((attr) => getAttributeEditComponent(attr))}
      </div>
    </div>
  );
};
