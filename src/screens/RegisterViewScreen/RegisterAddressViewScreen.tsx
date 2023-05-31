import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import DropDown from '../../components/DropDown/DropDown';
import {StateListResponse, CityListResponse} from '../../features/types';
import {useGetStateListMutation, useGetCityListMutation} from '../../features/auth/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


type Props = {};

const RegisterAddressViewScreen = (props: Props) => {
  const oldRegister=useSelector<RootState>(state=>state.auth)
  const navigation = useNavigation();
  const [getStateList] = useGetStateListMutation();
  const [getCityList] = useGetCityListMutation();
  
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = React.useState(2);
  const [user, setUser] = React.useState({email: ''});
  const [error, setError] = React.useState('');
  const [countryList, setCountryList] = React.useState([{
    label: 'United State',
    id: 233,
    value: 233
  }]);
  const [stateList, setStateList] = React.useState([]);
  const [cityList, setCityList] = React.useState([]);
  const [addressData, setAddressData] = React.useState({
    address: '',
    address_two: '',
    countryId: 233,
    state: 0,
    city: 0,
    zip: ''
  });
  console.log(oldRegister.register);
  const getStateListData = async() => {
    setLoading(true);
    try {
      await getStateList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            const stateListContent: StateListResponse = res?.data;
            const stateDropdownData: any = [];
            for (let i = 0; i < stateListContent.length; i++) {
              stateDropdownData[i] = {
                label: stateListContent[i].name,
                id: stateListContent[i].id,
                value: stateListContent[i].id,
              };
            }
            setStateList(stateDropdownData);
          }
        });
    } catch (err) {
      // dispatch(setError({error: true, message: err}));
      // setTimeout(() => {
      //   dispatch(setError({error: false, message: ''}));
      // }, 350);
      console.log(err, 'EERRRR');
    }
    setLoading(false);
  }

  const getCityListData = async id => {
    console.log('id',id);
    
    setLoading(true);
    try {
      await getCityList({id: id})
        .unwrap()
        .then(res => {
          if (res.success) {
            const cityListContent: StateListResponse = res?.data;
            const cityDropdownData: any = [];
            for (let i = 0; i < cityListContent.length; i++) {
              cityDropdownData[i] = {
                label: cityListContent[i].name,
                id: cityListContent[i].id,
                value: cityListContent[i].id,
              };
            }
            setCityList(cityDropdownData);
          }
        });
    } catch (err) {
      // dispatch(setError({error: true, message: err}));
      // setTimeout(() => {
      //   dispatch(setError({error: false, message: ''}));
      // }, 350);
      console.log(err, 'EERRRR');
    }
    setLoading(false);
  }

  const submitRegisterForm = () => {
    console.log('called again');
    try {
      for (const key in addressData) {
        if (
          (addressData[key] === null ||
          addressData[key] === '' ||
          addressData[key] === undefined) &&
          key !== 'address_two'
        ) {
          throw (Error.name = `${key} is empty`);
        }
      }
      console.log(addressData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStateListData();
  }, []);

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
            label="Address 1"
            placehoder="Enter the Address"
            containerStyles={{
              flex: 1,
              marginBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#000',
            }}
            value={addressData.address}
            onChange={e => setAddressData({...addressData, address: e.nativeEvent.text})}
          />
          <TextInput
            label="Address 2 (Optional)"
            placehoder="Enter the Address"
            containerStyles={{
              flex: 1,
              marginBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#000',
            }}
            value={addressData.address_two}
            onChange={e => setAddressData({...addressData, address_two: e.nativeEvent.text})}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
              flex: 1,
            }}>
            <DropDown
              datas={countryList}
              value={countryList.find(
                val => val.id == 233,
              )}
              label="Nationality"
              containerStyles={{
                flex: 1,
                marginRight: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}
              value="United State"
            />
            <DropDown
              datas={stateList}
              onChange={val => {
                setAddressData({...addressData, state: val});
                getCityListData(val)
              }} 
              label="State"
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
            <DropDown
              datas={cityList}
              onChange={val => {
                setAddressData({...addressData, city: val});
              }}
              label="City"
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
              value={addressData.zip}
              onChange={e => setAddressData({...addressData, zip: e.nativeEvent.text})}
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
                submitRegisterForm()
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
