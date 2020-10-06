import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';

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
    ref.current = setTimeout(async () => {
      setLoading(false);
    }, 1000);
  };

  const ref = useRef(null);
  const searchBar = () => {
    return (
      <View>
        {state && (
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(e) => updateSearch(e)}
            value={text}
            platform="ios"
            showLoading={loading}
            autoCapitalize="none"
          />
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
