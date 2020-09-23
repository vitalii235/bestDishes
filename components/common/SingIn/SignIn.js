import React, {useContext, useState} from 'react';
import {
  Alert,
  ImageBackground,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {SignInContainer} from './styles';
import {Context} from '../../../Context/Context';
import AsyncStorage from '@react-native-community/async-storage';
import {authApi} from '../../../services/API';
import {Input, Card, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SignIn() {
  const {
    container,
    inputField,
    cardContainer,
    inputContainer,
    iconContainer,
    title,
  } = SignInContainer;
  const {checkStorage} = useContext(Context);
  const [isPasswordShown, setIsPaswordShown] = useState(false);
  const [loaderStarted, setLoaderStarted] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const {email, password} = state;
  const handleChange = (e, fieldName) => {
    fieldName === 'email'
      ? setState({...state, email: e})
      : setState({...state, password: e});
  };
  const handleSubmit = async () => {
    setLoaderStarted(true);
    const {email, password} = state;
    const data = {
      email,
      password,
    };
    try {
      const res = await authApi.signIn(data);
      if (res.data) {
        await AsyncStorage.setItem('token', res.data.token);
        setLoaderStarted(false);
        checkStorage();
      }
    } catch (e) {
      console.error(e);
      Alert.alert('WRONG DATA');
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
                value={email}
                onChangeText={(e) => handleChange(e, 'email')}
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
                value={password}
                onChangeText={handleChange}
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
    </ImageBackground>
  );
}
