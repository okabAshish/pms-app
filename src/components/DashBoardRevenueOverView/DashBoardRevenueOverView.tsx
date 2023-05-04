import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from 'victory-native';

type Props = {};

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
    {
      data: [24, 49, 20, 50, 10, 21],
    },
  ],
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
  },
  useShadowColorFromDataset: false, // optional
};

const DashBoardRevenueOverView = (props: Props) => {
  return (
    <View style={{marginTop: 22}}>
      <Text style={{color: '#000', fontSize: 16, fontFamily: 'Poppins-Medium'}}>
        Revenue Overview
      </Text>
      <Text
        style={{
          color: '#c1c1c1',
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
          textTransform: 'capitalize',
        }}>
        Amet minim mollit non deserunt ullamco est sit aliqua
      </Text>
      <View>
        <VictoryChart theme={VictoryTheme.material} domain={{y: [0.5, 10.5]}}>
          <VictoryGroup
            offset={20}
            style={{data: {width: 10}}}
            colorScale={['#84FFBE', '#FF9211']}>
            <VictoryBar
              cornerRadius={{topLeft: 5, topRight: 5}}
              data={[
                {x: 'January', y: 1},
                {x: 'Febuary', y: 2},
                {x: 'March', y: 3},
              ]}
            />
            <VictoryBar
              cornerRadius={{topLeft: 5, topRight: 5}}
              data={[
                {x: 'January', y: 2},
                {x: 'Febuary', y: 3},
                {x: 'March', y: 4},
              ]}
            />
          </VictoryGroup>
        </VictoryChart>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 12,
            }}>
            <View
              style={{
                backgroundColor: '#FF9211',
                width: 10,
                height: 10,
                borderRadius: 9999,
                marginRight: 6,
              }}
            />
            <Text style={{fontSize: 12, fontFamily: 'Poppins-Medium'}}>
              Due
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#84FFBE',
                width: 10,
                height: 10,
                borderRadius: 9999,
                marginRight: 6,
              }}
            />
            <Text style={{fontSize: 12, fontFamily: 'Poppins-Medium'}}>
              Paid
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoardRevenueOverView;
