import {faCalendar, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';
type Props = {};

const RentedPropertyCard = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#00ABE4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
      }}>
      <View
        style={{
          backgroundColor: 'rgba(112, 0, 255, 0.07)',
          position: 'absolute',
          borderRadius: 99999,
          width: 137,
          height: 137,
          bottom: -20,
          left: -30,
        }}></View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 3}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#fff',
              letterSpacing: 0.7,
              fontSize: 16,
            }}>
            # 921969321495
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#fff',

              fontSize: 12,
            }}>
            Property Vacated on 18th Apr, 2023
          </Text>
          <View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FontAwesomeIcon icon={faUser} color="#fff" />
              <Text
                style={{
                  marginLeft: 12,
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  fontSize: 14,
                }}>
                Paul Parker
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FontAwesomeIcon icon={faUser} color="#fff" />
              <Text
                style={{
                  marginLeft: 12,
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  fontSize: 14,
                }}>
                Paul Parker
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FontAwesomeIcon icon={faPhone} color="#fff" />
              <Text
                style={{
                  marginLeft: 12,
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  fontSize: 14,
                }}>
                2017896541
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FontAwesomeIcon icon={faCalendar} color="#fff" />
              <Text
                style={{
                  marginLeft: 12,
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  fontSize: 14,
                }}>
                27-03-2023
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              color: '#00ABE4',
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
            }}>
            Occupied
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RentedPropertyCard;
