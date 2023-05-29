import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import TextInput from './TextInput';

type Props = {};

const RegisterViewScreen = (props: Props) => {
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(2);
  const [user, setUser] = React.useState({email: ''});
  const [error, setError] = React.useState('');

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'rgba(210, 244, 255, 0.25)'} />
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/Curve.png')}
          resizeMode="cover"
          style={{height: 140, paddingHorizontal: 20, paddingTop: 45}}>
          <Text
            style={{
              color: '#45485F',
              fontFamily: 'Poppins-Medium',
              fontSize: 24,
              height: 36,
            }}>
            Sign up
          </Text>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#0EB9F2',
                  borderRadius: 5,
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: index === 2 ? '#fff' : '#0EB9F2',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                    elevation: index === 2 ? 2 : 0,
                  }}
                  onPress={() => setIndex(2)}>
                  <Text
                    style={{
                      color: index === 2 ? '#0EB9F2' : '#fff',
                      fontFamily: 'Poppins-Medium',
                      height: 18,
                      fontSize: 12,
                    }}>
                    Individual
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: index === 3 ? '#fff' : '#0EB9F2',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                    elevation: index === 3 ? 2 : 0,
                  }}
                  onPress={() => setIndex(3)}>
                  <Text
                    style={{
                      color: index === 3 ? '#0EB9F2' : '#fff',
                      fontFamily: 'Poppins-Medium',
                      height: 18,
                      fontSize: 12,
                    }}>
                    Company
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={{marginVertical: 20, paddingHorizontal: 30}}>
          <TextInput
            label="Email Address"
            placehoder="Enter the Email"
            keyboardType="email-address"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                color: '#000',
                letterSpacing: 1,
              }}>
              Phone Number
            </Text>
            <PhoneInput
              containerStyle={{
                borderBottomWidth: 1,
                width: '100%',
                backgroundColor: '#fff',
              }}
              textInputStyle={{fontFamily: 'Poppins-Regular', fontSize: 14}}
              codeTextStyle={{fontFamily: 'Poppins-Regular', fontSize: 14}}
              textContainerStyle={{backgroundColor: '#fff'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
              flex: 1,
            }}>
            <TextInput
              label="Title"
              placehoder="Mr."
              containerStyles={{
                flex: 1,
                marginRight: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
            />
            <TextInput
              label="Occupation"
              placehoder=""
              containerStyles={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
            />
          </View>
          <TextInput
            label="First Name"
            placehoder="Enter the First Name"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
          />
          <TextInput
            label="Middle Name ( Optional )"
            placehoder="Enter the Middle Name"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
          />
          <TextInput
            label="Last Name"
            placehoder="Enter the Last Name"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
          />
          <TextInput
            label="Password"
            placehoder="Enter the Password"
            // keyboardType="visible-password"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
            secureTextEntry={true}
          />
          <TextInput
            label="Confirm password"
            placehoder="Enter the Confirm Password"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
            secureTextEntry={true}
          />

          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                letterSpacing: 1,
                color: 'red',
              }}>
              {error}
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 5,
                backgroundColor: 'rgba(0, 171, 228, 0.24)',
                marginRight: 20,
              }}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  letterSpacing: 0.6,
                  lineHeight: 15,
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 5,
                backgroundColor: '#00ABE4',
              }}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({name: 'Register-Address'}),
                );
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  letterSpacing: 0.6,
                  lineHeight: 15,
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterViewScreen;
