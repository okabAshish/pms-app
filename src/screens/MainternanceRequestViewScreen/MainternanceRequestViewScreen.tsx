import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

type Props = {
  property: string;
  tenant: string;
  priority: string;
  category: string;
  assigned_vendor: string;
  status: string;
  date: string;
  issue_details: string;
};

const MainternanceRequestViewScreen = p => {
  const navigation = useNavigation();

  let props: Props = p.route?.params;

  const details = [
    {
      title: 'Issue Details',
      vale: props.issue_details,
    },
    {
      title: 'Property',
      vale: props.property,
    },
    {
      title: 'Tenant',
      vale: props.tenant,
    },
    {
      title: 'Priority',
      vale: props.priority,
    },
    {
      title: 'Category',
      vale: props.category,
    },
    {
      title: 'Assigned Vendor',
      vale: props.assigned_vendor,
    },
    {
      title: 'Status',
      vale: props.status,
      status: props?.status?.toLowerCase(),
    },
    {
      title: 'Issue Date',
      vale: props.date,
    },
  ];

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView style={{paddingHorizontal: 20, paddingTop: 10}}>
        <View>
          <Image
            source={{uri: 'https://property.okab.ae/storage/31/NEARLY2.jpg'}}
            style={{
              width: DEVICE_WIDTH - 40,
              height: 300,
              resizeMode: 'cover',
              borderRadius: 9,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              position: 'absolute',
              top: 10,
              left: 10,
              padding: 6,
              borderRadius: 99999,
              zIndex: 99,
            }}
            onPress={() => {
              if (navigation.canGoBack()) {
                return navigation.goBack();
              }
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 9999,
                width: 24,
                height: 24,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // padding: 5,
              }}>
              <FontAwesomeIcon icon={faChevronLeft} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#f3f3f3',
            marginTop: 32,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 4,
          }}>
          {details.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text style={{color: '#000', fontFamily: 'Poppins-Medium'}}>
                {item.title} :{' '}
              </Text>
              <Text
                style={{
                  color: '#474747',
                  fontFamily: 'Poppins-Regular',
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {item.vale}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#212c3f',
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}>
            <Text style={{color: '#fff', fontFamily: 'Poppins-Regular'}}>
              Change Progress
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainternanceRequestViewScreen;
