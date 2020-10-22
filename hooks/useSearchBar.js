import React, {useRef, useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet,  PanResponder,
  Animated} from 'react-native';
import {Header, Item, Input, Icon, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Context} from '../Context/Context';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function useSearchBar(navigation) {
  const [text, setText] = useState('');
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categoriesHidden, setCategoriesHidden] = useState(true)

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

  const styles = StyleSheet.create({
    container:{
      height:300,
      position:"absolute",
      top:-300,
      width:"100%",
      backgroundColor:"#f8f8f8"
    },
    headerContainer:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      // position:"absolute",
      top:225,
    },
    inpitContainer:{
      display:"flex",
      flexDirection:"row",
      width:"100%",
    }
  })

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
   
    onPanResponderMove: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: pan.y._value<100?280:0 }, useNativeDriver: false } // Back to zero
      ).start();
    },
  });
  const handleMpve=()=>{
    Animated.spring(
      pan, // Auto-multiplexed
      { toValue: { x: 0, y: pan.y._value<100?280:0}, useNativeDriver: false } // Back to zero
    ).start();
  }
  const ref = useRef(null);
  const searchBar = () => {
    return ( 
      <Animated.View
          style={{
            transform: [{ translateY: pan.y}]
          }}
          {...panResponder.panHandlers}
        >
         
      <View style={styles.container}>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
        {state && ( 
          <Header searchBar rounded style={styles.headerContainer}>   
            <View style={styles.inpitContainer}>
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
            </View>
            <View>
              <AntDesign name="ellipsis1" size={10} onPress={handleMpve}/>
           </View>
          </Header>
        )}
      </View>
        </Animated.View>
    );
  };
  return {
    showSearchBar,
    closeSearchBar,
    searchBar,
    text: !loading ? text : null,
  };
}

