import {faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

const ContractDetailsComponent = (props: Props) => {
  return (
    <View>
      <View style={{paddingVertical: 10}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#fff',
            textTransform: 'uppercase',
            paddingHorizontal: 20,
            paddingBottom: 12,
          }}>
          Contact Details
        </Text>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderBottomWidth: 0.8,
            borderColor: '#45485F',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Security Desposite
              </Text>
              <View
                style={{
                  //   maxWidth: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faCaretRight} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 5,
                  }}>
                  $1000
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Security Desposite
              </Text>
              <View
                style={{
                  //   maxWidth: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faCaretRight} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 5,
                  }}>
                  $1000
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderBottomWidth: 0.8,
            borderColor: '#45485F',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Security Desposite
              </Text>
              <View
                style={{
                  //   maxWidth: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faCaretRight} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 5,
                  }}>
                  $1000
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Security Desposite
              </Text>
              <View
                style={{
                  //   maxWidth: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faCaretRight} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 5,
                  }}>
                  $1000
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContractDetailsComponent;
