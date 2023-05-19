import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

const ContractDetailsComponent = (props: Props) => {
  const data = [
    [
      {title: 'Security Deposit', data: '$1000', id: 1},
      {title: 'Rent/mth', data: '$1000', id: 2},
    ],
    [
      {title: 'Discount', data: '$600', id: 3},
      {title: 'Total Rent/mth', data: '$600', id: 4},
    ],
    [
      {title: 'Owner', data: 'Demo Owner', id: 5},
      {title: 'Tenant', data: 'Demo Tenant', id: 6},
    ],

    [
      {title: 'Grace Period', data: '1 Months', id: 7},
      {title: 'Contract Period', data: '11 months', id: 8},
    ],
    [
      {title: 'Service Charges/mth', data: '$0', id: 9},
      {title: 'Other Charges/mth', data: '$600', id: 10},
    ],
    [
      {title: 'Total Rent Amount', data: '$6000', id: 11},
      {title: 'Total Contract Amount', data: '$6000', id: 12},
    ],

    [
      {
        title: 'Start Date',
        data: '2023-04-12T12:42:16.000000Z',
        id: 13,
        date: true,
      },
      {
        title: 'End Date',
        data: '2023-04-12T12:42:16.000000Z',
        id: 14,
        date: true,
      },
    ],
    [{title: 'Late Fine', data: 'No', id: 15}],
  ];

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
          Contract Details
        </Text>
        {data.map((item, index) => (
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              borderBottomWidth: 0.8,
              borderColor: '#45485F',
            }}>
            {item.map((item, index) => (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: item.title
                        ? 'Poppins-Medium'
                        : 'Poppins-Regular',
                      fontSize: 10,
                    }}>
                    {item.title} :
                  </Text>
                  <View
                    style={{
                      //   maxWidth: 50,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Poppins-Regular',
                        marginLeft: 5,
                        fontSize: 10,
                      }}>
                      {item.date
                        ? dayjs(item.data).format('YYYY-MM-DD')
                        : item.data}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ContractDetailsComponent;
