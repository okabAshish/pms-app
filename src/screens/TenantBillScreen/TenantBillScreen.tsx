import React from 'react';
import {SafeAreaView, View} from 'react-native';
import TenantBillCard from '../../components/TenantBillCard/TenantBillCard';

type Props = {};

const TenantBillScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <TenantBillCard />
      </View>
    </SafeAreaView>
  );
};

export default TenantBillScreen;
