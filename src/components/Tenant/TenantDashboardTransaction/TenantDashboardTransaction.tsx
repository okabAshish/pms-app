import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {TenantDashboardTransactions} from '../../../features/types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface TransactionProps {
  first_name: string;
  middle_name: string;
  last_name: string;
  imgUrl: string;
  property_name: string;
  created_at: string;
}

interface Transactions extends Array<TransactionProps> {}

interface Props {
  trasactions: [];
}

// let demoData: Transactions;

const defaultProps: Transactions = [
  {
    first_name: '',
    middle_name: '',
    last_name: '',
    imgUrl: '',
    property_name: '',
    created_at: '',
  },
];

const TenantDashboardTransaction = (props: Props) => {
  const arrayRearrange = (a: TenantDashboardTransactions) => {
    let arr: Transactions = [];

    for (let i = 0; i < 3; i++) {
      arr.push({
        first_name: a[i]?.get_owners_data?.first_name,
        last_name: a[i]?.get_owners_data?.last_name,
        middle_name: a[i]?.get_owners_data?.middle_name,
        imgUrl: a[i]?.get_owners_data?.profile_photo
          ? a[i]?.get_owners_data?.profile_photo
          : 'https://property.okab.ae/img/user.png',
        property_name:
          a[i]?.contract_billing_data?.billing_contract_data?.contract_properties_data?.property_name,
        created_at: a[i]?.created_at,
      });
    }

    // console.log(arr);

    setImg(
      a[0]?.get_tanent?.profile_photo
        ? a[0]?.get_tanent?.profile_photo
        : 'https://property.okab.ae/img/user.png',
    );

    setDemoData(arr);
  };

  const [demoData, setDemoData] = useState<Transactions>([]);
  const [img, setImg] = useState('https://property.okab.ae/img/user.png');

  useEffect(() => {
    props.trasactions && arrayRearrange(props.trasactions);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{fontSize: 16, color: '#000', fontFamily: 'Poppins-Medium'}}>
          Recent Transaction
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
            }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#F3F3F3',
          borderRadius: 7,
          paddingVertical: 4,
          paddingHorizontal: 16,
          marginTop: 12,
        }}>
        {demoData?.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: item?.last ? 0 : 1,
                borderColor: '#D9D9D9',

                paddingTop: 15,
                paddingBottom: 10,
              }}
              key={index + item?.first_name}>
              <View>
                <Image
                  source={{
                    uri: img,
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    resizeMode: 'cover',
                  }}
                  onError={() =>
                    setImg('https://property.okab.ae/img/user.png')
                  }
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 12,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {item?.first_name ? item?.first_name + ' ' : ''}

                  {item?.middle_name ? item?.middle_name + ' ' : ''}

                  {item?.last_name ? item?.last_name : ''}
                </Text>
                <Text
                  style={{
                    color: 'rgba(0, 41, 102, 0.5)',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium',
                    textTransform: 'capitalize',
                  }}>
                  {dayjs().to(dayjs(item?.created_at).format())}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

TenantDashboardTransaction.defaultProps = defaultProps;

export default TenantDashboardTransaction;
