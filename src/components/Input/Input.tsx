import React, {useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputAndroidProps,
  TextInputChangeEventData,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  label?: string;
  placehoder?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  switchButton: boolean;
  switchButtonData: Array<string>;
  keyboardType: KeyboardTypeOptions;
  autoFoucs?: boolean;
  autoCapitalize: boolean;
  autoComplete: TextInputAndroidProps['autoComplete'];
  autoCorrect: boolean;
  containerStyles?: ViewStyle;
  value?: any;
  switchModeType?: string;
  setSwitchModeType?: (v: string) => void;
  disabled: boolean;
  inputProps?: TextInputProps;
  inputStyles?: ViewStyle;
};

const defaultProps: Props = {
  label: 'Property Title (Nick Name)',
  placehoder: 'Enter a nick name of the property',
  switchButton: false,
  switchButtonData: ['Sq Ft.', 'Meter'],
  keyboardType: 'default',
  autoFoucs: false,
  autoCapitalize: false,
  autoComplete: 'off',
  autoCorrect: false,
  disabled: false,
  inputStyles: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
};

const Input = (props: Props) => {
  const [modeButton, setModeButton] = useState(0);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={{marginVertical: 10, ...props.containerStyles}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#45485F',
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
          }}>
          {props?.label}
        </Text>
        {props.switchButton && (
          <View
            style={{
              backgroundColor: '#45485F',
              flexDirection: 'row',
              borderRadius: 9999,
              paddingHorizontal: 5,
              paddingVertical: 3,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: modeButton === 0 ? '#00ABE4' : '#45485F',
                paddingHorizontal: 12,
                borderRadius: 9999,
                marginRight: 2,
              }}
              onPress={() => {
                setModeButton(0);
                props.setSwitchModeType(props.switchButtonData[0] as string);
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}>
                {props?.switchButtonData[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: modeButton === 1 ? '#00ABE4' : '#45485F',
                paddingHorizontal: 12,
                borderRadius: 9999,
              }}
              onPress={() => {
                setModeButton(1);
                props.setSwitchModeType(props.switchButtonData[1] as string);
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}>
                {props?.switchButtonData[1]}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TextInput
        onChange={props.onChange}
        style={{
          ...props.inputStyles,
        }}
        placeholder={props.placehoder}
        placeholderTextColor={'rgba(0,0,0,0.4)'}
        autoFocus={props.autoFoucs}
        autoCapitalize={props.autoCapitalize}
        autoComplete={props.autoComplete}
        autoCorrect={props.autoCorrect}
        value={value}
        editable={!props.disabled}
        {...props.inputProps}
      />
    </View>
  );
};

Input.defaultProps = defaultProps;

export default Input;
