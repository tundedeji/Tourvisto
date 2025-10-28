import { createContext, useContext, useEffect, useState } from "react";

const BackendDataContext = createContext();

export const BackendDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const greeting = () => {
    return "Hello";
  };

  const value = {
    data,
    greeting,
  };

  return (
    <BackendDataContext.Provider value={value}>
      {children}
    </BackendDataContext.Provider>
  );
};

export const useBEData = () => {
  const context = useContext(BackendDataContext);

  if (!context) {
    throw new Error("Issues with the context");
  }
};
