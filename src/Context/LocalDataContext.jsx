import { createContext, useContext, useEffect, useState } from "react";
import { featuredDestinations } from "../data/mockData";

const LocalDataContext = createContext();

export const LocalDataContextProvider = ({ children }) => {
  const [localData, setLocalData] = useState([]);

  console.log("before getting data values:", localData);

  useEffect(() => {
    const aData = [...featuredDestinations];

    setLocalData(aData);
  }, []);

  const value = {
    localData,
  };

  console.log("after getting data values:", localData);

  return (
    <LocalDataContext.Provider value={value}>
      {children}
    </LocalDataContext.Provider>
  );
};

export const useLOData = () => {
  const context = useContext(LocalDataContext);
  if (!context) {
    throw new Error("Context is not available");
  }

  return context;
};
