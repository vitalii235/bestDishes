import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';

export default function useSearchBar() {
  const [text, setText] = useState('');
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);

  const showSearchBar = () => setState(true);

  const closeSearchBar = () => setState(false);

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
              {/* <Icon name="ios-people" /> */}
            </Item>
            <Button transparent>
              <Text>Search</Text>
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
