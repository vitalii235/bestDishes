import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {authApi} from '../../../services/API';
import {SignUpContainer} from './styles';
import {Button, Input, Card} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useInput from '../../../hooks/useInput';
import useSnackBar from '../../../hooks/snackBar';

export default function SignUp({navigation}) {
  //Styles
  const {
    container,
    inputField,
    cardContainer,
    inputContainer,
    iconContainer,
    title,
  } = SignUpContainer;
  //Custom hooks
  const emailInput = useInput();
  const passwordInput = useInput();
  const confirmPasswordInput = useInput();
  const firstNameInput = useInput();
  const lastNameInput = useInput();
  const snackBar = useSnackBar();
  //Local state
  const [isPasswordShown, setIsPaswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [loaderStarted, setLoaderStarted] = useState(false);
  //Functions
  const handleSubmit = async () => {
    snackBar.hideMessage();
    if (passwordInput.value === confirmPasswordInput.value) {
      if (
        emailInput.value &&
        passwordInput.value &&
        firstNameInput.value &&
        lastNameInput.value
      ) {
        setLoaderStarted(true);
        const data = {
          email: emailInput.value,
          password: passwordInput.value,
          first_name: firstNameInput.value,
          last_name: lastNameInput.value,
        };
        try {
          await authApi.signUp(data);
          setLoaderStarted(false);
          navigation.navigate('SignIn');
        } catch (e) {
          console.error(e);
          setLoaderStarted(false);
          snackBar.showMessage('Something went wrong', {
            backgroundColor: 'red',
          });
        }
      } else {
        snackBar.showMessage('Please fill all fields');
      }
    } else {
      snackBar.showMessage('Passwords does not match');
    }
  };
  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <Card containerStyle={cardContainer}>
            <Card.Title style={title}>Please signUp</Card.Title>
            <Card.Divider />
            <View style={inputContainer}>
              <Input
                style={inputField}
                {...emailInput}
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
                {...passwordInput}
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
                {...confirmPasswordInput}
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
                {...firstNameInput}
                placeholder="First name"
              />
              <Input
                style={inputField}
                {...lastNameInput}
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
      {snackBar.messageText()}
    </ImageBackground>
  );
}
