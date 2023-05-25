import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import CustomAlertModal from '../../container/CustomAlertModal/CustomAlertModal';
import {
  useGetOwnerPropertyDetailsMutation,
  useGetPropertyTypeMutation,
} from '../../features/auth/owner';
import {setError} from '../../features/error/error';
import {
  setAddPropertyOne,
  setAllPropertyData,
} from '../../features/owner/ownerSlice';
import {PropertyTypeListData} from '../../features/ownerTypes';

const DEVICE_HEIGHT = Dimensions.get('window').height;

type Props = {
  route: {
    params: {
      id: string;
      type: string;
    };
  };
};

let arr = ['Sq ft.', 'Meter'];

const AddPropertyScreen = (props: Props) => {
  const navigation = useNavigation();
  const error = useSelector(state => state?.error);
  const owner = useSelector(state => state?.owner);

  const dispatch = useDispatch();

  //console.log(error);

  const [propertyTypeList, setPropertyTypeList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [propertyScreenType, setPropertyScreenType] = useState(
    props?.route.params.type,
  );
  // const [title, setTitle] = useState('');
  // const [type, setType] = useState('');
  // const [size, setSize] = useState('');
  // const [builtYear, setBuiltYear] = useState('');
  // const [hoeFee, setHoeFee] = useState('');
  // const [feeDuration, setFeeDuration] = useState('');

  let [property, setProperty] = useState({
    title: '',
    type: '',
    size: '',
    sizeType: 'Sq ft.',
    year: '',
    amount: '',
    duration: '',
  });

  const [getPropertyType] = useGetPropertyTypeMutation();
  const [OwnerPropertyDetails] = useGetOwnerPropertyDetailsMutation();

  console.log(propertyScreenType);

  const propertyType = async () => {
    setLoading(true);
    try {
      // setLoading(true);
      await getPropertyType({})
        .unwrap()
        .then(res => {
          console.log(res, 'PROPERTY TYPE RES');

          if (res.success) {
            //setPropertyTypeList(res?.data)

            const proertyTypeList: PropertyTypeListData = res?.data;
            const propertyDropdownData: any = [];
            for (let i = 0; i < proertyTypeList.length; i++) {
              propertyDropdownData[i] = {
                label: proertyTypeList[i].name,
                id: proertyTypeList[i].id,
                value: proertyTypeList[i].id,
              };
            }
            setPropertyTypeList(propertyDropdownData);

            if (propertyScreenType === 'Edit') {
              getPropertyData();
            }
          }
        });
      // setLoading(true);
    } catch (err) {
      dispatch(setError({error: true, message: err}));
      setTimeout(() => {
        dispatch(setError({error: false, message: ''}));
      }, 350);
      console.log(err, 'EERRRR');
    }
    setLoading(false);
  };

  const getPropertyData = async () => {
    setLoading(true);
    //console.log(props?.route?.params?.id, 'xxx');
    try {
      await OwnerPropertyDetails({param: props?.route?.params?.id})
        .unwrap()
        .then(res => {
          console.log(res, 'Weroing');

          if (res.success) {
            dispatch(
              setAllPropertyData({
                property_name: res.data.property_name,
                property_type_id: res.data.property_type_id,
                property_size: res.data.property_size,
                property_size_type: res.data.property_size_type,
                property_built_year: res.data.property_built_year,
                hoa_fee: res.data.hoa_fee,
                hoa_fee_type: res.data.hoa_fee_type,
                no_of_bedrooms: res.data.no_of_bedrooms,
                no_of_bathroom: res.data.no_of_bathroom,
                furnishing_type_id: res.data.furnishing_type_id,
                property_furnishing_detail: res.data.furnishing_details,
                property_amenities: res.data.property_amenities,
                balcony_terrace: res.data.balcony_terrace,
                parking_available: res.data.parking_available,
                no_of_parking: res.data.no_of_parking,
                parking_type: res.data.parking_type_name,
                country_id: res.data.country_id,
                state_id: res.data.state_id,
                city_id: res.data.city_id,
                zip: res.data.zip,
                address_one: res.data.address_one,
                address_two: res.data.address_two,
                property_images: res.data.property_images,
              }),
            );

            setProperty({
              title: res.data.property_name,
              type: String(res.data.property_type_id),
              size: String(res.data.property_size),
              sizeType: res.data.property_size_type == 0 ? 'Sq ft.' : 'Meter',
              year: res.data.property_built_year,
              amount: res.data.hoa_fee,
              duration: res.data.hoa_fee_type,
            });
          }
        });
    } catch (err) {
      console.log(err, '<><>');
    }
    setLoading(false);
  };

  useEffect(() => {
    propertyType();
  }, []);

  console.log(property);

  const nextScreen = () => {
    setLoading(true);
    try {
      for (const key in property) {
        if (
          property[key] === null ||
          property[key] === '' ||
          property[key] === undefined
        ) {
          throw (Error.name = `${key} is empty`);
        }
      }
      console.log('success');

      dispatch(
        setAddPropertyOne({
          property_name: String(property.title),
          property_type_id: String(property.type),
          property_size: Number(property.size),
          property_size_type: arr.indexOf(property.sizeType),
          property_built_year: String(property.year),
          hoa_fee: Number(property.amount),
          hoa_fee_type: String(property.duration),
        }),
      );

      if (props.route.params.type === 'Add') {
        navigation.navigate('AddProperty-2', {type: 'Add'});
      } else {
        navigation.navigate('AddProperty-2', {
          type: 'Edit',
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  console.log(property);

  if (error?.error) {
    return <CustomAlertModal />;
  }

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
            Property
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <Input
            switchButton={false}
            onChange={e =>
              setProperty({...property, title: e.nativeEvent.text})
            }
            placehoder="Enter a nick name of the property"
            label="Property Title (Nick Name)"
            value={property.title}
          />
          <DropDown
            label="Property Type"
            datas={propertyTypeList}
            onChange={val => {
              setProperty({...property, type: val});
            }}
            value={propertyTypeList.find(
              val => String(val.id) === property.type,
            )}
          />
          <Input
            switchButtonData={arr}
            switchButton={true}
            setSwitchModeType={val => setProperty({...property, sizeType: val})}
            onChange={e => setProperty({...property, size: e.nativeEvent.text})}
            placehoder="Enter Property Size"
            label="Property Size"
            keyboardType="number-pad"
            value={property.size}
          />
          <Input
            switchButton={false}
            onChange={e => setProperty({...property, year: e.nativeEvent.text})}
            placehoder="Enter Property Year"
            label="Property Built Year"
            value={property.year}
            keyboardType="numeric"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Input
              switchButton={false}
              onChange={e =>
                setProperty({...property, amount: e.nativeEvent.text})
              }
              placehoder="Enter HOA Fee Amount"
              label="HOA Fee"
              containerStyles={{flex: 2, marginRight: 20}}
              value={property.amount}
              keyboardType="numeric"
            />
            <DropDown
              label="Fee Duration"
              value={property.duration}
              onChange={val => {
                setProperty({...property, duration: val});
              }}
              containerStyles={{flex: 1}}
              dropDownHeight={100}
              datas={[
                {id: 1, label: 'Monthly', value: 'monthly'},
                {id: 2, label: 'Yearly', value: 'yearly'},
              ]}
            />
          </View>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddPropertyScreen;
