import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('screen').width;

interface Props {
  paidAmount: number;
  dueAmount: number;
}

const defaultProps: Props = {
  paidAmount: 0,
  dueAmount: 0,
};

const DashboardAmountReport = (props: Props) => {
  const report = [
    {
      id: 1,
      color: '#00ABE4',
      textColor: '#fff',
      left: true,
      title: 'Total Paid Amount',
      value: props.paidAmount,
      image: '../../assets/images/chart-growth.png',
    },
    {
      id: 1,
      color: '#FDF5F1',
      textColor: '#FF9211',
      right: true,
      title: 'Total Due Amount',
      value: props.dueAmount,
      image: '../../assets/images/chart-growth-orange.png',
    },
  ];
  return (
    <View
      style={{
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {report.map((item, index) => (
        <View
          style={{
            backgroundColor: item?.color,
            flex: 1,
            marginRight: item?.left ? 10 : 0,
            padding: 12,
            borderRadius: 9,
          }}
          key={index + item?.id}>
          <View style={{marginBottom: 6}}>
            {item?.left && (
              <Image source={require('../../assets/images/chart-growth.png')} />
            )}
            {item?.right && (
              <Image
                source={require('../../assets/images/chart-growth-orange.png')}
              />
            )}
          </View>
          <Text
            style={{
              color: item?.textColor,
              fontSize: 12,
              fontFamily: 'Poppins-SemiBold',
              marginBottom: 8,
              flex: 1,
              flexWrap: 'wrap',
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              color: item?.textColor,
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
            {item?.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

DashboardAmountReport.defaultProps = defaultProps;

export default DashboardAmountReport;
