import {faEye, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface Props {
  tenant_name: string;
  contract_number: string;
  total_monthly_rent: string;
  contract_type: string;
  start_date: string;
  last_date: string;
  status: string;
  action: string;
  vacant: boolean;
  created_at: string;
}

const defaultProps: Props = {
  tenant_name: 'N/A',
  contract_number: 'N/A',
  contract_type: 'Residental',
  total_monthly_rent: '$25000',
  start_date: '21-03-2021',
  last_date: '21-03-2024',
  created_at: '21-03-2021',
  status: 'Occupied',
  action: 'sadad',
  vacant: true,
};

const OwnerContractCard = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: 9,
        marginTop: 20,
      }}>
      <View style={{}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 8, paddingHorizontal: 12, paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',

                marginTop: 9,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                  }}>
                  Tenant :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.tenant_name.length > 20
                    ? props.tenant_name.slice(0, 19) + '...'
                    : props.tenant_name}
                </Text>
              </View>
              {props.vacant && (
                <View
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    backgroundColor: '#F63B11',
                    borderRadius: 3,
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: 'Poppins-Medium',
                      color: '#fff',
                    }}>
                    Mark Vacant
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Contract Number :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.contract_number}
              </Text>
            </View>

            {/* {props.name && ( */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              {/* <FontAwesomeIcon icon={faUser} size={12} /> */}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Total Monthly Rent :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.total_monthly_rent}
              </Text>
            </View>
            {/* )} */}

            {/* {props.email && ( */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              {/* <FontAwesomeIcon icon={faEnvelope} size={12} /> */}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Contract Type :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.contract_type}
              </Text>
            </View>
            {/* )} */}

            {/* {props.phone && ( */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              {/* <FontAwesomeIcon icon={faPhone} size={12} /> */}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                  //   marginLeft: 5,
                }}>
                Period :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {dayjs().format(props.start_date)} to{' '}
                {dayjs().format(props.last_date)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              {/* <FontAwesomeIcon icon={faPhone} size={12} /> */}
              <View
                style={{alignItems: 'center', flexDirection: 'row', flex: 1}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    //   marginLeft: 5,
                  }}>
                  Status :
                </Text>
                <View style={{alignSelf: 'center', marginLeft: 4}}>
                  <View
                    style={{
                      backgroundColor: 'rgba(32, 201, 151, 0.15)',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 1,
                      borderRadius: 3,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#20C997',
                        fontSize: 10,
                        textTransform: 'capitalize',
                        textAlign: 'center',
                      }}>
                      {props.status}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{alignItems: 'center', flexDirection: 'row', flex: 1}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    marginLeft: 5,
                  }}>
                  Action :
                </Text>
                <View style={{alignSelf: 'center', marginLeft: 4}}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginRight: 8}}>
                      <FontAwesomeIcon icon={faEye} size={16} color="#0AB35A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 8}}>
                      <FontAwesomeIcon icon={faFilePdf} size={16} color="" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: '#0EB9F2',
              paddingHorizontal: 12,
              paddingVertical: 25,
              borderTopRightRadius: 9,
              borderBottomRightRadius: 9,
            }}>
            <View style={{justifyContent: 'flex-end', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    flex: 1,
                    flexWrap: 'wrap',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 11,
                  }}>
                  Created At{' '}
                  <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                    21st March, 2023
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

OwnerContractCard.defaultProps = defaultProps;

export default OwnerContractCard;
