import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import SignUp from '../../common/SignUp/SignUp';
import SignIn from '../../common/SingIn/SignIn';

export default function Auth() {
  const Tab = createBottomTabNavigator();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
      </Tab.Navigator>
    </View>
  );
}
