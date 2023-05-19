import {
  faBath,
  faBed,
  faCalendar,
  faCar,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {View} from 'react-native';
import PropertyViewApplicationCard from './PropertyViewApplicationCard';

type Props = {};

const PropertyViewApplication = (props: Props) => {
  const data = [
    {icon: faCalendar, title: 'Build Year', desc: '2015'},
    {icon: faCar, title: 'Parking Available', desc: 'No'},
    {icon: faBed, title: 'Bedrooms', desc: '3 Rooms'},
    {icon: faTable, title: 'Balcony Available', desc: 'No'},

    {icon: faBath, title: 'Bathrooms', desc: '2 Rooms'},
  ];

  return (
    <View style={{marginVertical: 20}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          // justifyContent: 'space-between',
        }}>
        {data.map((item, index) => (
          <PropertyViewApplicationCard
            title={item.title}
            icon={item.icon}
            desc={item.desc}
          />
        ))}
      </View>
    </View>
  );
};

export default PropertyViewApplication;
