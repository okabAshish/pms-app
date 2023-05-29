import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
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
import Input from '../RegisterViewScreen/TextInput';

type Props = {};

const NewPasswordScreen = (props: Props) => {
  const navigation = useNavigation();
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
              navigation.dispatch(CommonActions.navigate({name: 'SignUp'}));
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
