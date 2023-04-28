import React from 'react';
import {SafeAreaView, View} from 'react-native';
import DashBoardNavBar from '../../components/DashBoardNavBar/DashBoardNavBar';
import DashBoardRevenueOverView from '../../components/DashBoardRevenueOverView/DashBoardRevenueOverView';
import DashboardReport from '../../components/DashboardReport/DashboardReport';

type Props = {};

const DashboardScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <DashBoardNavBar />
        <DashboardReport />
        <DashBoardRevenueOverView />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
