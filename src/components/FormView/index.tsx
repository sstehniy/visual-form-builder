import { FormWrapper } from "./FormWrapper";

type FormViewProps = any;

export const FormView: React.FC<FormViewProps> = () => {
  return (
    <div className="h-auto flex-1 p-7 flex justify-center py-20 shadow-inner bg-base-300">
      <FormWrapper />
    </div>
  );
};
