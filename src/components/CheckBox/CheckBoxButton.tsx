import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  onChange: (v: string) => void;
  value: string;
  list?: any;
  checked: boolean;
};

const defaultProps: Props = {
  checked: false,
  onChange: (v: string) => {},
  value: '',
};

const CheckBoxButton = (props: Props) => {
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

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
CheckBoxButton.defaultProps = defaultProps;

export default CheckBoxButton;
