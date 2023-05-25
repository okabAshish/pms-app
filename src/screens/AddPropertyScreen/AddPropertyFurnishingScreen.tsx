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
import CheckBox from '../../components/CheckBox/CheckBox';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import RadioButton from '../../components/RadioButton/RadioButton';
import {
  useGetFurnishingListMutation,
  useGetFurnishingTypeMutation,
} from '../../features/auth/owner';
import {setError} from '../../features/error/error';
import {setAddPropertyThree} from '../../features/owner/ownerSlice';
import {
  AddPropertyInputData,
  FurnishingListData,
  FurnishingTypeList,
} from '../../features/ownerTypes';
import {RootState} from '../../store';

type Props = {
  route: {
    params: {
      id: string;
      type: string;
    };
  };
};

const AddPropertyFurnishingScreen = (props: Props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const error = useSelector(state => state?.error);
  const owner: AddPropertyInputData = useSelector<RootState>(
    state => state?.owner,
  );

  const [typeValue, setTypeValue] = useState(
    props.route.params.type === 'Edit'
      ? String(owner.furnishing_type_id).length > 0
        ? String(owner.furnishing_type_id)
        : null
      : null,
  );

  // console.log(owner.furnishing_type_id);
  const [furnisingValue, setFurnisingValue] = useState([]);
  const [furnishedType, setFurnishedType] = useState([]);
  const [furnishedList, setFurnishedList] = useState([]);
  const [furnishedDetails, setFurnishedDetails] = useState({
    furnishing_type_id:
      props.route.params.type === 'Edit'
        ? String(owner.furnishing_type_id).length > 0
          ? String(owner.furnishing_type_id)
          : null
        : null,
    property_furnishing_detail: [],
  });

  // console.log(owner.property_furnishing_detail);
  const [getFurnishingType] = useGetFurnishingTypeMutation();
  const [getFurnishingList] = useGetFurnishingListMutation();
  const dispatch = useDispatch();

  const furnishingTypeData = async () => {
    setLoading(true);
    try {
      // setLoading(true);
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

  const handleFurnishingData = () => {
    let a: Array<T> = owner.property_furnishing_detail;

    console.log(a);
    let b = [];
    a.forEach(v => {
      // b.push({
      //   slug: v.furnishing_name.furnish_name,
      //   title: v.furnishing_name.furnish_name,
      //   icon: v.furnishing_name.icon,
      //   id: v.furnishing_name.id,
      // });
      b.push(v.furnishing_name.id);
    });

    setFurnisingValue(b);
    setFurnishedDetails({
      ...furnishedDetails,
      property_furnishing_detail: String(b),
    });
  };

  const furnishingListFunction = async () => {
    setLoading(true);
    try {
      // setLoading(true);
      await getFurnishingList({})
        .unwrap()
        .then(res => {
          console.log(res, 'FURNISHING List');
          console.log(res?.data);
          if (res.success) {
            const FurnishingListData: FurnishingListData = res?.data;
            const furnishingCheckboxData: any = [];
            for (let i = 0; i < FurnishingListData.length; i++) {
              furnishingCheckboxData[i] = {
                slug: FurnishingListData[i].furnish_name,
                title: FurnishingListData[i].furnish_name,
                icon: FurnishingListData[i].icon,
                id: FurnishingListData[i].id,
              };
            }
            setFurnishedList(furnishingCheckboxData);

            if (owner.property_furnishing_detail.length > 0) {
              handleFurnishingData();
            }

            console.log(furnishingCheckboxData);
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

  console.log(furnisingValue);

  const selectedFurnishType = v => {
    setTypeValue(v);
    setFurnishedDetails({...furnishedDetails, furnishing_type_id: String(v)});
  };

  const page3 = () => {
    dispatch(
      setAddPropertyThree({
        furnishing_type_id: String(furnishedDetails.furnishing_type_id),
        property_furnishing_detail: furnishedDetails.property_furnishing_detail,
      }),
    );
  };

  useEffect(() => {
    furnishingTypeData();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

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
            selectedFurnishType(v);
          }}
          value={Number(typeValue)}
        />

        {(typeValue == 1 || typeValue == 2) && (
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
              onChange={v => {
                // console.log(v);
                setFurnisingValue(v);
                setFurnishedDetails({
                  ...furnishedDetails,
                  property_furnishing_detail: v,
                });
              }}
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
              onPress={() => {
                if (furnishedDetails.furnishing_type_id) {
                  page3();
                  if (props.route.params.type === 'Add') {
                    navigation.navigate('AddProperty-4', {type: 'Add'});
                  } else {
                    navigation.navigate('AddProperty-4', {type: 'Edit'});
                  }
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

export default AddPropertyFurnishingScreen;
