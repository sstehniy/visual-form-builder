import { FormWrapper } from "./FormWrapper";

type FormViewProps = any;

export const FormView: React.FC<FormViewProps> = () => {
  return (
    <div className="h-auto flex-1 flex justify-center pt-32 pb-14 min-h-16 shadow-inner bg-base-300">
      <FormWrapper />
    </div>
  );
};
