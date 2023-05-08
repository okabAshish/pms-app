import React from 'react';
import {StatusBar, Text, View} from 'react-native';

type Props = {};

const AddPropertyScreen = (props: Props) => {
  return (
    <View style={{backgroundColor: '#45485F', flex: 1}}>
      <StatusBar backgroundColor={'#45485F'} barStyle="light-content" />
      <View>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 20,
            flex: 1,
            minHeight: '100%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#00ABE4',
                height: 50,
                width: 50,
                borderRadius: 9999,
              }}>
              <Text style={{color: '#fff'}}>1</Text>
            </View>
            <Text style={{color: '#00ABE4'}}>Property</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddPropertyScreen;
