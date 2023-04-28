import {faHouse, faHouseUser, faLink} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

const report = [
  {
    title: 'Property Owners',
    subTitle: 'Total Properties',
    value: 8,
    color_1: '#00ABE4',
    color_2: 'rgba(0, 171, 228, 0.35)',
    icon: faHouse,
  },
  {
    title: 'Property',
    subTitle: 'Total Rented',
    value: 5,
    color_1: '#0AB35A',
    color_2: 'rgba(153, 243, 195, 0.35)',
    icon: faHouseUser,
    middle: true,
  },
  {
    title: 'Property Owners',
    subTitle: 'Total Invitation Sent',
    value: 15,
    color_1: '#E4AE00',
    color_2: 'rgba(255, 229, 145, 0.35)',
    icon: faLink,
  },
];

const DashboardReport = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
      }}>
      {report.map((item, index) => (
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 6,
            borderColor: '#efefef',
            flex: 1,
            marginHorizontal: item?.middle ? 5 : 0,
          }}>
          <View
            style={{
              padding: 8,
              backgroundColor: item?.color_2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9999,
              width: 36,
              height: 36,
            }}>
            <View
              style={{
                padding: 8,
                backgroundColor: item?.color_1,
                borderRadius: 9999,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 28,
                height: 28,
              }}>
              <FontAwesomeIcon icon={item?.icon} color="#fff" size={14} />
            </View>
          </View>
          <View style={{marginTop: 5}}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-Medium',
                fontSize: 10,
              }}>
              {item?.title}
            </Text>
          </View>
          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#45485F',
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                flexWrap: 'wrap',
                flex: 3,
              }}>
              {item?.subTitle}
            </Text>
            <Text
              style={{
                color: item?.color_1,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                flex: 1,
                textAlign: 'right',
              }}>
              {item?.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DashboardReport;
