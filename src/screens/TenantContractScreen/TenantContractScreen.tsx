import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import TenantContractScreenCard from '../../components/TenantContractScreenCard/TenantContractScreenCard';

type Props = {};

const TenantContractScreen = (props: Props) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <TenantContractScreenCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenantContractScreen;
