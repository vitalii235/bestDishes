import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../containers/Auth/Auth';
import Info from '../common/Info/Info';
import Description from '../common/Description/Description';
// import {TouchableOpacity, Text} from 'react-native';
// import {Context} from '../../Context/Context';
// import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
export default function NavigatiorContainer() {
  // const {auth, checkStorage} = useContext(Context);

  // const logOut = async () => {
  //   await AsyncStorage.clear();
  //   checkStorage();
  // };
  // const logIn =(navigation)=> async () => {
  //   navigation.navigate('Auth');
  // };
  const getHeaderTitle = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : 'SignIn';
    return routeName;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 80,
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 7,
            // },
            // shadowOpacity: 0.43,
            // shadowRadius: 9.51,
            // elevation: 5,
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Info}
          options={({navigation, route}) => ({
            headerTitle: 'Home',
            // headerRightContainerStyle: {
            //   paddingHorizontal: 25,
            // },
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={auth ? logOut : logIn(navigation)}>
            //     <Text>{auth ? 'logOut' : 'SignIn'}</Text>
            //   </TouchableOpacity>
            // ),
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
