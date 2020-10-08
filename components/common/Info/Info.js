import React, {useContext, useEffect, useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Context} from '../../../Context/Context';
import useSearchBar from '../../../hooks/useSearchBar';
import {recipiesApi} from '../../../services/API';
import _ from 'lodash';
import {useLoader} from '../../../hooks/useLoader';
import {translations} from '../../../translations/translations';
import {styles} from './style';
import {Image, View, FlatList, Text, ImageBackground} from 'react-native';
import {Card, CardItem} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

export default function Info({navigation}) {
  const {setDataForCurrentDish} = useContext(Context);
  const [recepiesList, setRecepiesList] = useState([]);
  const [listFromSearch, setListFromSearch] = useState([]);
  const [number, setNumber] = useState(0);
  const [numberForSearch, setNumberForSearch] = useState(0);
  const [pastPossition, setPastPossition] = useState(0);
  const [possition, setPossition] = useState(0);

  //styles
  const {
    itemContainer,
    infoBlock,
    imageStyle,
    card,
    container,
    overlay,
    cardItem,
  } = styles;
  // custom hooks
  const loader = useLoader();
  const searchBar = useSearchBar(navigation);
  // text from data
  const {
    info: {category, timeForCooking},
  } = translations;
  // get all recipies
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
  // get recipies from search
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
  // updating the page
  useEffect(() => {
    !recepiesList.length && getRecepies();
    //searchBar.showSearchBar();
  }, []);

  useEffect(() => {
    searchBar.text && getRecepiesFromSearch(searchBar.text);
    if (searchBar.text === '') {
      setNumberForSearch(0);
      setListFromSearch([]);
    }
  }, [searchBar.text]);

  // Rendered component
  function cardWithRecipe({item}) {
    if (!item.name || !item.categories.length || !item.image) {
      return null;
    } else {
      return (
        <View style={container} key={Math.random().toString()}>
          <Card style={card}>
            <TouchableOpacity
              onPress={() => {
                setDataForCurrentDish('id', item.id);
                navigation.navigate('Description');
              }}>
              <Grid>
                <Row style={itemContainer}>
                  <Col style={infoBlock} size={2 / 3}>
                    <Text>{item.name}</Text>
                    <Text>
                      {category}: {item.categories.join(', ')}
                    </Text>
                    <Text>
                      {timeForCooking}: {item.total_time}
                    </Text>
                  </Col>
                  <Col size={1 / 3}>
                    <CardItem cardBody style={cardItem}>
                      <View style={overlay} />
                      <Image
                        style={imageStyle}
                        source={{
                          uri: item.image,
                        }}
                      />
                    </CardItem>
                  </Col>
                </Row>
              </Grid>
            </TouchableOpacity>
          </Card>
        </View>
      );
    }
  }
  const pastCoordinates = useRef(0);
  const checkTimeOut = useRef(null);
  const settleSearchBarVisible = (screen) => {
    clearTimeout(checkTimeOut.current);
    const coordinates = screen.nativeEvent.contentOffset.y;

    setPossition((prev) => (prev = coordinates));
    checkTimeOut.current = setTimeout(() => {
      setPastPossition((prev) => (prev = coordinates));
    }, 500);
  };
  useEffect(() => {
    if (pastPossition < possition) {
      searchBar.closeSearchBar();
    } else {
      searchBar.showSearchBar();
    }
  }, [possition]);
  console.log('possitiop==>>', possition);
  console.log('pastPossition===>>>', pastPossition);
  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {searchBar.searchBar()}
        <FlatList
          data={!!listFromSearch.length ? listFromSearch : recepiesList}
          onScroll={settleSearchBarVisible}
          renderItem={cardWithRecipe}
          keyExtractor={(item) => item.id}
          onEndReached={
            !!listFromSearch.length ? getRecepiesFromSearch : getRecepies
          }
          onEndReachedThreshold={0.6}
          ListFooterComponent={() => loader.loaderComponent()}
        />
      </View>
    </ImageBackground>
  );
}
