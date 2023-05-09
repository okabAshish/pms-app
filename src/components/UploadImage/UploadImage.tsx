import {faImage, faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  setImage: (asset: Asset) => void;
  filePath?: Asset;
};

export type Asset = {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
};

interface Assets extends Array<Asset> {}

type Response = {
  assets: Assets;
  didCancel: string;
  errorCode: string;
  errorMessage: string;
};

const UploadImage = (props: Props) => {
  const [filePath, setFilePath] = useState<Asset>(props?.filePath);

  console.log(filePath);

  useEffect(() => {
    setFilePath(props.filePath);
  }, [props.filePath]);

  const openLibrary = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    await launchImageLibrary(options, (response: Response) => {
      //   console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(`${response.errorMessage}`);
        return;
      }
      //   console.log('base64 -> ', response.assets.base64);
      //   console.log('uri -> ', response.assets[0].uri);
      //   console.log('width -> ', response.assets[0].width);
      //   console.log('height -> ', response.assets[0].height);
      //   console.log('fileSize -> ', response.assets[0].fileSize);
      //   console.log('type -> ', response.assets[0].type);
      //   console.log('fileName -> ', response.assets[0].fileName);
      //   console.log(response);
      props.setImage(response.assets[0]);
      setFilePath(response.assets[0]);
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: 4,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => openLibrary()}>
        {!filePath?.uri ? (
          <FontAwesomeIcon icon={faImage} size={32} />
        ) : (
          <>
            <Image
              source={{uri: filePath?.uri}}
              style={{width: '100%', height: 200, borderRadius: 4}}
            />
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 9999,
                position: 'absolute',
                top: 10,
                right: 10,
                elevation: 2,
                borderWidth: 0.5,
                borderColor: '#f3f3f3',
              }}
              onPress={() => setFilePath({} as Asset)}>
              <FontAwesomeIcon icon={faX} size={14} />
            </TouchableOpacity>
          </>
        )}
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Poppins-Medium',
            marginTop: 10,
          }}>
          Upload Image
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;
