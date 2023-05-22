import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import RentedPropertyCard from '../../components/RentedPropertyCard/RentedPropertyCard';

type Props = {};

const RentedPropertyScreen = (props: Props) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <RentedPropertyCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RentedPropertyScreen;
