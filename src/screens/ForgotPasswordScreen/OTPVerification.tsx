import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
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
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {
  useForgotPasswordCheckUserMutation,
  useForgotPasswordVerifyUserMutation,
} from '../../features/auth/auth';

type Props = {};

const OTPVerification = (props: Props) => {
  const navigation = useNavigation();

  const [time, setTime] = useState(10);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setError] = React.useState('');
  const [OTP, setOTP] = React.useState('');

  let otpInput = useRef(null);

  const subtractTimer = () => {
    setInterval(() => {
      setTime(time - 1);
    }, 1000);
  };

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  const [checkUser] = useForgotPasswordCheckUserMutation();
  const [verifyUser] = useForgotPasswordVerifyUserMutation();

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  const handleCheckUser = async () => {
    console.log('run');
    setLoading(true);
    const {email, role_id} = props.route?.params;
    try {
      if (!email) {
        setError('Please enter Valid Email Or Phone Number');
        return;
      }

      await checkUser({
        body: {username: email, role_id: role_id},
      })
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
          } else {
            setError(res.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    console.log('runnn');
    try {
      const {email, user_id, role_id} = props.route?.params;

      if (!OTP) {
        setError('Not a Valid Otp');
      }

      await verifyUser({
        body: {user_id: user_id, otp: OTP},
      })
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'New-Password',
                params: {
                  user_id: user_id,
                },
              }),
            );
          } else {
            setError(res.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <LoadingModal />;
  }

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
            handleChange={code => {
              setOTP(code);
              setError('');
            }}
            numberOfInputs={4}
          />

          {errorMessage && (
            <Text
              style={{
                fontFamily: 'Proppins-Medium',
                fontSize: 12,
                color: 'red',
                marginTop: 15,
              }}>
              {errorMessage}
            </Text>
          )}

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
              handleVerifyOtp();
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
                }}
                onPress={() => {
                  handleCheckUser();
                }}
                disabled={time > 0}>
                <Text
                  style={{
                    color: time > 0 ? 'gray' : 'red',
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
              {time > 0 && dayjs().second(time).format('00:ss')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPVerification;
