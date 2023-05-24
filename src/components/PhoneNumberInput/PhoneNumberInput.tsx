import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

type CountryCode = {
  callingCode: Array<string>;
  cca2: string;
  currency: Array<string>;
  flag: string;
  name: string;
  region: string;
  subregion: string;
};

type Props = {
  label: string;
  value: string;
  defaultValue: string;
  defaultCode: string;
  onTextChange: (e: string) => void;
  onCountryChange: (e: CountryCode) => void;
};

const defaultProps: Props = {
  label: 'Label',
  value: '',
  defaultValue: '',
  defaultCode: 'DM',
  onTextChange: () => {},
  onCountryChange: () => {},
};

const PhoneNumberInput = (props: Props) => {
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <View>
      <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
        {props.label}
      </Text>
      <PhoneInput
        ref={phoneInput}
        value={props.value}
        defaultValue={props.defaultValue}
        defaultCode={props.defaultCode}
        layout="second"
        onChangeText={text => props.onTextChange(text)}
        onChangeCountry={t => console.log(t)}
        containerStyle={{
          width: '100%',
          paddingHorizontal: 0,
          backgroundColor: '#efefef',
          borderRadius: 4,
        }}
        codeTextStyle={{
          fontSize: 12,
          color: '#000',
          paddingVertical: 0,
        }}
        textContainerStyle={{
          width: '100%',
          paddingVertical: 0,
          borderRadius: 4,
          backgroundColor: '#efefef',
        }}
        textInputStyle={{
          width: '100%',
          fontSize: 12,
          paddingVertical: 4,
          color: '#000',
        }}
      />
    </View>
  );
};

PhoneNumberInput.defaultProps = defaultProps;

export default PhoneNumberInput;
