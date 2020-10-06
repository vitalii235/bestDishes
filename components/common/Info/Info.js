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
  const [listFromSearch, setListFromSearch] = useState([]);
  const [number, setNumber] = useState(0);

  // custom hooks
  const loader = useLoader();
  const searchBar = useSearchBar();

  async function getRecepies() {
    !!recepiesList.length && loader.openLoader();
    try {
      const res = await recipiesApi.lazyLoad(number, 10);
      setRecepiesList([...recepiesList, ...res.data]);
      setNumber((prev) => prev + 10);
      loader.closeLoader();
    } catch (e) {
      console.error(e);
      loader.closeLoader();
    }
  }

  const getRecepiesFromSearch = async (text, skip, limit) => {
    try {
      const res = await recipiesApi.searcResults(text, skip, limit);
      setListFromSearch([...listFromSearch, ...res.data]);
      setNumber((prev) => prev + 8);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    !recepiesList.length && getRecepies();
  }, []);

  useEffect(() => {
    if (searchBar.text) {
      getRecepiesFromSearch(searchBar.text, number, 8);
    }
    if (searchBar.text === '') setListFromSearch([]);
  }, [searchBar.text]);

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
              <Card.Image
                source={{
                  uri: item.image,
                }}
              />
            </View>
            <Text>Время приготовления: {item.total_time}</Text>
          </TouchableOpacity>
        </Card>
      );
    }
  }
  console.log('istFromSearch==>>>', number);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      {searchBar.searchBar()}

      <FlatList
        data={!!listFromSearch.length ? listFromSearch : recepiesList}
        renderItem={cardWithRecipe}
        keyExtractor={(item) => item.id}
        onEndReached={
          !!listFromSearch.length ? getRecepiesFromSearch : getRecepies
        }
        onEndReachedThreshold={0.6}
        ListFooterComponent={() => loader.loaderComponent()}
      />
    </View>
  );
}
