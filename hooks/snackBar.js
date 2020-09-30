import React, {useState} from 'react';
const {View, Text, StyleSheet} = require('react-native');
import AntDesign from 'react-native-vector-icons/AntDesign';

function useSnackBar() {
  const [state, setState] = useState(false);
  const [text, setText] = useState('');
  const [bottomDistance, setBottomDistance] = useState({});
  const {container, icon, textStyle} = styles;

  const showMessage = (message, styles) => {
    setState(true);
    setText(message);
    styles && setBottomDistance({...styles});
  };

  const hideMessage = () => setState(false);
  const messageText = () => (
    <View>
      {state && (
        <View style={{...container, ...bottomDistance}}>
          <Text style={textStyle}>{text}</Text>
          <AntDesign
            name="closecircleo"
            style={icon}
            size={30}
            onPress={hideMessage}
          />
        </View>
      )}
    </View>
  );
  return {messageText, showMessage, hideMessage};
}

export default useSnackBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textStyle: {},
  icon: {},
});
