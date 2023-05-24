import {CommonActions, useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import React, {useEffect, useState} from 'react';
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
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import MultiSelectDropDown from '../../components/MultiSelect/MultiSelect';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import RadioButton from '../../components/RadioButton/RadioButton';
import {
  useSendTenantInvitationMutation,
  useTenantInvitationDropdownMutation,
} from '../../features/auth/owner';

type Props = {};

const InviteTenantScreen = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const [tenantExist, setTenantExist] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState({
    phone: '',
    phone_code: '1',
    flag: 'US',
  });

  const [tenantDropdownList, setTenantDropDownList] = useState([]);
  const [propertyDropdownList, setPropertyDropDownList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dropdownData] = useTenantInvitationDropdownMutation();
  const [sendInvite] = useSendTenantInvitationMutation();

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const navigation = useNavigation();

  const getAllDatas = async () => {
    setLoading(true);
    try {
      await dropdownData({})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];
            let b = [];
            for (let i = 0; i < res.data.tenant_list.length; i++) {
              a.push({
                label:
                  res.data.tenant_list[i].first_name +
                  ' ' +
                  res.data.tenant_list[i].last_name +
                  ` (${res.data.tenant_list[i].email} / ${res.data.tenant_list[i].phone} )`,
                value: res.data.tenant_list[i].email,
                id: res.data.tenant_list[i].id,
              });
            }
            setTenantDropDownList(a);

            for (let j = 0; j < res.data.property_list.length; j++) {
              b.push({
                label: res.data.property_list[j].property_name,
                value: res.data.property_list[j].id,
                id: res.data.property_list[j].id,
              });
            }
            setPropertyDropDownList(b);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleTenantInvite = async () => {
    setLoading(true);

    try {
      await sendInvite({
        is_existing_tenant: tenantExist ? '1' : '0',
        invitation_type: checked ? 'email' : 'phone',
        property_id: selectedProperty,
        selected_tenant_email: selectedTenant,
        email: email,
        phone: phone.phone,
        phone_code: phone.phone_code,
        flag: phone.flag,
      })
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            console.log(res);
            navigation.dispatch(
              CommonActions.navigate({name: 'Invitation-List'}),
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllDatas();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

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
              if (val === 0) {
                setTenantExist(true);
              } else {
                setTenantExist(false);
              }
            }}
          />
          {tenantExist ? (
            <MultiSelectDropDown
              label="Select Tenant"
              datas={tenantDropdownList}
              search
              onChange={value => {
                console.log(value);
                setSelectedTenant(value);
              }}
              value={selectedTenant}
              maxHeight={400}
            />
          ) : (
            <>
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
              {checked ? (
                <Input
                  switchButton={false}
                  onChange={e => {
                    setEmail(e.nativeEvent.text);
                  }}
                  placehoder="Enter Email"
                  label="Tenant Email"
                  keyboardType="email-address"
                />
              ) : (
                <PhoneNumberInput
                  label="Tenant Phone"
                  value=""
                  defaultValue=""
                  defaultCode="US"
                  onCountryChange={e => {
                    setPhone({
                      ...phone,
                      phone_code: e.callingCode[0],
                      flag: e.cca2[0],
                    });
                  }}
                  onTextChange={number => setPhone({...phone, phone: number})}
                />
              )}
            </>
          )}
          <DropDown
            label="Select Property"
            search
            datas={propertyDropdownList}
            onChange={value => {
              console.log(value);
              setSelectedProperty(value);
            }}
            dropDownHeight={320}
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
              onPress={() => {
                handleTenantInvite();
              }}>
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
