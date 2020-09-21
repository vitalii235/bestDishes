import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  ImageBackground,
  TextInput,
  View,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {SignInContainer} from './styles';
import {Context} from '../../../Context/Context';
import AsyncStorage from '@react-native-community/async-storage';
import {authApi} from '../../../services/API';

export default function SignIn() {
  const {container, inputField, inputContainer} = SignInContainer;
  const {checkStorage} = useContext(Context);
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
    const {email, password} = state;
    const data = {
      email,
      password,
    };
    try {
      const res = await authApi.signIn(data);
      if (res.data) {
        await AsyncStorage.setItem('token', res.data.token);
        checkStorage();
      }
    } catch (e) {
      console.error(e);
      Alert.alert('WRONG DATA');
    }
  };

  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <View style={inputContainer}>
            <TextInput
              style={inputField}
              value={email}
              onChangeText={(e) => handleChange(e, 'email')}
              placeholder="Email"
              placeholderTextColor="#fff"
              autoCapitalize="none"
            />
            <TextInput
              style={inputField}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={handleChange}
              placeholderTextColor="#fff"
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
