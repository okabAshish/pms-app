import React, {useEffect, useState} from 'react';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

type Props = {
  labels: Array<string>;
  containerStyles?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  onChange: (v: number) => void;
  value?: number;
  textStyle?: TextStyle;
  buttonSize?: number;
  checkBoxStyles?: ViewStyle;
  borderColor?: string;
};

const defaultProps: Props = {
  labels: ['Not Furnished', 'Fully Furnished'],
  onChange: number => {},
  value: 3,
  textStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft: 10,
    fontSize: 14,
  },
  buttonSize: 24,
  borderColor: '#f5f5f5',
  checkBoxStyles: {
    padding: 4,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
};

const RadioButton = (props: Props) => {
  const [checked, setChecked] = useState(props.labels[props.value]);

  useEffect(() => {
    setChecked(props.labels[props.value]);
  }, [props.value]);

  return (
    <View style={{...props.containerStyles}}>
      {props.labels.map((item, index) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
            ...props.buttonContainerStyle,
          }}>
          <TouchableOpacity
            style={{
              height: props.buttonSize,
              width: props.buttonSize,
              backgroundColor: checked === item ? '#0EB9F2' : '#f5f5f5',
              borderColor: props.borderColor,
              ...props.checkBoxStyles,
            }}
            onPress={() => {
              if (checked === item) {
                setChecked('');
                props.onChange('');
              } else {
                setChecked(item);
                props.onChange(index);
              }
            }}>
            {/* {checked === item && <FontAwesomeIcon icon={faCheck} />} */}
          </TouchableOpacity>
          <Text
            style={{
              ...props.textStyle,
            }}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

RadioButton.defaultProps = defaultProps;

export default RadioButton;
