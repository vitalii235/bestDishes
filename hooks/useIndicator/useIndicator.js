import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

export const useIndicator = () => {
  const [state, setState] = useState(false);
  const show = () => setState(true);
  const hide = () => setState(false);
  const indiator = (props) => (
    <View>{state && <ActivityIndicator {...props} />}</View>
  );
  return {indiator, show, hide};
};
