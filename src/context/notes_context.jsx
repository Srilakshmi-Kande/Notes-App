import { createContext, useContext, useReducer, useEffect } from "react";
import { notesReducer } from "../reducers/notesReducer";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const initialState = {
    title: "",
    text: "",
    notes: [],
    archive: [],
    important: [],
    bin: [],
  };

  const storedState = JSON.parse(localStorage.getItem("notesState"));

  const [state, notesDispatch] = useReducer(
    notesReducer,
    storedState || initialState
  );
  
  useEffect(() => {
    localStorage.setItem("notesState", JSON.stringify(state));
  }, [state]);

  return (
    <NotesContext.Provider value={{ ...state, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
