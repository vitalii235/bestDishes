const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    height: 'auto',
  },
  cardItem: {position: 'relative'},
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    //backgroundColor: 'red',
    borderColor: 'white',
    borderTopWidth: 20,
    borderBottomWidth: 20,
    zIndex: 10,
  },
  card: {
    paddingHorizontal: 10,
    height: 180,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    height: 160,
    width: null,
    flex: 1,
  },
  infoBlock: {
    paddingRight: 5,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'gray',
    height: '100%',
    justifyContent: 'space-evenly',
  },
});
