import {
  faChevronLeft,
  faEllipsisV,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Input from '../../components/Input/Input';

type Props = {};

const UserProfileScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
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
            }}>
            <Image
              width={200}
              height={200}
              style={{
                borderRadius: 9999,
                border: 1,
                borderColor: '#efefef',
                zIndex: 999,
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            elevation: 2,
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingTop: 30,
            shadowColor: 'rgba(0,0,0,0.6)',
            borderColor: '#f3f3f3',
            marginTop: -40,
            zIndex: -1,
            paddingHorizontal: 30,
          }}>
          <Input label="First name" placehoder="Enter First name" />
          <Input label="Last name" placehoder="Enter First name" />
          <Input label="Email Address" placehoder="Enter First name" />

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
                CommonActions.navigate({name: 'OTP-Verification'}),
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
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({name: 'OTP-Verification'}),
              );
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