import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  onChange: (v: string) => void;
  value: string;
  list?: any;
};

const CheckBoxButton = (props: Props) => {
  const [checked, setChecked] = useState(false);
  return (
    <TouchableOpacity
      style={{
        padding: 4,
        height: 24,
        width: 24,
        backgroundColor: checked ? '#0EB9F2' : '#f5f5f5',
        elevation: 2,
        borderWidth: 0.5,
        borderColor: '#f3f3f3',
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
      }}
      onPress={() => {
        setChecked(!checked);

        props.onChange(props.value);
      }}>
      {/* {checked === item && <FontAwesomeIcon icon={faCheck} />} */}
    </TouchableOpacity>
  );
};

export default CheckBoxButton;
