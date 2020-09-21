import Axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Button,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {authApi} from '../../../services/API';
import {SignUpContainer} from './styles';

export default function SignUp({navigation}) {
  const {container, inputField, inputContainer} = SignUpContainer;
  const [state, setState] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const {email, password, first_name, last_name} = state;
  const handleChange = (e, fieldName) => {
    fieldName === 'email'
      ? setState({...state, email: e})
      : fieldName === 'password'
      ? setState({...state, password: e})
      : fieldName === 'firstName'
      ? setState({...state, first_name: e})
      : setState({...state, last_name: e});
  };
  const handleSubmit = async () => {
    try {
      if (email && password && first_name && last_name) {
        const data = {
          email,
          password,
          first_name,
          last_name,
        };
        try {
          await authApi.signUp(data);
          navigation.navigate('SignIn');
        } catch (e) {
          console.error(e);
          Alert.alert('something went wrong');
        }
      }
    } catch (e) {
      console.error(e);
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
              value={password}
              onChangeText={(e) => handleChange(e, 'password')}
              placeholder="password"
              placeholderTextColor="#fff"
            />
            <TextInput
              style={inputField}
              value={first_name}
              onChangeText={(e) => handleChange(e, 'firstName')}
              placeholder="First name"
              placeholderTextColor="#fff"
            />
            <TextInput
              style={inputField}
              value={last_name}
              onChangeText={handleChange}
              placeholder="Last name"
              placeholderTextColor="#fff"
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
