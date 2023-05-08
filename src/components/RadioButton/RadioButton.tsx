import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';

type Props = {
  labels: Array<string>;
  containerStyles?: ViewStyle;
  onChange: (v: number) => void;
};

const defaultProps: Props = {
  labels: ['Not Furnished', 'Fully Furnished'],
  onChange: number => {},
};

const RadioButton = (props: Props) => {
  const [checked, setChecked] = useState('');

  return (
    <View style={{...props.containerStyles}}>
      {props.labels.map((item, index) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
          }}>
          <TouchableOpacity
            style={{
              padding: 4,
              height: 24,
              width: 24,
              backgroundColor: checked === item ? '#0EB9F2' : '#f5f5f5',
              elevation: 2,
              borderWidth: 0.5,
              borderColor: '#f3f3f3',
              borderRadius: 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}
            onPress={() => {
              if (checked === item) {
                setChecked('');
              } else {
                setChecked(item);
                props.onChange(index);
              }
            }}>
            {/* {checked === item && <FontAwesomeIcon icon={faCheck} />} */}
          </TouchableOpacity>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
};

RadioButton.defaultProps = defaultProps;

export default RadioButton;
