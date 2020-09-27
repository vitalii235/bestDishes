import React, {useContext, useState} from 'react';
import {
  Alert,
  ImageBackground,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import {SignInContainer} from './styles';
import {Context} from '../../../Context/Context';
import AsyncStorage from '@react-native-community/async-storage';
import {authApi} from '../../../services/API';
import {Input, Card, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useInput from '../../../hooks/useInput';
import useSnackBar from '../../../hooks/snackBar';

export default function SignIn({navigation}) {
  //styles
  const {
    container,
    inputField,
    cardContainer,
    inputContainer,
    iconContainer,
    title,
  } = SignInContainer;
  //contextData
  const {checkStorage} = useContext(Context);
  //Loccal state
  const [isPasswordShown, setIsPaswordShown] = useState(false);
  const [loaderStarted, setLoaderStarted] = useState(false);
  //custom hooks
  const emailInput = useInput();
  const passwordInput = useInput();
  const snackBar = useSnackBar();
  //functions
  const handleSubmit = async () => {
    setLoaderStarted(true);
    const data = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    try {
      const res = await authApi.signIn(data);
      if (res.data) {
        await AsyncStorage.setItem('token', res.data.token);
        setLoaderStarted(false);
        checkStorage();
        navigation.navigate('Home');
      }
    } catch (e) {
      console.error(e);
      snackBar.showMessage('Something is wrong');
      setLoaderStarted(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <Card containerStyle={cardContainer}>
            <Card.Title style={title}>Please signIn</Card.Title>
            <Card.Divider />
            <View style={inputContainer}>
              <Input
                style={inputField}
                placeholder="Email"
                autoCapitalize="none"
                {...emailInput}
                rightIconContainerStyle={iconContainer}
                rightIcon={
                  <MaterialIcons
                    name="alternate-email"
                    size={24}
                    color="black"
                  />
                }
              />
              <Input
                style={inputField}
                secureTextEntry={!isPasswordShown}
                placeholder="Password"
                {...passwordInput}
                rightIconContainerStyle={iconContainer}
                rightIcon={
                  isPasswordShown ? (
                    <FontAwesome
                      name="unlock"
                      size={24}
                      color="black"
                      onPress={() => setIsPaswordShown(!isPasswordShown)}
                    />
                  ) : (
                    <FontAwesome
                      name="lock"
                      size={24}
                      color="black"
                      onPress={() => setIsPaswordShown(!isPasswordShown)}
                    />
                  )
                }
              />
              <Button
                title="SingIn"
                type="clear"
                loading={loaderStarted}
                onPress={handleSubmit}
              />
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
      {snackBar.messageText()}
    </ImageBackground>
  );
}
