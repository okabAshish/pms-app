import {
  faCalendar,
  faEllipsisVertical,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';

interface Props {
  contract_number: string;
  end_date: string;
  owner_name: string;
  owner_contact: string;
  created_at: string;
}

const defaultProps: Props = {
  contract_number: 'N/A',
  end_date: 'N/A',
  owner_name: 'N/A',
  owner_contact: 'N/A',
  created_at: 'N/A'
}

const TenantContractScreenCard = (props: Props) => {
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
          bottom: -50,
          left: -20,
        }}></View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 9}}>
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
            Property Vacated on {dayjs(props.end_date).format('DD MMM, YYYY')}
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
                {dayjs(props.created_at).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faEllipsisVertical} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TenantContractScreenCard;
