import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Description from '../../common/Description/Description';
import Info from '../../common/Info/Info';

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="Description" component={Description} />
      </Tab.Navigator>
    </View>
  );
}
