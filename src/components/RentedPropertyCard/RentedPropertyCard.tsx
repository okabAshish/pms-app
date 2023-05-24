import {faCalendar, faPhone, faUser, faBuilding} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';
import dayjs from 'dayjs';

interface Props {
  contract_number: string;
  start_date: string;
  end_date: string;
  owner_name: string;
  property_name: string;
  owner_contact: string;
  contract_status: number;
  address: string;
}

const defaultProps: Props = {
  contract_number: 'N/A',
  start_date: 'N/A',
  end_date: 'N/A',
  owner_name: 'N/A',
  property_name: 'N/A',
  owner_contact: 'N/A',
  contract_status: 0,
  address: 'N/A'
}


const RentedPropertyCard = (props: Props) => {
  const contractStatusView = () => {
    return (
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
          {props.contract_status}
        </Text>
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#00ABE4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 20,
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
            # {props.contract_number}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#fff',

              fontSize: 12,
            }}>
            {props.address}
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
                {props.owner_name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FontAwesomeIcon icon={faBuilding} color="#fff" />
              <Text
                style={{
                  marginLeft: 12,
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  fontSize: 14,
                }}>
                {props.property_name}
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
                {props.owner_contact}
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
                {dayjs(props.start_date).format('DD MMM, YYYY')} - {dayjs(props.end_date).format('DD MMM, YYYY')}
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
          {contractStatusView()}
        </View>
      </View>
    </View>
  );
};

export default RentedPropertyCard;
