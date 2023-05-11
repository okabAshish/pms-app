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
import CustomAlertModal from '../../container/CustomAlertModal/CustomAlertModal';
import {useGetPropertyTypeMutation} from '../../features/auth/owner';
import {setError} from '../../features/error/error';
import {setAddPropertyOne} from '../../features/owner/ownerSlice';
import {PropertyTypeListData} from '../../features/ownerTypes';

const DEVICE_HEIGHT = Dimensions.get('window').height;

type Props = {};

const AddPropertyScreen = (props: Props) => {
  const navigation = useNavigation();
  const error = useSelector(state => state.error);
  const owner = useSelector(state => state.owner);

  const dispatch = useDispatch();

  //console.log(error);

  const [propertyTypeList, setPropertyTypeList] = useState([]);
  // const [title, setTitle] = useState('');
  // const [type, setType] = useState('');
  // const [size, setSize] = useState('');
  // const [builtYear, setBuiltYear] = useState('');
  // const [hoeFee, setHoeFee] = useState('');
  // const [feeDuration, setFeeDuration] = useState('');

  let [property, setProperty] = useState({
    title: '',
    type: '',
    size: '0',
    sizeType: '',
    year: '0',
    amount: '0.0',
    duration: '',
  });

  const [getPropertyType] = useGetPropertyTypeMutation();

  console.log(owner);

  const propertyType = async () => {
    try {
      await getPropertyType({})
        .unwrap()
        .then(res => {
          // console.log(res);

          if (res.success) {
            //setPropertyTypeList(res?.data);
            const proertyTypeList: PropertyTypeListData = res?.data;
            const propertyDropdownData: any = [];
            for (let i = 0; i < proertyTypeList.length; i++) {
              propertyDropdownData[i] = {
                label: proertyTypeList[i].name,
                id: proertyTypeList[i].id,
                value: proertyTypeList[i].name,
              };
              setPropertyTypeList(propertyDropdownData);
            }
          }
        });
    } catch (err) {
      dispatch(setError({error: true, message: err}));
      setTimeout(() => {
        dispatch(setError({error: false, message: ''}));
      }, 350);
      console.log(err);
    }
  };

  useEffect(() => {
    propertyType();
  }, []);

  const nextScreen = () => {
    if (
      Object.values(property).every(
        x => x === null || x === '' || x === undefined || x === 0,
      )
    ) {
      console.log('Error');
    } else {
      
      dispatch(
        setAddPropertyOne({
          property_name: property.title,
          property_type_id: property.type,
          property_size: String(property.size),
          property_size_type: property.sizeType,
          property_built_year: String(property.year),
          hoa_fee: String(property.amount),
          hoa_fee_type: property.duration,
        }),
      );
      navigation.navigate('AddProperty-2');
    }
  };

  if (error?.error) {
    return <CustomAlertModal />;
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

          />
          <DropDown
            label="Property Type"
            datas={propertyTypeList}
            onChange={val => {
              setProperty({...property, type: val})
            }}
          />
          <Input
            switchButtonData={['Sq ft.', 'Meter']}
            switchButton={true}
            setSwitchModeType={val => setProperty({...property, sizeType: val})}
            onChange={e =>
              setProperty({...property, size: e.nativeEvent.text})
            }
            placehoder="Enter Property Size"
            label="Property Size"
            keyboardType="number-pad"
          />
          <Input
            switchButton={false}
            onChange={e =>
              setProperty({...property, year: e.nativeEvent.text})
            }
            placehoder="Enter Property Year"
            label="Property Built Year"
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
            />
            <DropDown
              label="Fee Duration"
              value={property.type}
              onChange={val => {
                setProperty({...property, duration: val})
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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
