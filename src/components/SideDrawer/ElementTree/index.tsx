import { useBuilderState } from "../../state/StateProvider";
import { ContainerDataType, ContainerType } from "../../state/types";
import { TreeElement } from "./TreeElement";

export const ElementTree: React.FC = () => {
  const {
    state: { components },
  } = useBuilderState();
  if (!components.length) return null;
  const [rootElement] = components as [ContainerDataType];
  if (rootElement.type !== ContainerType.FORM) {
    console.warn("Only form allowed as Root element");
    return null;
  }

  return (
    <ol className="list-none m-0 p-0">
      <TreeElement data={rootElement} depth={0} />
    </ol>
  );
};
