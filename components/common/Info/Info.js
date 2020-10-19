import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import useSearchBar from '../../../hooks/useSearchBar';
import {recipiesApi} from '../../../services/API';
import {useLoader} from '../../../hooks/useLoader';
import {View, ImageBackground, Dimensions} from 'react-native';
import {Context} from '../../../Context/Context';
import CardWithRecipe from '../MainPageBlocks/CardWithRecipe';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

export default function Info({navigation}) {
  const [recepiesList, setRecepiesList] = useState([]);
  const [listFromSearch, setListFromSearch] = useState([]);
  const [number, setNumber] = useState(0);
  const [numberForSearch, setNumberForSearch] = useState(0);

  const listWithData = useRef([]);
  // const [pastPossition, setPastPossition] = useState(0);
  // const [possition, setPossition] = useState(0);
  const {setDataForCurrentDish} = useContext(Context);
  // custom hooks
  const loader = useLoader();
  const searchBar = useSearchBar(navigation);
  // text from data

  // get all recipies
  async function getRecepies() {
    !!recepiesList.length && loader.openLoader();
    try {
      const res = await recipiesApi.lazyLoad(number, 30);
      setRecepiesList(recepiesList.concat(res.data));
      listWithData.current.push([...res.data]);
      console.log('listWithData===>>>', res);
      setNumber((prev) => prev + 30);
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

  const renderItem = useCallback(
    (item) => {
      return CardWithRecipe({item, navigation, setDataForCurrentDish});
    },
    [navigation, setDataForCurrentDish],
  );

  let {width} = Dimensions.get('window');

  //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
  let dataProvider = new DataProvider((r1, r2) => {
    return r1.id !== r2.id;
  });

  const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
  };

  const layoutProvider = new LayoutProvider(
    (index) => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      dim.width = width;
      dim.height = 200;
    },
  );
  const [data, setData] = useState(dataProvider.cloneWithRows([1]));
  useEffect(() => {
    if (!!recepiesList.length) {
      setData(dataProvider.cloneWithRows([...recepiesList]));
    }
  }, [recepiesList]);
  const rowRenderer = (type, item) => {
    return (
      <CardWithRecipe
        item={item}
        navigation={navigation}
        setDataForCurrentDish={setDataForCurrentDish}
      />
    );
  };
  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={{flex: 1, resizeMode: 'auto'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {/* {searchBar.searchBar()} */}
        <RecyclerListView
          dataProvider={data}
          rowRenderer={rowRenderer}
          layoutProvider={layoutProvider}
          onEndReached={getRecepies}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ImageBackground>
  );
}
