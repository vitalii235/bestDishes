import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Description from '../../common/Description/Description';
import Info from '../../common/Info/Info';

export default function Home() {
  const Stack = createStackNavigator();
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Description" component={Description} />
      </Stack.Navigator>
    </View>
  );
}
