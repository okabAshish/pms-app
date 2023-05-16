import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import {
  useGetAllCountriesMutation,
  useGetCityOfStateMutation,
  useGetStateOfCountryMutation,
} from '../../features/auth/auth';
import {setAddPropertySix} from '../../features/owner/ownerSlice';

type Props = {};

const AddPropertyAddressDetailsScreen = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [countries, setCountries] = useState();
  const [states, setStates] = useState();
  const [cities, setCities] = useState();

  const [countryValue, setCountryValue] = useState<Number>();
  const [stateValue, setStateValue] = useState<Number>();
  const [cityValue, setcityValue] = useState<Number>();

  const [address, setAddress] = useState({
    zip: '',
    address_one: '',
    address_two: '',
  });

  const [getAllCountries] = useGetAllCountriesMutation();
  const [getStateOfCountry] = useGetStateOfCountryMutation();
  const [getCityOfState] = useGetCityOfStateMutation();

  const getCountries = async () => {
    try {
      await getAllCountries({})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];
            for (let i = 0; i < res.data.length; i++) {
              a.push({
                label: res.data[i].name,
                value: res.data[i].id,
                id: res.data[i].id,
              });
            }
            setCountries(a);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getStates = async () => {
    try {
      await getStateOfCountry({param: String(countryValue)})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];
            for (let i = 0; i < res.data.length; i++) {
              a.push({
                label: res.data[i].name,
                value: res.data[i].id,
                id: res.data[i].id,
              });
            }
            setStates(a);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getCities = async () => {
    try {
      await getCityOfState({param: String(stateValue)})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];
            for (let i = 0; i < res.data.length; i++) {
              a.push({
                label: res.data[i].name,
                value: res.data[i].id,
                id: res.data[i].id,
              });
            }
            setCities(a);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const nextScreen = () => {
    try {
      if (countryValue === null || stateValue === null || cityValue === null) {
        throw (Error.name = `${key} is empty`);
      }
      for (const key in address) {
        if (
          address[key] === null ||
          address[key] === '' ||
          address[key] === undefined
        ) {
          throw (Error.name = `${key} is empty`);
        }
      }

      console.log('success');
      dispatch(
        setAddPropertySix({
          country_id: Number(countryValue),
          state_id: Number(stateValue),
          city_id: cityValue,
          zip: address.zip,
          address_one: address.address_one,
          address_two: address.address_two,
        }),
      );
      navigation.navigate('AddProperty-7');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <ScrollView
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
          //   flex: 2,
          minHeight: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#00ABE4',
              height: 32,
              width: 32,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 21,
              }}>
              6
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Address
          </Text>
        </View>

        <View style={{marginVertical: 20}}>
          <DropDown
            label="Country"
            datas={countries}
            dropDownHeight={400}
            onChange={v => {
              setCountryValue(Number(v));
              getStates();
            }}
            value={countryValue}
          />
          <DropDown
            label="State"
            datas={states}
            dropDownHeight={360}
            onChange={v => {
              setStateValue(Number(v));
              // getStates();
              getCities();
            }}
            value={stateValue}
          />
          <DropDown
            label="City"
            datas={cities}
            dropDownHeight={320}
            onChange={v => {
              setcityValue(Number(v));
              // getStates();
              // getCities();
            }}
            value={stateValue}
          />
          <Input
            label="Zip Code"
            onChange={e => setAddress({...address, zip: e.nativeEvent.text})}
            value={address.zip}
          />
          <Input
            label="Address 1"
            onChange={e =>
              setAddress({...address, address_one: e.nativeEvent.text})
            }
            value={address.address_one}
          />
          <Input
            label="Address 2"
            onChange={e =>
              setAddress({...address, address_two: e.nativeEvent.text})
            }
            value={address.address_two}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 24,
          }}>
          <View
            style={{
              marginVertical: 32,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#45485F',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon icon={faChevronLeft} size={12} color="#fff" />
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 5,
                  color: '#fff',
                }}>
                Previous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 24,
                paddingVertical: 5,
                backgroundColor: '#00ABE4',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => nextScreen()}>
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginRight: 5,
                  color: '#fff',
                }}>
                Next
              </Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPropertyAddressDetailsScreen;
