/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Tooltip} from '@rneui/base';
import React from 'react';
import {
  TextInput as Input,
  InputModeOptions,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheetProperties,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';

type Props = {
  placeholder?: string;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  autoCapitalize: string;
  value: any;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  multiline?: boolean;
  title?: string;
  tooltip?: string;
  style?: StyleSheetProperties;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  keyboardTypeOption?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  error?: string;
};

const defaultProps: Props = {
  placeholder: 'Enter Email or Phone',
  autoCorrect: false,
  autoFocus: false,
  multiline: false,
  secureTextEntry: false,
  autoCapitalize: 'none',
  value: undefined,
  onChange: function (e: NativeSyntheticEvent<TextInputChangeEventData>): void {
    throw new Error('Function not implemented.' + e.nativeEvent.text);
  },
  title: 'Phone Or Email Address',
  tooltip: 'Enter Email or Phone',
  keyboardType: 'default',
  error: '',
};

const TextInput = (props: Props) => {
  props = {...defaultProps, ...props};

  const [visible, setVisible] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  //   console.log(focus);
  return (
    <View style={props.style}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 12,
            color: '#000',
            fontWeight: 400,
            height: 18,
            fontFamily: 'Poppins-Regular',
          }}>
          {props.title}
        </Text>
        <Tooltip
          containerStyle={{marginTop: 22, marginLeft: -10, width: 200}}
          backgroundColor={'#fff'}
          visible={visible}
          onOpen={() => setVisible(true)}
          onClose={() => setVisible(false)}
          popover={
            <Text
              style={{
                flexWrap: 'wrap',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}>
              {props.tooltip}
            </Text>
          }
          withPointer={false}>
          <View
            style={{
              borderColor: 'rgba(90, 207, 246, 1)',
              borderRadius: 9999,
              padding: 2,
              borderWidth: 1,
              marginLeft: 3,
            }}>
            <FontAwesomeIcon icon={faInfo} size={6} color="#64A5FF" />
          </View>
        </Tooltip>
      </View>
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoFocus={props.autoFocus}
        value={props.value}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        onChange={props.onChange}
        style={{
          borderBottomWidth: 1,
          borderRadius: 0,
          borderColor: focus ? '#45485F' : '#aaa',
          paddingHorizontal: 10,
          paddingVertical: 5,
          fontSize: 14,
        }}
        inputMode={props.inputMode}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        secureTextEntry={props.secureTextEntry}
      />
      <Text style={{fontSize: 10, color: 'red', fontFamily: 'Poppins-Regular'}}>
        {props.error}
      </Text>
    </View>
  );
};

export default TextInput;
