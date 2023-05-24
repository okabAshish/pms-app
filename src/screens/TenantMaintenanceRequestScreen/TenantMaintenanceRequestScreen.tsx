import React from 'react';
import {SafeAreaView, View} from 'react-native';
import TenantMaintenanceRequestCard from '../../components/TenantMaintenanceRequestCard/TenantMaintenanceRequestCard';

type Props = {};

const TenantMaintenanceRequestScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <TenantMaintenanceRequestCard />
      </View>
    </SafeAreaView>
  );
};

export default TenantMaintenanceRequestScreen;
