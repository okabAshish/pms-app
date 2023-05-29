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
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import RadioButton from '../../components/RadioButton/RadioButton';
import {useGetParkingTypeListMutation} from '../../features/auth/owner';
import {setAddPropertyFive} from '../../features/owner/ownerSlice';
import {AddPropertyInputData} from '../../features/ownerTypes';
import {RootState} from '../../store';

type Props = {};

const AddPropertyAddionalDetailsScreen = (props: Props) => {
  const property: AddPropertyInputData = useSelector<RootState>(
    state => state.owner,
  );

  const dispatch = useDispatch();

  const [parkingTypes, setParkingTypes] = useState([]);
  const [balconyAvaliablity, setBalconyAvaliablity] = useState(0);
  const [parkingAvaliablity, setParkingAvaliablity] = useState(0);
  const [parking, setParking] = useState({
    no_of_parking: 0,
    parking_type: '',
  });
  const navigation = useNavigation();

  const [getParkingTypeList] = useGetParkingTypeListMutation();

  const getParking = async () => {
    try {
      await getParkingTypeList({})
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

            if (property.parking_available) {
              setParkingAvaliablity(1);

              setParking({
                no_of_parking: Number(property.no_of_parking),
                parking_type: String(property.parking_type),
              });
            }

            if (property.balcony_terrace) {
              setBalconyAvaliablity(1);
            }

            setParkingTypes(a);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(parking, property, '<><><>');

  useEffect(() => {
    getParking();
  }, []);

  console.log(
    parkingTypes.find(val => String(val.value) === property.parking_type),
    '???????',
  );

  const returnParkingVal = () => {
    let a = parkingAvaliablity === 1 ? 1 : 2;
    return a;
  };

  const returnBalconyVal = () => {
    let a = balconyAvaliablity === 1 ? 1 : 2;
    return a;
  };

  useEffect(() => {
    returnParkingVal();
  }, [parkingAvaliablity]);

  useEffect(() => {
    returnBalconyVal();
  }, [balconyAvaliablity]);

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
              5
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Parking / Balcony
          </Text>
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{color: '#000', fontFamily: 'Poppins-Medium', fontSize: 16}}>
            Is Balcony Available:
          </Text>
          <RadioButton
            labels={[
              {id: 1, name: 'Yes'},
              {id: 2, name: 'No'},
            ]}
            containerStyles={{marginTop: 8, flexDirection: 'row'}}
            buttonContainerStyle={{marginHorizontal: 5}}
            onChange={v => {
              if (v.id === 1) {
                setBalconyAvaliablity(1);
              } else {
                setBalconyAvaliablity(0);
              }
            }}
            value={returnBalconyVal()}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{color: '#000', fontFamily: 'Poppins-Medium', fontSize: 16}}>
            Is Parking Available:
          </Text>
          <RadioButton
            labels={[
              {id: 1, name: 'Yes'},
              {id: 2, name: 'No'},
            ]}
            containerStyles={{marginTop: 8, flexDirection: 'row'}}
            buttonContainerStyle={{marginHorizontal: 5}}
            onChange={v => {
              if (v.id === 2) {
                setParkingAvaliablity(1);
              } else {
                setParkingAvaliablity(0);
              }
            }}
            value={returnParkingVal()}
          />
        </View>

        {parkingAvaliablity === 1 && (
          <View style={{marginVertical: 10}}>
            <Input
              label="No of Parking"
              placehoder="Enter No of Parking"
              onChange={e =>
                setParking({
                  ...parking,
                  no_of_parking: Number(e.nativeEvent.text),
                })
              }
              value={String(parking.no_of_parking)}
            />
            <DropDown
              datas={parkingTypes}
              label="Property Type?"
              onChange={v => {
                console.log(v);
                setParking({
                  ...parking,
                  parking_type: v,
                });
              }}
              value={parkingTypes.find(
                val => String(val.value) === property.parking_type,
              )}
            />
          </View>
        )}

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
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#45485F',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
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
              onPress={() => {
                dispatch(
                  setAddPropertyFive({
                    parking_available: parkingAvaliablity,
                    balcony_terrace: balconyAvaliablity,
                    no_of_parking: parking.no_of_parking,
                    parking_type: parking.parking_type,
                  }),
                );
                if (props.route.params.type === 'Add') {
                  navigation.navigate('AddProperty-6', {type: 'Add'});
                } else {
                  navigation.navigate('AddProperty-6', {
                    type: 'Edit',
                    id: props?.route?.params?.id,
                  });
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPropertyAddionalDetailsScreen;
