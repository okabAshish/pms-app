import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '../../components/CheckBox/CheckBox';
import RadioButton from '../../components/RadioButton/RadioButton';
import {useGetFurnishingTypeMutation, useGetFurnishingListMutation} from '../../features/auth/owner';
import {FurnishingTypeList, FurnishingListData} from '../../features/ownerTypes';
import {useDispatch, useSelector} from 'react-redux';
import {setError} from '../../features/error/error';

type Props = {};

const AddPropertyFurnishingScreen = (props: Props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const error = useSelector(state => state?.error);
  const owner = useSelector(state => state?.owner);

  const [typeValue, setTypeValue] = useState(null);
  const [furnisingValue, setFurnisingValue] = useState(null);
  const [furnishedType, setFurnishedType] = useState([]);
  const [furnishedList, setFurnishedList] = useState([]);
  const [furnishedDetails, setFurnishedDetails] = useState({
    furnishing_type_id: '',
    property_furnishing_detail: '',
  });

  //console.log(furnishedDetails);
  const [getFurnishingType] = useGetFurnishingTypeMutation();
  const [getFurnishingList] = useGetFurnishingListMutation();
  const dispatch = useDispatch();

  const furnishingTypeData = async () => {
    setLoading(true)
    try {
      await getFurnishingType({})
        .unwrap()
        .then(res => {
          //console.log(res,"FURNISHING TYPE RES");

          if (res.success) {
            const furnishingTypeList: FurnishingTypeList = res?.data;
            const furnishingData: any = [];
            for (let i = 0; i < furnishingTypeList.length; i++) {
              furnishingData[i] = furnishingTypeList[i].name;
            }
            setFurnishedType(furnishingData);
            
            furnishingListFunction();
          }
        });
    } catch (err) {
      dispatch(setError({error: true, message: err}));
      setTimeout(() => {
        dispatch(setError({error: false, message: ''}));
      }, 350);
      console.log(err,"EERRRR");
    }
    setLoading(false)
  }

  const furnishingListFunction = async () => {
    console.log(1);
    setLoading(true)
    try {
      await getFurnishingList({})
        .unwrap()
        .then(res => {
          console.log(res,"FURNISHING List");
          console.log(res?.data);
          if (res.success) {
            
            const FurnishingListData: FurnishingListData = res?.data;
            const furnishingCheckboxData: any = [];
            for (let i = 0; i < FurnishingListData.length; i++) {
              furnishingCheckboxData[i] = {
                slug: FurnishingListData[i].furnish_name,
                title: FurnishingListData[i].furnish_name,
                icon: FurnishingListData[i].icon,
              };
            }
            setFurnishedList(furnishingCheckboxData);
            console.log(furnishingCheckboxData)
          }
        });
    } catch (err) {
      dispatch(setError({error: true, message: err}));
      setTimeout(() => {
        dispatch(setError({error: false, message: ''}));
      }, 350);
      console.log(err,"EERRRR");
    }
    setLoading(false)
  }

  useEffect(() => {
    furnishingTypeData();
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
              3
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Furnishing
          </Text>
        </View>

        <RadioButton
          labels={furnishedType}
          containerStyles={{marginVertical: 32}}
          onChange={v => {
            console.log(v);
            setTypeValue(v);
          }}
          value={typeValue}
        />

        {typeValue === 1 && (
          <>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#000',
              }}>
              Property Will Be Furnished With:
            </Text>

            <CheckBox
              labels={furnishedList}
              value={furnisingValue}
              onChange={v => setFurnisingValue(furnisingValue)}
            />
          </>
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
              onPress={() => navigation.navigate('AddProperty-4')}>
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

export default AddPropertyFurnishingScreen;
