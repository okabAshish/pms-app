/* eslint-disable react-native/no-inline-styles */
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/Input/Input';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {setAddPropertyTwo} from '../../features/owner/ownerSlice';
import {RootState} from '../../store';

type Props = {
  route: {
    params: {
      id: string;
      type: string;
    };
  };
};

const AddPropertyDetailsScreen = (props: Props) => {
  const property = useSelector<RootState>(state => state.owner);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let [propertyDetails, setPropertyDetails] = useState({
    bedrooms:
      props.route.params.type === 'Edit'
        ? property?.no_of_bedrooms
          ? String(property?.no_of_bedrooms)
          : ''
        : '',
    bathrooms:
      props.route.params.type === 'Edit'
        ? property?.no_of_bathroom
          ? String(property?.no_of_bathroom)
          : ''
        : '',
  });
  const [loading, setLoading] = useState(false);

  const nextScreen = () => {
    setLoading(true);
    try {
      for (const key in propertyDetails) {
        if (
          propertyDetails[key] === null ||
          propertyDetails[key] === '' ||
          propertyDetails[key] === undefined
        ) {
          throw (Error.name = `${key} is empty`);
        }
      }
      console.log('success');
      dispatch(
        setAddPropertyTwo({
          no_of_bedrooms: String(propertyDetails.bedrooms),
          no_of_bathroom: String(propertyDetails.bathrooms),
        }),
      );
      if (props.route.params.type === 'Add') {
        navigation.navigate('AddProperty-3', {type: 'Add'});
      } else {
        navigation.navigate('AddProperty-3', {type: 'Edit'});
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      {/* <StatusBar backgroundColor={'#45485F'} barStyle="light-content" /> */}

      <KeyboardAwareScrollView
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
              2
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Property details
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <Input
            switchButton={false}
            onChange={e =>
              setPropertyDetails({
                ...propertyDetails,
                bedrooms: Number(e.nativeEvent.text),
              })
            }
            placehoder="Enter number of the bedrooms"
            label="Number Of Bedrooms"
            keyboardType="number-pad"
            value={String(propertyDetails.bedrooms)}
          />

          <Input
            switchButton={false}
            onChange={e =>
              setPropertyDetails({
                ...propertyDetails,
                bathrooms: Number(e.nativeEvent.text),
              })
            }
            placehoder="Enter number of the bathrooms"
            label="Number Of Bathroom"
            keyboardType="number-pad"
            value={String(propertyDetails.bathrooms)}
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

export default AddPropertyDetailsScreen;
