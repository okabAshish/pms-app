import React from 'react';
import {SafeAreaView, View} from 'react-native';
import BillsCard from '../../components/BillsCard/BillsCard';

type Props = {};

const BillsScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <BillsCard />
      </View>
    </SafeAreaView>
  );
};

export default BillsScreen;
