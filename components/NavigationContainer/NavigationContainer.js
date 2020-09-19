import React, {useContext, useState} from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../containers/Auth/Auth';
import Home from '../containers/Home/Home';
import {Context} from '../../Context/Context';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
export default function NavigatiorContainer() {
  const {auth, checkStorage} = useContext(Context);

  const logOut = async () => {
    await AsyncStorage.clear();
    await checkStorage();
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,
            elevation: 11,
          },
        }}>
        {!auth ? (
          <Stack.Screen name="Auth" component={Auth} />
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'Home',
              headerRight: () => (
                <Button onPress={logOut} title="LogOut" color="black" />
              ),
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
