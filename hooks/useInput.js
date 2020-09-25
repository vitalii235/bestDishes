import {useState} from 'react';

function useInput(data) {
  const [value, setValue] = useState(data);
  const onChangeText = (event) => {
    setValue(event);
  };
  return {value, onChangeText};
}

export default useInput;
