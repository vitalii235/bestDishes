import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
} from 'react-native';
import {authApi} from '../../../services/API';
import {SignUpContainer} from './styles';
import {Button, Input, Card} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SnackBar from 'react-native-snackbar-component';

export default function SignUp({navigation}) {
  const {
    container,
    inputField,
    cardContainer,
    inputContainer,
    iconContainer,
    title,
  } = SignUpContainer;
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });
  const [isPasswordShown, setIsPaswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [loaderStarted, setLoaderStarted] = useState(false);
  const {email, password, first_name, last_name, confirmPassword} = state;
  const handleChange = (e, fieldName) => {
    fieldName === 'email'
      ? setState({...state, email: e})
      : fieldName === 'password'
      ? setState({...state, password: e})
      : fieldName === 'confirmPassword'
      ? setState({...state, confirmPassword: e})
      : fieldName === 'firstName'
      ? setState({...state, first_name: e})
      : setState({...state, last_name: e});
  };
  const handleSubmit = async () => {
    if (password === confirmPassword) {
      try {
        if (email && password && first_name && last_name) {
          setLoaderStarted(true);
          const data = {
            email,
            password,
            first_name,
            last_name,
          };
          try {
            await authApi.signUp(data);
            setLoaderStarted(false);
            navigation.navigate('SignIn');
          } catch (e) {
            console.error(e);
            setLoaderStarted(false);
            Alert.alert('something went wrong');
          }
        }
      } catch (e) {
        console.error(e);
      }
    } else {
    }
  };
  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <View style={{width: '100%'}}>
        <SnackBar
          visible={true}
          textMessage="Hello There!"
          position="top"
          top={20}
          backgroundColor="red"
        />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <Card containerStyle={cardContainer}>
            <Card.Title style={title}>Please signUp</Card.Title>
            <Card.Divider />
            <View style={inputContainer}>
              <Input
                style={inputField}
                value={email}
                onChangeText={(e) => handleChange(e, 'email')}
                placeholder="Email"
                autoCapitalize="none"
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
                value={password}
                onChangeText={(e) => handleChange(e, 'password')}
                placeholder="Password"
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
              <Input
                style={inputField}
                secureTextEntry={!isConfirmPasswordShown}
                value={confirmPassword}
                onChangeText={(e) => handleChange(e, 'confirmPassword')}
                placeholder="Confirm Password"
                rightIconContainerStyle={iconContainer}
                rightIcon={
                  isConfirmPasswordShown ? (
                    <FontAwesome
                      name="unlock"
                      size={24}
                      color="black"
                      onPress={() =>
                        setIsConfirmPasswordShown(!isConfirmPasswordShown)
                      }
                    />
                  ) : (
                    <FontAwesome
                      name="lock"
                      size={24}
                      color="black"
                      onPress={() =>
                        setIsConfirmPasswordShown(!isConfirmPasswordShown)
                      }
                    />
                  )
                }
              />
              <Input
                style={inputField}
                value={first_name}
                onChangeText={(e) => handleChange(e, 'firstName')}
                placeholder="First name"
              />
              <Input
                style={inputField}
                value={last_name}
                onChangeText={handleChange}
                placeholder="Last name"
              />
              <Button
                title="SignUp"
                type="clear"
                onPress={handleSubmit}
                loading={loaderStarted}
              />
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
