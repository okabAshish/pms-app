import React, {useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputAndroidProps,
  TextInputChangeEventData,
  TextInputProps,
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
  secureTextEntry: boolean;
  errorMessage: string;
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
  secureTextEntry: false,
  inputStyles: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#fff',
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
    <>
      <View style={{marginTop: 10, ...props.containerStyles}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              letterSpacing: 1,
            }}>
            {props?.label}
          </Text>
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
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          {...props.inputProps}
        />
      </View>
      {props.errorMessage && (
        <Text
          style={{
            fontFamily: 'Proppins-Medium',
            fontSize: 12,
            color: 'red',
            marginBottom: 5,
          }}>
          {props.errorMessage}
        </Text>
      )}
    </>
  );
};

Input.defaultProps = defaultProps;

export default Input;
