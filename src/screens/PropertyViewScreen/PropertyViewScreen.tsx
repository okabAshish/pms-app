import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import PropertyViewAddress from '../../components/PropertyViewAddress/PropertyViewAddress';
import PropertyViewApplication from '../../components/PropertyViewApplication/PropertyViewApplication';
import PropertyViewImageGallary from '../../components/PropertyViewImageGallary/PropertyViewImageGallary';
import PropertyViewInfo from '../../components/PropertyViewInfo/PropertyViewInfo';

type Props = {};

const PropertyViewScreen = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 15,
      }}>
      <ScrollView>
        <PropertyViewImageGallary />
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <PropertyViewApplication />
          <PropertyViewAddress />
          <PropertyViewInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewScreen;
