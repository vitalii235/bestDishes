import React from 'react';
import {View, Text, Button} from 'react-native';
import * as axios from 'axios';

export default function Info() {
  const handleRequest = async () => {
    try {
      const res = await axios.get(
        // 'http://178.150.163.118:3030/swagger/index.html',
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      console.log('RESULT===>>>', res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Info!</Text>
      <Button title="getRequest" onPress={handleRequest} />
    </View>
  );
}
