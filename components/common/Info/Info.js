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
  const [numberForSearch, setNumberForSearch] = useState(0);

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

  const getRecepiesFromSearch = async () => {
    !!listFromSearch.length && loader.openLoader();
    try {
      const res = await recipiesApi.searcResults(
        searchBar.text,
        numberForSearch,
        10,
      );
      setListFromSearch([...listFromSearch, ...res.data]);
      setNumberForSearch((prev) => prev + 10);
      loader.closeLoader();
    } catch (e) {
      console.error(e);
      loader.closeLoader();
    }
  };

  useEffect(() => {
    !recepiesList.length && getRecepies();
  }, []);

  useEffect(() => {
    searchBar.text && getRecepiesFromSearch(searchBar.text);
    searchBar.text === '' && setListFromSearch([]) && setListFromSearch(0);
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
