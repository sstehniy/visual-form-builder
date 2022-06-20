import { Component } from "../state/types";

type EditModalProps = { element: Component; onClose: () => void };

export const EditModal: React.FC<EditModalProps> = ({ element, onClose }) => {
  return <div>Edit</div>;
};
