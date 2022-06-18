import { Form } from "./Form";

type FormViewProps = any;

export const FormView: React.FC<FormViewProps> = () => {
  return (
    <div
      className="h-auto flex-1 p-7 flex justify-center py-20 shadow-inner"
      style={{
        backgroundColor: "#CDDCDC",
        backgroundImage:
          "radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)",
        backgroundBlendMode: "screen, overlay",
      }}
    >
      <Form />
    </div>
  );
};
