import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

const PropertyViewAddress = (props: Props) => {
  const data = [
    {
      title: 'State',
      desc: 'N/A',
    },
    {
      title: 'City',
      desc: 'N/A',
    },
    {
      title: 'Zip Code',
      desc: 'N/A',
    },
    {
      title: 'Address 1',
      desc: 'N/A',
    },
    {
      title: 'Address 2',
      desc: 'N/A',
    },
  ];

  return (
    <View
      style={{
        marginBottom: 20,
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 16,
          color: '#000',
        }}>
        Address
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
          <View style={{flexDirection: 'row', width: 160, marginVertical: 5}}>
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
                flex: 1,
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

export default PropertyViewAddress;
