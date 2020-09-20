import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

export default function SignUp() {
  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <View>
        <Text>SignUpComponent</Text>
      </View>
    </ImageBackground>
  );
}
