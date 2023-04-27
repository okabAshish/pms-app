import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

type Props = {};

const LoadingModal = (props: Props) => {
  return (
    <Modal visible={true} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.75)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#fff',
            height: 80,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={32} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
