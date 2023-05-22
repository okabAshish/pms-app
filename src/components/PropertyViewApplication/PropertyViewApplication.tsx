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

interface props {
  property_built_year : string;
  parking_available : string;
  no_of_bedrooms : string;
  no_of_bathroom : string;
  balcony_terrace : string;
};

const defaultProps: Props = {
  property_built_year: 'N/A',
  parking_available: 'N/A',
  no_of_bedrooms : 'N/A',
  no_of_bathroom : 'N/A',
  balcony_terrace : 'N/A',
};

const PropertyViewApplication = (props: Props) => {
  const data = [
    {icon: faCalendar, title: 'Build Year', desc: props.property_built_year},
    {icon: faCar, title: 'Parking Available', desc: props.parking_available},
    {icon: faBed, title: 'Bedrooms', desc: props.no_of_bedrooms},
    {icon: faTable, title: 'Balcony Available', desc: props.balcony_terrace},
    {icon: faBath, title: 'Bathrooms', desc: props.no_of_bathroom},
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
