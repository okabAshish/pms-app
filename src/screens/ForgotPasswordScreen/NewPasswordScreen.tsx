import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {useDispatch} from 'react-redux';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {
  useForgotPasswordNewPasswordMutation,
  useResetPasswordNewPasswordMutation,
} from '../../features/auth/auth';
import {logOut} from '../../features/auth/authProfile';
import Input from '../RegisterViewScreen/TextInput';

type Props = {};

const NewPasswordScreen = (props: Props) => {
  const {type, name} = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [newPassword] = useForgotPasswordNewPasswordMutation();
  const [resetPassword] = useResetPasswordNewPasswordMutation();

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const {email, user_id, role_id} = props.route?.params;

      if (!password || !confirmPassword) {
        setError('Password is Empty');
      } else if (password !== confirmPassword) {
        setError('Password do not match');
      }

      await newPassword({
        body: {
          user_id: user_id,
          password: password,
          confirm_password: confirmPassword,
        },
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            navigation.dispatch(CommonActions.navigate({name: 'SignUp'}));
          }
        });
    } catch (err) {
      console.log(err?.data.data);
      setErrorMessage(err?.data?.message);
    }
    setLoading(false);
  };

  const handleResetpassword = async () => {
    setLoading(true);
    try {
      if (!password || !confirmPassword) {
        setError('Password is Empty');
      } else if (password !== confirmPassword) {
        setError('Password do not match');
      }

      await resetPassword({
        body: {
          password: password,
          confirm_password: confirmPassword,
        },
      })
        .unwrap()
        .then(async res => {
          if (res.success) {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            dispatch(logOut());
            navigation.dispatch(CommonActions.navigate({name: 'SignUp'}));
          }
        });
    } catch (err) {
      console.log(err?.data.data);
      setErrorMessage(err?.data?.message);
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
              {name}
            </Text>
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/Password.png')}
              style={{width: 140, height: 140}}
            />
          </View>
          <Input
            secureTextEntry
            label="New password"
            placehoder="Enter the New Password"
            containerStyles={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#000',
              marginVertical: 30,
            }}
            onChange={e => {
              setError('');
              setPassword(e.nativeEvent.text);
            }}
            errorMessage={!password ? error : ''}
          />
          <Input
            secureTextEntry
            label="Confirm password"
            placehoder="Enter the Confirm Password"
            containerStyles={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#000',
              marginVertical: 30,
            }}
            onChange={e => {
              setError('');
              setConfirmPassword(e.nativeEvent.text);
            }}
            errorMessage={!confirmPassword ? error : ''}
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
              if (type === 'FORGOT') {
                handleForgotPassword();
              } else {
                handleResetpassword();
              }
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
