import React from 'react';
import {SafeAreaView, View} from 'react-native';
import DashBoardNavBar from '../../components/DashBoardNavBar/DashBoardNavBar';
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
        <View>
          <DashboardReport />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
