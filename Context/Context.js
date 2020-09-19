import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [auth, setAuth] = useState(false);

  const checkStorage = async () => {
    const res = await AsyncStorage.getItem('token');
    console.log('TOKEN===>>', res);
    if (res !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };
  useEffect(() => {
    checkStorage();
  }, [auth]);
  return (
    <Context.Provider value={{auth, setAuth, checkStorage}}>
      {children}
    </Context.Provider>
  );
};
