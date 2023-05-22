import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';

interface BasicData {
  title: string;
  data: string;
  date?: boolean;
  id: any;
}

interface SingleSlabData extends Array<BasicData> {}

export interface SlabContainer {
  containerTitle: string;
  value: Array<SingleSlabData>;
}

type Props = {
  slab: SlabContainer;
};

const defaultProps: Props = {
  slab: {
    containerTitle: 'Contract Details',
    value: [
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
    ],
  },
};

const ContractDetailsComponent = (props: Props) => {
  return (
    <View>
      <View style={{paddingVertical: 6}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#fff',
            textTransform: 'uppercase',
            paddingHorizontal: 20,
            paddingBottom: 12,
          }}>
          {props.slab.containerTitle}
        </Text>
        {props.slab.value.map((item, index) => (
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              borderBottomWidth: item[0].border ? 0 : 0.8,
              borderColor: item[0].border ? '#fff' : '#45485F',
            }}
            key={index}>
            {item.map((i, index) => (
              <View style={{flex: 1}} key={i?.id + index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: i.border ? 5 : 20,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: i.title
                        ? 'Poppins-Medium'
                        : 'Poppins-Regular',
                      fontSize: 10,
                    }}>
                    {i.icon ? (
                      <FontAwesomeIcon icon={i.title} />
                    ) : (
                      <> {i.title} :</>
                    )}
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
                      {i.date ? dayjs(i.data).format('YYYY-MM-DD') : i.data}
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

ContractDetailsComponent.defaultProps = defaultProps;

export default ContractDetailsComponent;
