import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

const PropertyViewInfo = (props: Props) => {
  const data = [
    {
      title: 'Property Name',
      desc: 'N/A',
    },
    {
      title: 'Property Type',
      desc: 'N/A',
    },
    {
      title: 'Property Size',
      desc: 'N/A',
    },
    {
      title: 'Hoa Fee',
      desc: 'N/A',
    },
    {
      title: 'Fee Duration',
      desc: 'N/A',
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

export default PropertyViewInfo;
