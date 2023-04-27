/* eslint-disable react-native/no-inline-styles */
import { CheckBox } from '@rneui/base';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './SignUpScreen.module';
import TextInput from './TextInput';

const DEVICE_WIDTH = Dimensions.get('screen').width

type Props = {};

const SignUpScreen = (props: Props) => {
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);


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
                    index === 0 ? '#fff' : 'rgba(90, 207, 246, 1)',

                  elevation: index === 0 ? 2 : 0,
                  ...styles.changeButtonContainer,
                }}
                onPress={() => setIndex(0)}>
                <Text
                  style={{
                    color: index === 0 ? 'rgba(90, 207, 246, 1)' : '#fff',
                    ...styles.changeButtonText,
                  }}>
                  Owner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    index === 1 ? '#fff' : 'rgba(90, 207, 246, 1)',
                  elevation: index === 1 ? 2 : 0,
                  ...styles.changeButtonContainer,
                }}
                onPress={() => setIndex(1)}>
                <Text
                  style={{
                    color: index === 1 ? 'rgba(90, 207, 246, 1)' : '#fff',
                    ...styles.changeButtonText,
                  }}>
                  Tenant
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: -30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >


            <View style={{
              backgroundColor: '#efefef', width: DEVICE_WIDTH - 80, minHeight: 100, borderRadius: 12, shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.00,
              elevation: 3,
              shadowColor: 'rgba(0,0,0,0.65)', marginBottom: 10, paddingVertical: 24, paddingHorizontal: 20, borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.01)'
            }} >
              <View>
                <Text style={{ fontSize: 24, color: '#45485F', fontWeight: 500, height: 36 }} >Sign In</Text>
              </View>
              <View style={{ marginTop: 10 }}>

                <TextInput placeholder='Enter Email or Phone' title='Phone Or Email Address' tooltip='Enter your email or phone number' />
                <TextInput style={{ marginTop: 15 }} placeholder='Enter Password' title='Password' tooltip='Enter your password ' />
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <CheckBox
                      checked={checked}
                      onPress={toggleCheckbox}
                      iconType="material-community"
                      checkedIcon="checkbox-outline"
                      uncheckedIcon={'checkbox-blank-outline'}
                    />
                    <Text>Keep me Logged In</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={{ color: 'rgba(90, 207, 246, 1)' }} >Forgot Password</Text>
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
