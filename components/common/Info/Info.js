import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import useSearchBar from '../../../hooks/useSearchBar';
import {recipiesApi} from '../../../services/API';
import {View, ImageBackground, Dimensions} from 'react-native';
import {Context} from '../../../Context/Context';
import CardWithRecipe from '../MainPageBlocks/CardWithRecipe';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {styles} from './style';
import {useIndicator} from '../../../hooks/useIndicator/useIndicator';

export default function Info({navigation}) {
  const [recepiesList, setRecepiesList] = useState([]);
  const [listFromSearch, setListFromSearch] = useState([]);
  const [number, setNumber] = useState(0);
  const [numberForSearch, setNumberForSearch] = useState(0);

  const listWithData = useRef([]);
  const {setDataForCurrentDish} = useContext(Context);
  // custom hooks
  const searchBar = useSearchBar(navigation);
  const indicator = useIndicator();
  // styles
  const {container, backgroundImg, renderList} = styles;
  // get all recipies
  async function getRecepies() {
    !!recepiesList.length && indicator.show();
    try {
      const res = await recipiesApi.lazyLoad(number, 20);
      setRecepiesList(recepiesList.concat(res.data));
      listWithData.current.push([...res.data]);
      setNumber((prev) => prev + 20);
      indicator.hide();
    } catch (e) {
      console.error(e);
      indicator.hide();
    }
  }
  // get recipies from search
  const getRecepiesFromSearch = async () => {
    indicator.show();
    !!listFromSearch.length && indicator.show();
    try {
      const res = await recipiesApi.searcResults(
        searchBar.text,
        numberForSearch,
        10,
      );
      setListFromSearch([...listFromSearch, ...res.data]);
      setNumberForSearch((prev) => prev + 10);
      indicator.hide();
    } catch (e) {
      console.error(e);
      indicator.hide();
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

  let {width} = Dimensions.get('window');

  let dataProvider = new DataProvider((r1, r2) => {
    return r1.id !== r2.id;
  });

  const ViewTypes = {
    FULL: 0,
  };

  const layoutProvider = new LayoutProvider(
    (index) => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      dim.width = width;
      dim.height = 270;
    },
  );
  const [data, setData] = useState(dataProvider.cloneWithRows([1]));
  useEffect(() => {
    if (!!listFromSearch.length) {
      setData(dataProvider.cloneWithRows([...listFromSearch]));
      return;
    }
    if (!!recepiesList.length) {
      setData(dataProvider.cloneWithRows([...recepiesList]));
      return;
    }
  }, [recepiesList, listFromSearch]);

  //render card with recipy
  const rowRenderer = useCallback(
    (type, item) => {
      return (
        <CardWithRecipe
          item={item}
          navigation={navigation}
          setDataForCurrentDish={setDataForCurrentDish}
        />
      );
    },
    [navigation, setDataForCurrentDish],
  );
  // render footer loader
  const renderFooter = useCallback(() => indicator.indiator({size: 'large'}), [
    indicator,
  ]);
  return (
    <ImageBackground
      source={require('../../../public/images/authBackground.jpg')}
      style={backgroundImg}>
      <View style={container}>
        <View
          style={{position: 'absolute', top: 0, zIndex: 50000, width: '100%'}}>
          {searchBar.searchBar()}
        </View>
        <RecyclerListView
          dataProvider={data}
          style={renderList}
          rowRenderer={rowRenderer}
          layoutProvider={layoutProvider}
          renderFooter={renderFooter}
          onEndReached={
            !!listFromSearch.length ? getRecepiesFromSearch : getRecepies
          }
          onEndReachedThreshold={0.5}
        />
      </View>
    </ImageBackground>
  );
}
