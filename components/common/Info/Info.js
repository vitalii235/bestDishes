import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Context} from '../../../Context/Context';
import useSearchBar from '../../../hooks/useSearchBar';
import {recipiesApi} from '../../../services/API';
import _ from 'lodash';

export default function Info({navigation}) {
  const {setDataForCurrentDish} = useContext(Context);
  const [recepiesList, setRecepiesList] = useState([]);

  async function getRecepies() {
    const res = await recipiesApi.getList();
    setRecepiesList(res.data);
  }

  useEffect(() => {
    if (!recepiesList.length) {
      getRecepies();
    } else {
      setRecepiesList([]);
    }
  }, []);

  const searchBar = useSearchBar();

  function cardWithRecipe({item}) {
    if (!item.name || !item.categories.length || !item.image) {
      return null;
    } else {
      return (
        <Card>
          <TouchableOpacity
            onPress={() => {
              setDataForCurrentDish('id', item.id);
              navigation.navigate('Description');
            }}>
            <View>
              <Text>{item.name}</Text>
              <Card.Divider />
              <Text>Категория: {item.categories.join(', ')}</Text>
              {_.first(item.instructions) && (
                <Card.Image
                  source={{
                    uri: item.image,
                  }}
                />
              )}
            </View>
            <Text>Время приготовления: {item.total_time}</Text>
          </TouchableOpacity>
        </Card>
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      {searchBar.searchBar()}
      <FlatList
        data={recepiesList}
        renderItem={cardWithRecipe}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
