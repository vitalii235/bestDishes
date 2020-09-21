import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import SignUp from '../../common/SignUp/SignUp';
import SignIn from '../../common/SingIn/SignIn';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export default function Auth() {
  const Tab = createBottomTabNavigator();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'SignIn') {
              iconName = 'team';
            } else if (route.name === 'SignUp') {
              iconName = 'hearto';
            }
            return <IconAntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'red',
        }}>
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
      </Tab.Navigator>
    </View>
  );
}
