import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  property_name: string;
  property_type_name: string;
  property_size: number;
  hoa_fee: string;
  hoa_fee_type: string;
}

const defaultProps: Props = {
  property_name: 'N/A',
  property_type_name: 'N/A',
  property_size: 0,
  hoa_fee: 'N/A',
  hoa_fee_type: 'N/A',
};

const PropertyViewInfo = (props: Props) => {
  console.log(props);
  const data = [
    {
      title: 'Property Name',
      desc: props.property_name,
    },
    {
      title: 'Property Type',
      desc: props.property_type_name,
    },
    {
      title: 'Property Size',
      desc: props.property_size,
    },
    {
      title: 'Hoa Fee',
      desc: props.hoa_fee,
    },
    {
      title: 'Fee Duration',
      desc: props.hoa_fee_type,
    },
  ];

  return (
    <View>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16, color: '#000'}}>
        Property Info
      </Text>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          flex: 1,
          borderRadius: 9,
          paddingHorizontal: 20,
          paddingVertical: 15,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 10,
        }}>
        {data.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              width: 160,
              marginVertical: 5,

              flexWrap: 'wrap',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                color: '#000',
                marginRight: 10,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                color: 'rgba(0,0,0,0.41)',

                flexWrap: 'wrap',
              }}>
              {item.desc}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PropertyViewInfo;
