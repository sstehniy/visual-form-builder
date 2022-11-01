import { Component } from "../../state/types";

type EditAttributesModalProps = { element: Component; onClose: () => void };

export const EditAttributesModal: React.FC<EditAttributesModalProps> = ({
  element,
  onClose,
}) => {
  return <div>Edit</div>;
};
