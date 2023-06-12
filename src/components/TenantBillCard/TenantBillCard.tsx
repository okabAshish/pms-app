import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  transaction_number: string;
  transaction_amount: string;
  created_at: string;
  status: number;
};

const defaultProps: Props = {
  transaction_number: 'N/A',
  transaction_amount: 'N/A',
  created_at: '2023-04-12T12:18:25.000000Z',
  status: 0,
};

const TenantBillCard = (props: Props) => {
  return (
    <View
      style={{
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: '#fff',
        marginVertical: 12,
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#efefef',
        flexDirection: 'row',
      }}>
      <View style={{flex: 8}}>
        <Text
          style={{color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14}}>
          # {props.transaction_number}
        </Text>
        <Text
          style={{color: '#000', fontFamily: 'Poppins-Regular', fontSize: 12}}>
          Transition Amount : {props.transaction_amount}
        </Text>
        <Text
          style={{color: '#000', fontFamily: 'Poppins-Regular', fontSize: 12}}>
          Transition Date : {dayjs(props.created_at).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={{flex: 2}}>
        <Text
          style={{
            color: props.status === 1 ? '#20c997' : 'red',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            backgroundColor:
              props.status === 1
                ? 'rgba(32, 201, 151, 0.15)'
                : 'rgba(255, 0, 0, 0.15)',
            textAlign: 'center',
            borderRadius: 3,
          }}>
          {props.status === 1 ? 'Success' : 'Failed'}
        </Text>
      </View>
    </View>
  );
};

TenantBillCard.defaultProps = defaultProps;

export default TenantBillCard;
