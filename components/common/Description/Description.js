import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {Context} from '../../../Context/Context';

export default function Description({navigation}) {
  const {
    currentDish: {id},
  } = useContext(Context);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
