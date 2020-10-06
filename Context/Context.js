import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  const [currentDish, setCurrentDish] = useState({});

  const setDataForCurrentDish = (key, item) => {
    setCurrentDish({...currentDish, [key]: item});
  };

  const checkStorage = async () => {
    const res = await AsyncStorage.getItem('token');
    if (res !== null) return setAuth(true);
    return setAuth(false);
  };
  useEffect(() => {
    checkStorage();
  }, [auth]);
  return (
    <Context.Provider
      value={{auth, setAuth, checkStorage, currentDish, setDataForCurrentDish}}>
      {children}
    </Context.Provider>
  );
};
