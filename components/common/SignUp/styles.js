import {StyleSheet} from 'react-native';

export const SignUpContainer = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    top: '13%',
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  title: {
    color: '#fff',
  },
  inputField: {
    width: '80%',
    height: 40,
    position: 'relative',
    color: '#fff',
    paddingLeft: 10,
    marginTop: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: -5,
  },
});
