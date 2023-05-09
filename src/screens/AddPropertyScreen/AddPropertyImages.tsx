import {
  faCheck,
  faChevronLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddPropertyImageCard from '../../components/AddPropertyImageCard/AddPropertyImageCard';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import UploadImage, {Asset} from '../../components/UploadImage/UploadImage';

interface ImageData {
  imageUrl?: string;
  imageType?: string;
  imageCaption?: string;
}

interface ImageDatas extends Array<ImageData> {}

type Props = {};

const AddPropertyImages = (props: Props) => {
  const navigation = useNavigation();

  const [filePath, setFilePath] = useState<Asset>();
  const [imageData, setImageData] = useState<ImageData>({});

  const [imageDatas, setImageDatas] = useState<ImageDatas>([]);
  const [dropDownValue, setDropDownValue] = useState<any>(null);
  const [value, setValue] = useState<any>(null);

  console.log(value, 'imgDATA');

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <ScrollView
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
          //   flex: 2,
          minHeight: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#00ABE4',
              height: 32,
              width: 32,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 21,
              }}>
              4
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Images
          </Text>
        </View>

        <View style={{marginVertical: 20}}>
          {imageDatas && imageDatas?.length > 0 && (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {imageDatas?.map((item: ImageData, index) => {
                return (
                  <AddPropertyImageCard
                    key={index.toString()}
                    setImageDatas={(i: ImageDatas) => setImageDatas(i)}
                    imageType={item?.imageType as string}
                    imageCaption={item.imageCaption as string}
                    imageUrl={item.imageUrl}
                    imagesDatas={imageDatas}
                    item={item}
                  />
                );
              })}
            </View>
          )}

          <UploadImage
            setImage={asset => {
              //   console.log(asset);
              setFilePath(asset);
              setImageData({...imageData, imageUrl: asset.uri});
            }}
            filePath={filePath}
          />
          <DropDown
            label="Select Image Type"
            onChange={type => {
              setImageData({...imageData, imageType: type});
              setDropDownValue(type);
            }}
            value={dropDownValue}
          />
          <Input
            label="Image Caption"
            onChange={e => {
              setImageData({...imageData, imageCaption: e.nativeEvent.text});
              setValue(e.nativeEvent.text);
            }}
            value={value}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 24,
            }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#45485F',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9999,
              }}
              onPress={() => {
                let a: ImageDatas = [];
                a = [
                  ...imageDatas,
                  {
                    imageCaption: imageData?.imageCaption,
                    imageType: imageData?.imageType,
                    imageUrl: imageData?.imageUrl,
                  },
                ];

                setImageDatas(a);
                setImageData({imageUrl: '', imageCaption: '', imageType: ''});
                setFilePath({} as Asset);
                setDropDownValue(null);
                setValue(null);
              }}>
              <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              marginVertical: 32,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#45485F',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon icon={faChevronLeft} size={12} color="#fff" />
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 5,
                  color: '#fff',
                }}>
                Previous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 24,
                paddingVertical: 5,
                backgroundColor: '#00ABE4',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('AddProperty-5')}>
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginRight: 5,
                  color: '#fff',
                }}>
                Save
              </Text>
              <FontAwesomeIcon icon={faCheck} size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPropertyImages;
