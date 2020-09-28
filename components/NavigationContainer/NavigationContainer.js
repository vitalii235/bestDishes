import React, {useContext, useState} from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../containers/Auth/Auth';
import Home from '../containers/Home/Home';
import {Context} from '../../Context/Context';
import AsyncStorage from '@react-native-community/async-storage';
import Info from '../common/Info/Info';
import Description from '../common/Description/Description';

const Stack = createStackNavigator();
export default function NavigatiorContainer() {
  const {auth, checkStorage} = useContext(Context);

  const logIn = async (navigation) => {
    navigation.navigate('Auth');
  };
  const logOut = async () => {
    console.log('AUTH===>>>', auth);
    await AsyncStorage.clear();
    checkStorage();
  };

  const getHeaderTitle = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : 'SignIn';
    switch (routeName) {
      case 'Auth':
        return 'Auth';
      case 'SignIn':
        return 'SignIn';
      case 'SignUp':
        return 'SignUp';
    }
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
        <Stack.Screen
          name="Home"
          component={Info}
          options={({navigation, route}) => ({
            headerTitle: 'Home',
            headerRightContainerStyle: {
              paddingHorizontal: 20,
            },
            headerRight: () => (
              <Button
                onPress={auth ? logOut : () => logIn(navigation)}
                title={auth ? 'logOut' : 'SignIn'}
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={({route}) => {
            return {headerTitle: getHeaderTitle(route)};
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
