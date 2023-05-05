import React from 'react';
import {View} from 'react-native';
import OwnerContractCard from '../../components/OwnerContractCard/OwnerContractCard';

type Props = {};

const OwnerContractsScreen = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <OwnerContractCard />
      </View>
    </View>
  );
};

export default OwnerContractsScreen;
