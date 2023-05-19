import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {};

const ContractViewHeader = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#0EB9F2',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
      }}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            padding: 4,
            borderRadius: 9999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <View
            style={{
              backgroundColor: '#fff',
              width: 26,
              height: 26,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 25,
          paddingVertical: 20,

          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              // paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                textTransform: 'uppercase',
                // flex: 1,
                flexWrap: 'wrap',
                // marginBottom: 10,
              }}>
              Contract Number
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                letterSpacing: 0.5,
              }}>
              123456789
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // paddingHorizontal: 10,
              // borderLeftWidth: 0.5,
              // borderRightWidth: 0.5,
              borderColor: '#fff',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                textTransform: 'uppercase',
              }}>
              Property Type
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                letterSpacing: 0.5,
              }}>
              Building
            </Text>
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            // paddingHorizontal: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 6,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 12,
              // textTransform: 'uppercase',
            }}>
            Created Date
          </Text>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              letterSpacing: 0.5,
            }}>
            2023-07-03
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ContractViewHeader;
