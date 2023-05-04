/* eslint-disable react-native/no-inline-styles */
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
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
import {useLoginMutation} from '../../features/auth/auth';
import {setLoggedIn, setToken, setUser} from '../../features/auth/authProfile';
import {styles} from './SignUpScreen.module';
import TextInput from './TextInput';

const SignUpScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [index, setIndex] = React.useState(2);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const toggleCheckbox = () => setChecked(!checked);
  const [email, setEmail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [error, setError] = React.useState({msg: '', errorType: ''});

  const [login] = useLoginMutation();

  const onSignIn = async () => {
    let req = {username: email, password: password, role_id: index};

    setLoading(true);
    try {
      await login({body: req})
        .unwrap()
        .then(async res => {
          if (res?.success) {
            console.log(res);

            if (checked) {
              await AsyncStorage.setItem('token', res?.data?.token);
              await AsyncStorage.setItem('role_id', String.apply(index));
              let user = JSON.stringify(res.data?.user_detail);
              await AsyncStorage.setItem('user', user);
            }
            dispatch(setUser(res?.data?.user_detail));
            dispatch(setToken(res?.data?.token));
            dispatch(setLoggedIn(true));
            navigation.dispatch(CommonActions.navigate({name: 'Dashboard'}));
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
    <SafeAreaView>
      <StatusBar backgroundColor={'#E8F9FF'} />
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/ellipse.png')}
          resizeMode="stretch"
          style={styles.top_container}>
          <View style={styles.img_conatiner}>
            <Image
              source={require('../../assets/images/sign_up.png')}
              style={styles.sign_up_image}
            />
          </View>
        </ImageBackground>
        <View style={styles.bottom_container}>
          <View style={styles.changeContainer}>
            <View style={styles.changeSubContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    index === 2 ? '#fff' : 'rgba(90, 207, 246, 1)',

                  elevation: index === 2 ? 2 : 0,
                  ...styles.changeButtonContainer,
                }}
                onPress={() => setIndex(2)}>
                <Text
                  style={{
                    color: index === 2 ? 'rgba(90, 207, 246, 1)' : '#fff',
                    ...styles.changeButtonText,
                  }}>
                  Owner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    index === 3 ? '#fff' : 'rgba(90, 207, 246, 1)',
                  elevation: index === 3 ? 2 : 0,
                  ...styles.changeButtonContainer,
                }}
                onPress={() => setIndex(3)}>
                <Text
                  style={{
                    color: index === 3 ? 'rgba(90, 207, 246, 1)' : '#fff',
                    ...styles.changeButtonText,
                  }}>
                  Tenant
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <View>
                <Text style={styles.containerTitleText}>Sign In</Text>
              </View>
              <View style={styles.mt_10}>
                <TextInput
                  placeholder="Enter Email or Phone"
                  title="Phone Or Email Address"
                  tooltip="Enter your email or phone number"
                  value={email}
                  onChange={e => setEmail(e.nativeEvent.text)}
                />
                <TextInput
                  placeholder="Enter Password"
                  title="Password"
                  tooltip="Enter your password "
                  value={password}
                  onChange={e => setpassword(e.nativeEvent.text)}
                  secureTextEntry={true}
                  keyboardType="default"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 0,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={toggleCheckbox}
                      style={{
                        borderColor: checked ? 'rgba(90, 207, 246, 1)' : '#aaa',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 4,
                        marginRight: 4,
                        width: 22,
                        height: 22,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {checked && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          color="rgba(90, 207, 246, 1)"
                          size={12}
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'rgba(0, 41, 102, 0.5)',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Keep me Logged In
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: 'rgba(90, 207, 246, 1)',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Forget Password
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(90, 207, 246, 1)',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      shadowColor: 'rgba(0,0,0,0.35)',
                      borderRadius: 6,
                      paddingVertical: 6,
                    }}
                    onPress={() => onSignIn()}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#fff',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 12,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'center',
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'rgba(90, 207, 246, 1)',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Sign Up As A Owner
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
