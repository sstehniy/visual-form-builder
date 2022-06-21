import { flat } from "../../../util/flat";
import { useBuilderState } from "../../state/StateProvider";
import { ContainerDataType, ContainerType } from "../../state/types";
import { TreeContextProvider } from "./TreeContextProvider";
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

  console.log(flat(components, "children"));

  return (
    <TreeContextProvider>
      <ol className="list-none m-0 p-0">
        <TreeElement data={rootElement} depth={0} />
      </ol>
    </TreeContextProvider>
  );
};
