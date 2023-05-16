import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Asset} from '../UploadImage/UploadImage';

type Props = {
  imageUrl: Asset;
  imageType: string;
  imageCaption: string;
  item: object;

  onRemoved: (item: any) => void;
};

const AddPropertyImageCard = (props: Props) => {
  return (
    <View
      style={{
        position: 'relative',
        marginBottom: 10,
        marginHorizontal: 10,
      }}>
      <Image
        source={{uri: props.imageUrl.uri}}
        style={{width: 100, height: 100, borderRadius: 5}}
      />
      <Text
        style={{
          marginTop: 5,
          fontSize: 12,
          color: 'rgba(0,0,0,0.7)',
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
        }}>
        {props?.imageType}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: 'rgba(0,0,0,0.9)',
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
        }}>
        {props?.imageCaption}
      </Text>
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 9999,
          position: 'absolute',
          top: -5,
          right: -5,
          elevation: 2,
          borderWidth: 0.5,
          borderColor: '#f3f3f3',
        }}
        onPress={() => {
          props.onRemoved(props.item);
        }}>
        <FontAwesomeIcon icon={faX} size={14} />
      </TouchableOpacity>
    </View>
  );
};

export default AddPropertyImageCard;
