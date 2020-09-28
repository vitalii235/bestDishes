import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Context} from '../../../Context/Context';
import {recipiesApi} from '../../../services/API';

export default function Info({navigation}) {
  async function getRecepies() {
    const res = await recipiesApi.getList();
    setRecepiesList(res.data);
  }
  const {setDataForCurrentDish} = useContext(Context);
  const [recepiesList, setRecepiesList] = useState([]);

  useEffect(() => {
    if (!recepiesList.length) {
      getRecepies();
    } else {
      setRecepiesList([]);
    }
  }, []);

  function cardWithRecipe({item}) {
    return (
      <Card>
        <TouchableOpacity
          onPress={() => {
            setDataForCurrentDish('id', item.id);
            navigation.navigate('Description');
          }}>
          <View>
            <Text>{item.name}</Text>
            {item.instructions[0] && (
              <Card.Image
                source={{
                  uri: item.instructions[item.instructions.length - 1].image
                    ? item.instructions[item.instructions.length - 1].image
                    : null,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <Card.Divider />
      </Card>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Info!</Text>
      <FlatList
        data={recepiesList}
        renderItem={cardWithRecipe}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
