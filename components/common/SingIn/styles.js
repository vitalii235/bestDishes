import {StyleSheet} from 'react-native';

export const SignInContainer = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cardContainer: {
    top: '25%',
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
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
