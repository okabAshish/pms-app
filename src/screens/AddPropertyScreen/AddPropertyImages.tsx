import {
  faCheck,
  faChevronLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AddPropertyImageCard from '../../components/AddPropertyImageCard/AddPropertyImageCard';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import UploadImage, {Asset} from '../../components/UploadImage/UploadImage';
import {useGetImageCategoryListMutation} from '../../features/auth/auth';
import {useAddPropertyMutation} from '../../features/auth/owner';
import {AddPropertyResponseData} from '../../features/ownerTypes';
import {RootState} from '../../store';

interface ImageData {
  imageUrl: Asset;
  imageType?: string;
  imageCaption?: string;
}

interface ImageDatas extends Array<ImageData> {}

type Props = {};

const AddPropertyImages = (props: Props) => {
  const navigation = useNavigation();
  const property = useSelector<RootState>(state => state.owner);

  const [filePath, setFilePath] = useState<Asset>();
  const [imageData, setImageData] = useState<ImageData>();

  const [imageDatas, setImageDatas] = useState<ImageDatas>([]);
  const [imageTypes, setImageTypes] = useState([]);
  const [dropDownValue, setDropDownValue] = useState<any>(null);
  const [removed, setRemoved] = useState<ImageData>();
  const [value, setValue] = useState<any>(null);

  const [getImageCategoryList] = useGetImageCategoryListMutation();
  const [addproperty] = useAddPropertyMutation();

  const remove = v => {
    let a = imageDatas;

    console.log(a, 'refresh');

    const i = a.indexOf(v);
    if (i > -1) {
      // only splice array when item is found
      a.splice(i, 1); // 2nd parameter means remove one item only
    }

    setImageDatas(a);
    setRemoved({} as ImageData);
  };

  const getImageCategory = async () => {
    try {
      await getImageCategoryList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];
            for (let i = 0; i < res.data.length; i++) {
              a.push({
                label: res.data[i].name,
                value: res.data[i].id,
                id: res.data[i].id,
              });
            }
            setImageTypes(a);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const fd = new FormData();

      for (const key in property) {
        fd.append(key, property[key]);
      }

      for (let i = 0; i < imageDatas.length; i++) {
        fd.append(`property_image_file_${i + 1}`, {
          name: imageDatas[i].imageUrl.fileName,
          type: imageDatas[i].imageUrl.type,
          uri: imageDatas[i].imageUrl.uri,
        });
        fd.append(`image_category_id_${i + 1}`, imageDatas[i].imageType);
        fd.append(`image_caption_${i + 1}`, imageDatas[i].imageCaption);
      }

      await addproperty({body: fd})
        .unwrap()
        .then((res: AddPropertyResponseData) => {
          if (res?.success) {
            console.log(res);
          }
        });

      console.log(fd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    remove(removed);
  }, [removed?.imageUrl]);

  useEffect(() => {
    getImageCategory();
  }, []);

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
                    onRemoved={v => setRemoved(v)}
                    imageType={item?.imageType as string}
                    imageCaption={item.imageCaption as string}
                    imageUrl={item.imageUrl}
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
              setImageData({...imageData, imageUrl: asset});
            }}
            filePath={filePath}
          />
          <DropDown
            label="Select Image Type"
            datas={imageTypes}
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
                let a: ImageDatas = imageDatas;

                a = [
                  ...a,
                  {
                    imageCaption: imageData?.imageCaption,
                    imageType: imageData?.imageType,
                    imageUrl: imageData?.imageUrl as Asset,
                  },
                ];

                setImageDatas(a);
                setImageData({
                  imageUrl: {} as Asset,
                  imageCaption: '',
                  imageType: '',
                });
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
              onPress={() => {
                handleSave();
              }}>
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
