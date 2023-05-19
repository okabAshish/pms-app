import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BlurView} from '@react-native-community/blur';
import React, {createRef, useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {width} = Dimensions.get('window');

const PropertyViewImageGallary = () => {
  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('light');
  const backgroundImageRef = createRef();

  const _scrollView = useRef<ScrollViewProps>();

  const imgGallary = [
    {
      id: 2,
      imgUrl:
        'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
      text: 'Hii',
    },
    {
      id: 1,
      imgUrl:
        'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png',
      text: 'Hello',
    },
  ];
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      {imgGallary.map((item, index) => (
        <ImageBackground
          source={{
            uri: item.imgUrl,
          }}
          style={{
            height: 350,
            width: width - 40,
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}
          imageStyle={{borderRadius: 10}}>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                padding: 4,
                borderRadius: 9999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: 'rgba(13, 0, 0, 0.1)',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}>
            <BlurView
              viewRef={viewRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              blurType={blurType}
              blurAmount={1}
              blurRadius={1}
            />
            <Text style={{color: '#fff'}}>Hello</Text>
          </View>
        </ImageBackground>
      ))}
    </ScrollView>
  );
};

export default PropertyViewImageGallary;

const styles = StyleSheet.create({});
