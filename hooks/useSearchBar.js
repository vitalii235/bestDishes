import React, {useRef, useState, useContext} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Context} from '../Context/Context';

export default function useSearchBar(navigation) {
  const [text, setText] = useState('');
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);

  const showSearchBar = () => setState(true);

  const closeSearchBar = () => setState(false);

  const {auth, checkStorage} = useContext(Context);

  const logIn = async (navigation) => {
    navigation.navigate('Auth');
  };
  const logOut = async () => {
    await AsyncStorage.clear();
    checkStorage();
  };

  const updateSearch = (e) => {
    clearTimeout(ref.current);
    setLoading(true);
    setText(e);
    if (e !== '') {
      ref.current = setTimeout(async () => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  const cleanSearch = () => {
    setText('');
  };

  const ref = useRef(null);
  const searchBar = () => {
    return (
      <View>
        {state && (
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onChangeText={updateSearch}
                value={text}
              />
              <Icon name="close" onPress={cleanSearch} />
            </Item>
            <Button
              transparent
              onPress={auth ? logOut : () => logIn(navigation)}>
              <Text>{auth ? 'SignOut' : 'SignIn'}</Text>
            </Button>
          </Header>
        )}
      </View>
    );
  };
  return {
    showSearchBar,
    closeSearchBar,
    searchBar,
    text: !loading ? text : null,
  };
}
