import {
  faBuilding,
  faCalendar,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {};

const BillsCard = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: '#363f4e',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 20,
      }}>
      <View
        style={{
          top: 20,
          right: 10,
          position: 'absolute',
        }}>
        {/* <View
          style={{
            backgroundColor: '#20c997',
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              fontSize: 12,
            }}>
            Paid
          </Text>
        </View> */}
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              fontSize: 12,
            }}>
            Not Paid
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 4,
          }}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Medium',
            }}>
            # 6665-1681122292-2023-04-10
          </Text>
        </View>
      </View>
      <View style={{marginTop: 15, marginBottom: 10}}>
        <View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <FontAwesomeIcon icon={faBuilding} color="#fff" />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                marginHorizontal: 10,
              }}>
              Property :
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              Peace Villa
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            <FontAwesomeIcon icon={faFile} color="#fff" />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                marginHorizontal: 10,
              }}>
              Contract Number :
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              684490756856
            </Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <FontAwesomeIcon icon={faCalendar} color="#fff" />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                marginHorizontal: 10,
              }}>
              Due Date :
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              07-04-2023
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <View
              style={{
                backgroundColor: '#9299b8',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                Rent: $800 + File: $13
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: '#20c997',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 4,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginRight: 5,
                }}>
                Total Payable:
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                $2000
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#20c997',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 4,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginRight: 5,
                }}>
                Paid At:
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                17/04/2023
              </Text>
            </View>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#20c997',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 4,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginRight: 5,
                }}>
                Paid At:
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                17/04/2023
              </Text>
            </View>
          </View> */}
        </View>
      </View>

      <View style={{flexDirection: 'row', marginTop: 0}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#01abe4',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 4,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
            }}>
            Show Invoice
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BillsCard;
