import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  imagesDatas: Array<object>;
  imageUrl: string;
  imageType: string;
  imageCaption: string;
  item: object;
  setImageDatas: (a: Array<object>) => void;
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
        source={{uri: props.imageUrl}}
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
          console.log('pressed', props.imagesDatas);
          let a = props.imagesDatas;

          const i = a.indexOf(props.item);
          console.log(i);
          if (i > -1) {
            // only splice array when item is found
            a.splice(i, 1); // 2nd parameter means remove one item only
          }

          props.setImageDatas(a);
        }}>
        <FontAwesomeIcon icon={faX} size={14} />
      </TouchableOpacity>
    </View>
  );
};

export default AddPropertyImageCard;
