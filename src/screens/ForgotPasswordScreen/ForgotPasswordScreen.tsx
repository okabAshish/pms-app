import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useForgotPasswordCheckUserMutation} from '../../features/auth/auth';
import Input from '../RegisterViewScreen/TextInput';

type Props = {};

const ForgotPasswordScreen = (props: Props) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = useState(false);

  const [checkUser] = useForgotPasswordCheckUserMutation();

  const handleCheckUser = async () => {
    setLoading(true);
    try {
      if (!email) {
        setError('Please enter Valid Email Or Phone Number');
        return;
      }

      await checkUser({
        body: {username: email, role_id: props.route?.params?.role_id},
      })
        .unwrap()
        .then(res => {
          // console.log(res);
          if (res.success) {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'OTP-Verification',
                params: {
                  email: email,
                  user_id: res.data.user_id,
                  role_id: props.route?.params?.role_id,
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
    setLoading(false);
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
              Reset Password
            </Text>
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/Email.png')}
              style={{width: 140, height: 140}}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
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

          <Input
            label="E-Mail Address / Phone Number"
            placehoder="Enter Email Address (OR) Phone number"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginTop: 30,
              marginBottom: 10,
            }}
            onChange={e => {
              setEmail(e.nativeEvent.text);
              setError('');
            }}
            value={email}
            errorMessage={error}
          />

          <TouchableOpacity
            style={{
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
              handleCheckUser();
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
