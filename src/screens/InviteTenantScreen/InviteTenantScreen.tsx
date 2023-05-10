import {useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import RadioButton from '../../components/RadioButton/RadioButton';

type Props = {};

const InviteTenantScreen = (props: Props) => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <StatusBar backgroundColor={'#45485F'} barStyle="light-content" />

      <KeyboardAwareScrollView
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Send Invite
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <RadioButton
            labels={['Is existing tenant']}
            onChange={val => {
              console.log(val);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#000'}}>
              Phone
            </Text>
            <Switch
              value={checked}
              onValueChange={value => setChecked(value)}
              style={{marginHorizontal: 10}}
            />
            <Text style={{fontFamily: 'Poppins-Regular', color: '#000'}}>
              Email
            </Text>
          </View>
          <Input
            switchButton={false}
            onChange={e => {}}
            placehoder="Enter email"
            label="Tenant Email"
          />
          <DropDown
            label="Property Type"
            // datas={propertyTypeList}
            onChange={value => {
              console.log(value);
            }}
          />
        </KeyboardAwareScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              marginVertical: 32,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 24,
                paddingVertical: 5,
                backgroundColor: '#20c997',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginRight: 5,
                  color: '#fff',
                }}>
                Send Invitation
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default InviteTenantScreen;
