import { createContext, PropsWithChildren, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { stateReducer } from "./reducer";
import { FORM_STATE, State, StateAction } from "./types";

const initialState: State = {
  components: [],
  actionsLog: [],
  formState: FORM_STATE.NOT_INITIALIZED,
};

type StateProviderContextType = {
  state: State;
  dispatch: React.Dispatch<StateAction>;
};

const StateProviderContext = createContext(
  null as unknown as StateProviderContextType
);
export const useBuilderState = () => useContext(StateProviderContext);
export const StateProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(stateReducer, initialState);
  return (
    <StateProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </StateProviderContext.Provider>
  );
};
