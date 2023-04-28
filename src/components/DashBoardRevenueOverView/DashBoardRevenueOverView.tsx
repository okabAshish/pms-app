import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

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
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          yAxisLabel="$"
          //   verticalLabelRotation={30}
        />
      </View>
    </View>
  );
};

export default DashBoardRevenueOverView;
