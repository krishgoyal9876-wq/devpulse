import {
  createContext,
  useEffect,
  useReducer,
} from "react";

export const PinboardContext = createContext();

function pinboardReducer(state, action) {
  switch (action.type) {
    case "PIN_REPO":
      return [...state, action.payload];

    case "UNPIN_REPO":
      return state.filter((repo) => repo.id !== action.payload);

    default:
      return state;
  }
}

function getInitialPins() {
  const savedPins = localStorage.getItem("devpulse-pins");

  return savedPins ? JSON.parse(savedPins) : [];
}

export function PinboardProvider({ children }) {
  const [pinnedRepos, dispatch] = useReducer(
    pinboardReducer,
    [],
    getInitialPins
  );

  useEffect(() => {
    localStorage.setItem(
      "devpulse-pins",
      JSON.stringify(pinnedRepos)
    );
  }, [pinnedRepos]);

  return (
    <PinboardContext.Provider value={{ pinnedRepos, dispatch }}>
      {children}
    </PinboardContext.Provider>
  );
}