import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useBuilderState } from "../../state/StateProvider";
import { StateActionType } from "../../state/types";

export enum ActiveContent {
  EDIT_ELEMENT,
  ADD_CHILD_ELEMENT,
}

type ActiveContentData = {
  type: ActiveContent;
  uid: string;
};

type TreeContextType = {
  editLabel: EditLabel | null;
  activeContent: ActiveContentData | null;
  handleShowEditLabel: (labeldData: EditLabel) => void;
  handleSetActiveContent: (contentData: ActiveContentData) => void;
  handleEditLabel: (value: string) => void;
  handleConfirmEditLabel: () => void;
  handleCancelEditLabel: () => void;
  transitionData: TransitionData;
};

type TransitionData = {
  uid: string;
  timeout: number;
};

type EditLabel = { uid: string; value: string };

const TreeContext = createContext(null as unknown as TreeContextType);

export const useTreeContext = () => useContext(TreeContext);

export const TreeContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [editLabel, setEditLabel] = useState<EditLabel | null>(null);
  const [activeContent, setActiveContent] =
    useState<TreeContextType["activeContent"]>(null);
  const switchTimeoutRef = useRef<TransitionData>({ uid: "", timeout: 0 });
  const { dispatch } = useBuilderState();

  const handleSetActiveContent = useCallback(
    (content: ActiveContentData) => {
      clearTimeout(switchTimeoutRef.current.timeout);
      switchTimeoutRef.current.uid = "";

      if (
        activeContent?.uid === content.uid &&
        activeContent.type === content.type
      ) {
        setActiveContent(null);
      } else if (
        activeContent !== null &&
        (activeContent.uid !== content.uid ||
          (activeContent.uid === content.uid &&
            activeContent.type !== content.type))
      ) {
        setActiveContent(null);
        switchTimeoutRef.current.uid = content.uid;
        switchTimeoutRef.current.timeout = setTimeout(() => {
          clearTimeout(switchTimeoutRef.current.timeout);
          switchTimeoutRef.current.timeout = 0;
          switchTimeoutRef.current.uid = "";
          setActiveContent(content);
        }, 275);
      } else {
        setActiveContent(content);
      }
    },
    [activeContent]
  );

  const handleShowEditLabel = useCallback((labelData: EditLabel) => {
    setEditLabel(labelData);
  }, []);

  const handleEditLabel = useCallback(
    (value: string) => {
      if (!editLabel) return;
      setEditLabel({ ...editLabel, value });
    },
    [editLabel]
  );

  const handleConfirmEditLabel = useCallback(() => {
    if (!editLabel) return;
    dispatch({
      type: StateActionType.EDIT_COMPONENT,
      data: {
        changes: {
          name: editLabel.value,
        },
        uid: editLabel.uid,
      },
    });
    setEditLabel(null);
  }, [dispatch, editLabel]);

  const handleCancelEditLabel = useCallback(() => {
    setEditLabel(null);
  }, []);

  return (
    <TreeContext.Provider
      value={{
        editLabel,
        handleCancelEditLabel,
        handleConfirmEditLabel,
        handleEditLabel,
        handleShowEditLabel,
        activeContent,
        handleSetActiveContent,
        transitionData: switchTimeoutRef.current,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};
