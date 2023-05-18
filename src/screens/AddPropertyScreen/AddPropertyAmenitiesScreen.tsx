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
import CheckBox from '../../components/CheckBox/CheckBox';
import {useGetOwnerPropertyAmenitiesListMutation} from '../../features/auth/owner';
import {setAddPropertyFour} from '../../features/owner/ownerSlice';

type Props = {};

const AddPropertyAmenitiesScreen = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [FurnishedDetails, setFurnishedDetails] = useState([]);
  const [AmenitiesList, setAmenitiesList] = useState([]);

  const [getOwnerPropertyAmenitiesList] =
    useGetOwnerPropertyAmenitiesListMutation();

  const getAmenities = async () => {
    try {
      await getOwnerPropertyAmenitiesList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            console.log(res.data);
            let a = [];
            for (let i = 0; i < res.data.length; i++) {
              a.push({
                slug: res.data[i].id,
                title: res.data[i].name,
                icon: res.data[i].icon,
              });
            }
            setAmenitiesList(a);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAmenities();
  }, []);

  console.log(FurnishedDetails);

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
              4
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Amenities (Optional)
          </Text>
        </View>

        <View style={{marginVertical: 20}}>
          <CheckBox
            labels={AmenitiesList}
            value={FurnishedDetails}
            onChange={v => setFurnishedDetails(v)}
          />
        </View>

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
                  setAddPropertyFour({
                    property_amenities: JSON.stringify(FurnishedDetails),
                  }),
                );
                navigation.navigate('AddProperty-5');
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

export default AddPropertyAmenitiesScreen;
