import React from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  work_in_progress: number;
  new: number;
  completed: number;
}

const defaultProps: Props = {
  work_in_progress: 0,
  new: 0,
  completed: 0,
};

const DashboardTaskSummary = (props: Props) => {
  const demoData = [
    {
      summaryName: 'New',
      data: props.new,
      color_1: '#F6E864',
      color_2: '#FF9211',
      imageUrl: require('../../assets/images/flag.png'),
    },
    {
      summaryName: 'Work In Progress',
      data: props.work_in_progress,
      color_1: '#6850FF',
      color_2: '#7000FF',
      imageUrl: require('../../assets/images/arrow-right.png'),
    },
    {
      summaryName: 'Completed',
      data: props.completed,
      color_1: '#84FFBE',
      color_2: '#00ABE4',
      imageUrl: require('../../assets/images/tick.png'),
    },
  ];
  return (
    <View>
      <View>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            marginTop: 20,
            marginBottom: 10,
            color: '#000',
          }}>
          Task Summary
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        {demoData.map((item, index) => (
          <LinearGradient
            colors={[item?.color_1, item?.color_2]}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 5,
              opacity: 1,
              position: 'relative',
              minWidth: 100,
              minHeight: 100,
              marginHorizontal: 5,
            }}
            key={index + item?.summaryName}>
            <View
              style={{
                paddingVertical: 10,
                justifyContent: 'space-between',
                flexDirection: 'column',
                flex: 1,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                }}>
                {item?.summaryName}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 26,
                    color: '#fff',
                    fontWeight: 500,
                  }}>
                  {item?.data}
                </Text>
              </View>
            </View>
            <Image
              source={item?.imageUrl}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                zIndex: 99,
                bottom: 0,
                right: 0,
              }}
            />
          </LinearGradient>
        ))}
      </View>
    </View>
  );
};

DashboardTaskSummary.defaultProps = defaultProps;

export default DashboardTaskSummary;
