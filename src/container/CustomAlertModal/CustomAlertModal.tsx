import Lottie from 'lottie-react-native';
import React from 'react';
import {Dimensions, Modal, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
const DEVICE_WIDTH = Dimensions.get('window').width;

type Props = {};

const CustomAlertModal = (props: Props) => {
  const error = useSelector(state => state.error);

  return (
    <Modal visible={true} style={{flex: 1}} transparent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.65)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 20,
            width: DEVICE_WIDTH - 100,
            flexDirection: 'column',
          }}>
          <View style={{width: '100%', height: 100}}>
            <Lottie
              source={require('../../assets/correct.json')}
              autoPlay
              loop
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              // flex: 1,
              flexWrap: 'wrap',
              width: '100%',
            }}>
            {error.message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlertModal;
