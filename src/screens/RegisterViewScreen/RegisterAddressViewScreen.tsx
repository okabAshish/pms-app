import {useNavigation} from '@react-navigation/native';
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

import TextInput from './TextInput';

type Props = {};

const RegisterAddressViewScreen = (props: Props) => {
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
        </ImageBackground>
        <View style={{marginTop: 50, paddingHorizontal: 30}}>
          <TextInput
            label="Address 2 (Optional)"
            placehoder="Enter the Address"
            containerStyles={{
              flex: 1,
              marginBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#000',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
              flex: 1,
            }}>
            <TextInput
              label="Nationality"
              placehoder="Enter the Nationality"
              containerStyles={{
                flex: 1,
                marginRight: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
            />
            <TextInput
              label="State"
              placehoder="Enter the State"
              containerStyles={{
                flex: 1,

                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
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
              label="City"
              placehoder="Enter the City"
              containerStyles={{
                flex: 1,
                marginRight: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
            />
            <TextInput
              label="Zip"
              placehoder="Enter the Zip"
              containerStyles={{
                flex: 1,

                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
            />
          </View>

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
                // navigation.dispatch(
                //   CommonActions.navigate({name: 'Register-Address'}),
                // );
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  letterSpacing: 0.6,
                  lineHeight: 15,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterAddressViewScreen;
