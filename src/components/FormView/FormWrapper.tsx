import { ContainerDataType } from "../state/types";
import { useBuilderState } from "../state/StateProvider";
import { Form } from "./FormComponents/Containers/Form";

export const FormWrapper = () => {
  const {
    state: { components },
  } = useBuilderState();
  if (!components.length) return null;
  const [form] = components as [ContainerDataType];
  return <Form {...form} />;
};
