import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Context} from '../../../Context/Context';
import useSearchBar from '../../../hooks/useSearchBar';
import {recipiesApi} from '../../../services/API';
import _ from 'lodash';
import {useLoader} from '../../../hooks/useLoader';

export default function Info({navigation}) {
  const {setDataForCurrentDish} = useContext(Context);
  const [recepiesList, setRecepiesList] = useState([]);
  const [number, setNumber] = useState(1);

  async function getRecepies() {
    !!recepiesList.length && loader.openLoader();
    try {
      const res = await recipiesApi.lazyLoad(10, number);
      setRecepiesList([...recepiesList, ...res.data]);
      setNumber((prev) => prev + 1);
      loader.closeLoader();
    } catch (e) {
      console.error(e);
      loader.closeLoader();
    }
  }

  useEffect(() => {
    !recepiesList.length && getRecepies();
  }, []);
  const loader = useLoader();

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
      {loader.loaderComponent()}
      <FlatList
        data={recepiesList}
        renderItem={cardWithRecipe}
        keyExtractor={(item) => item.id}
        onEndReached={getRecepies}
        onEndReachedThreshold={0.6}
        ListFooterComponent={() => loader.loaderComponent()}
      />
    </View>
  );
}
