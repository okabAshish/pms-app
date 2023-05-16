import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../components/DropDown/DropDown';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import {
  useGetOwnerPropertyDetailsMutation,
  useGetOwnerPropertyListMutation,
} from '../../features/auth/owner';
import {setPropertyId as setP} from '../../features/contract/contractSlice';
import {OwnerPropertyDetailsData} from '../../features/ownerTypes';
import {RootState} from '../../store';

type Props = {};

const AddNewContractScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contract = useSelector<RootState>(state => state.contract);

  const [propertyList, setPropertyList] = useState([]);
  const [propertyDetails, setPropertyDetails] =
    useState<OwnerPropertyDetailsData>({});
  const [property_id, setPropertyId] = useState(contract?.property_id);

  const [getOwnerPropertyList] = useGetOwnerPropertyListMutation();
  const [getOwnerPropertyDetails] = useGetOwnerPropertyDetailsMutation();

  console.log(propertyDetails);

  const getProperties = async () => {
    try {
      await getOwnerPropertyList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];

            for (let i = 0; i < res.data.length; i++) {
              a.push({
                id: res.data[i].id,
                label: res.data[i].property_name,
                value: res.data[i].id,
              });
            }

            setPropertyList(a);
            // setPage(page + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getPropertyDetails = async (val: number) => {
    try {
      await getOwnerPropertyDetails({param: val})
        .unwrap()
        .then(res => {
          if (res.success) {
            setPropertyDetails(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProperties();
    dispatch(setP({property_id: 0}));
  }, []);

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
              1
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Select your property
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#45485F',
                paddingHorizontal: 32,
                paddingVertical: 5,
                borderRadius: 9999,
              }}
              onPress={() => navigation.navigate('AddProperty')}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                Add New Property +
              </Text>
            </TouchableOpacity>
          </View>
          <DropDown
            label="Property Type"
            datas={propertyList}
            search
            value={property_id}
            onChange={value => {
              console.log(value);
              setPropertyId(Number(value));
              getPropertyDetails(Number(value));
            }}
          />
          <PropertyCard
            property_id={`PROP_00000000${
              propertyDetails?.id ? propertyDetails?.id : 0
            }`}
            building_name={propertyDetails.property_name}
            rented={propertyDetails?.rented === 1 ? true : false}
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
                backgroundColor: '#00ABE4',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                if (property_id !== 0) {
                  dispatch(setP({property_id: property_id}));
                  navigation.navigate('AddContract-2');
                }
              }}>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddNewContractScreen;
