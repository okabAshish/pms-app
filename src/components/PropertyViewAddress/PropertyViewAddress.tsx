import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  state_name : string;
  city_name : string;
  zip : string;
  address_one : string;
  address_two : string;
};

const defaultProps: Props = {
  state_name : 'N/A',
  city_name : 'N/A',
  zip : 'N/A',
  address_one : 'N/A',
  address_two : 'N/A',
};

const PropertyViewAddress = (props: Props) => {
  const data = [
    {
      title: 'State',
      desc: props.state_name,
    },
    {
      title: 'City',
      desc: props.city_name,
    },
    {
      title: 'Zip Code',
      desc: props.zip,
    },
    {
      title: 'Address 1',
      desc: props.address_one,
    },
    {
      title: 'Address 2',
      desc: props.address_two,
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
