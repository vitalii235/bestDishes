import {gray, white} from '../../../theme/palette';

const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    height: 'auto',
  },
  cardItem: {position: 'relative', marginTop: 5},
  card: {
    display: 'flex',
    height: 230,
    borderRadius: 10,
    // alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: 'relative',
  },
  likesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  imageStyle: {
    height: 220,
    width: null,
    flex: 1,
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    position: 'relative',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    backgroundColor: white,
    top: -25,
    padding: 5,
    borderTopRightRadius: 5,
  },
  categories: {
    position: 'absolute',
    right: 0,
    backgroundColor: white,
    top: -25,
    padding: 5,
    borderTopLeftRadius: 5,
  },
  title: {
    position: 'absolute',
    right: 0,
    backgroundColor: white,
    top: 0,
    padding: 5,
    borderBottomLeftRadius: 5,
    zIndex: 200,
  },
});
