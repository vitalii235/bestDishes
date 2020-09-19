import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  ImageBackground,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AuthContainer} from './styles';
import {Context} from '../../../Context/Context';
import AsyncStorage from '@react-native-community/async-storage';

export default function Auth() {
  const {container, inputField, inputContainer} = AuthContainer;
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
    if (email === 'User' && password === 'Password') {
      await AsyncStorage.setItem('token', 'qqq');
      checkStorage();
    } else {
      Alert.alert('Wrong data');
    }
  };
  const image = {
    uri:
      'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/06/cropped-GettyImages-643764514.jpg',
  };
  return (
    <ImageBackground source={image} style={{flex: 1, resizeMode: 'auto'}}>
      <View style={container}>
        <View style={inputContainer}>
          <TextInput
            style={inputField}
            value={email}
            onChangeText={(e) => handleChange(e, 'email')}
          />
          <TextInput
            style={inputField}
            value={password}
            onChangeText={handleChange}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </ImageBackground>
  );
}
