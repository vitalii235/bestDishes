import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Context} from '../../../Context/Context';
import {recipiesApi} from '../../../services/API';

export default function Info() {
  async function getRecepies() {
    const res = await recipiesApi.getList();
    setData(res.data);
  }
  const {auth} = useContext(Context);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (auth) {
      getRecepies();
    } else {
      setData([]);
    }
  }, [auth]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Info!</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
