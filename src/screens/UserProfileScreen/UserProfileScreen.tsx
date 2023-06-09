import {faChevronLeft, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Input from '../../components/Input/Input';
import {useGetUserProfileDetailMutation} from '../../features/auth/auth';
import {logOut} from '../../features/auth/authProfile';

type Props = {};

const UserProfileScreen = (props: Props) => {
  const navigation = useNavigation();
  const [getUserProfileDetail] = useGetUserProfileDetailMutation();
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const dispatch = useDispatch();

  const getUserProfileData = async () => {
    console.log('called');

    setLoading(true);
    try {
      await getUserProfileDetail({})
        .unwrap()
        .then(res => {
          if (res.success) {
            console.log(res);

            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res?.data?.user_details.email);
            setPhone(res?.data?.phone);
          }
        });
    } catch (err) {
      console.log(err, 'EERRRR');
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F7FEFF',
        paddingVertical: 14,
      }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
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
            {/* <Text
              style={{
                color: '#45485F',
                fontFamily: 'Poppins-Medium',
                fontSize: 24,
                height: 36,
              }}>
              Notification
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faEllipsisV} />
          </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 48,
          }}>
          <View
            style={{
              borderRadius: 9999,
              border: 1,
              borderColor: '#efefef',
              backgroundColor: '#efefef',
              zIndex: 999,
              padding: 40,
            }}>
            {/* <Image
              width={200}
              height={200}
              style={{
                borderRadius: 9999,
                border: 1,
                borderColor: '#efefef',
                zIndex: 999,
              }}
            /> */}
            <FontAwesomeIcon icon={faUser} size={90} />
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            backgroundColor: '#fff',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,

            paddingTop: 30,
            shadowColor: 'rgba(0,0,0,0.6)',
            borderColor: '#f3f3f3',
            marginTop: -40,
            zIndex: -1,
            paddingHorizontal: 30,
          }}>
          <Input
            label="First name"
            placehoder="Enter First name"
            value={firstName}
          />
          <Input
            label="Last name"
            placehoder="Enter Last name"
            value={lastName}
          />
          {email && (
            <Input
              label="Email Address"
              placehoder="Enter Email Address"
              value={email}
              disabled
            />
          )}

          {phone && (
            <Input
              label="Phone Number"
              placehoder="Enter Phone Number"
              value={phone}
              disabled
            />
          )}

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
              marginTop: 15,
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'New-Password',
                  params: {
                    name: 'Reset Password',
                    type: 'RESET',
                  },
                }),
              );
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Change Password
            </Text>
            <FontAwesomeIcon
              icon={faLock}
              color="#fff"
              style={{marginLeft: 10}}
              size={12}
            />
          </TouchableOpacity>

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
              marginTop: 15,
            }}
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('user');
              dispatch(logOut());
              navigation.dispatch(CommonActions.navigate({name: 'SignUp'}));
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
