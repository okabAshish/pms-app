import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import OtpInputs from 'react-native-otp-inputs';

type Props = {};

const OTPVerification = (props: Props) => {
  const navigation = useNavigation();

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'rgba(210, 244, 255, 0.25)'} />
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/Curve.png')}
          resizeMode="cover"
          style={{height: 140, paddingHorizontal: 20, paddingTop: 45}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(69, 72, 95, 0.24)',
                padding: 4,
                borderRadius: 99999,
                marginRight: 30,
              }}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}>
              <View
                style={{
                  backgroundColor: '#45485F',
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faChevronLeft} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#45485F',
                fontFamily: 'Poppins-Medium',
                fontSize: 24,
                height: 36,
              }}>
              OTP Verification
            </Text>
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/Verification.png')}
              style={{width: 140, height: 140}}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,1)',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
                lineHeight: 24,
                textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              mobile verification has succesfully done
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.5)',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 18,
                textAlign: 'center',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod{' '}
            </Text>
          </View>

          <OtpInputs
            inputStyles={{
              backgroundColor: '#f5f5f5',
              width: 60,
              height: 60,
              textAlign: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#00ABE4',
              fontFamily: 'Poppins-Regular',
              color: '#000',
            }}
            handleChange={code => console.log(code)}
            numberOfInputs={4}
          />

          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: '#00ABE4',
              borderRadius: 4,
              shadowColor: 'rgba(0,0,0,0.4)',
              elevation: 3,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({name: 'New-Password'}),
              );
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Verify
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 20,
                  marginRight: 6,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'rgba(0,0,0,0.5)',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                in
              </Text>
            </View>
            <Text
              style={{
                color: 'rgba(0,0,0,1)',
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
              }}>
              00:24
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPVerification;
