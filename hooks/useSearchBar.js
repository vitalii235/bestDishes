import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default function useSearchBar() {
  const [text, setText] = useState('');
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);

  const showSearchBar = () => {
    setState(true);
  };
  const closeSearchBar = () => {
    setState(false);
  };
  const updateSearch = (e) => {
    clearTimeout(ref.current);
    setLoading(true);
    setText(e);
    ref.current = setTimeout(() => {
      console.log('work');
      setLoading(false);
    }, 500);
  };
  const ref = useRef(null);
  const searchBar = () => {
    return (
      <View>
        {state && (
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={text}
            platform="ios"
            showLoading={loading}
          />
        )}
      </View>
    );
  };
  return {showSearchBar, closeSearchBar, searchBar};
}
