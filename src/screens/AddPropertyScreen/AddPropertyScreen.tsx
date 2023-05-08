import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';

const DEVICE_HEIGHT = Dimensions.get('window').height;

type Props = {};

const AddPropertyScreen = (props: Props) => {
  let [property, setProperty] = useState({
    title: '',
    type: '',
    size: 0,
    year: 0,
    amount: 0.0,
    duration: '',
  });

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
            value={property.type}
            onChange={value => {
              console.log(value);
              setProperty({...property, type: value});
            }}
          />
          <Input
            switchButtonData={['Sq ft.', 'Meter']}
            switchButton={true}
            onChange={e =>
              setProperty({...property, size: Number(e.nativeEvent.text)})
            }
            placehoder="Enter Property Size"
            label="Property Size"
            keyboardType="number-pad"
          />
          <Input
            switchButton={false}
            onChange={e =>
              setProperty({...property, year: Number(e.nativeEvent.text)})
            }
            placehoder="Enter Property Year"
            label="Property Built Year"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Input
              switchButton={false}
              onChange={e =>
                setProperty({...property, amount: Number(e.nativeEvent.text)})
              }
              placehoder="Enter HOA Fee Amount"
              label="HOA Fee"
              containerStyles={{flex: 2, marginRight: 20}}
            />
            <DropDown
              label="Fee Duration"
              value={property.type}
              onChange={value => {
                console.log(value);
                setProperty({...property, duration: value});
              }}
              containerStyles={{flex: 1}}
              dropDownHeight={100}
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

export default AddPropertyScreen;
