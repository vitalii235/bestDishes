import React, {useState} from 'react';
import {Spinner} from 'native-base';
import {View} from 'react-native';

export const useLoader = () => {
  const [toggleLoader, setToggleLoader] = useState(true);
  const openLoader = () => setToggleLoader(true);
  const closeLoader = () => setToggleLoader(false);
  const loaderComponent = (color) => (
    <View>{toggleLoader && <Spinner color={color ? color : 'gray'} />}</View>
  );
  return {loaderComponent, openLoader, closeLoader};
};
