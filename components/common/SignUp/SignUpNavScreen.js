import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import SignUp from './SignUp';

export default function SignUpNavScreen() {
  const SignUpNavigator = createStackNavigator();
  return (
    <SignUpNavigator.Navigator>
      <SignUpNavigator.Screen name="SignUp" component={SignUp} />
    </SignUpNavigator.Navigator>
  );
}
