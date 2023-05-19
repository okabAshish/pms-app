import {faEdit, faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import { isDayjs } from 'dayjs';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  id: number;
  property_id: string;
  building_name: string;
  rented: boolean;
  imageUrl: string;
}

const defaultProps: Props = {
  id: 0,
  property_id: 'Prop_00000001',
  building_name: 'N/A',
  rented: false,
  imageUrl:
    'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
};

const PropertyCard = (props: Props) => {
  const navigation = useNavigation();

  const [imgeUrl, setimgeUrl] = useState(props?.imageUrl);
  console.log(props);
  return (
    <TouchableOpacity
      style={{
        borderLeftWidth: 2,
        borderColor: '#00ABE4',
        backgroundColor: '#f5f5f5',
        borderRadius: 9,
        marginTop: 20,
      }}
      onPress={() => {
        navigation.navigate('View', {
          screen: 'Preoperty-View',
         {params:{ id: props.id}}
        })
      }}>
      <View style={{paddingHorizontal: 12, paddingVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <Image
              source={{
                uri: imgeUrl
                  ? imgeUrl
                  : 'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
              }}
              style={{
                width: 130,
                height: 103,
                borderRadius: 9,
                resizeMode: 'cover',
              }}
              onError={() =>
                setimgeUrl(
                  'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
                )
              }
            />
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => {
                  navigation.navigate('View', {
                    screen: 'Preoperty-View',
                    id: props.id,
                  })
                }}
                style={{
                  backgroundColor: 'rgba(69, 72, 95, 0.4)',
                  padding: 4,
                  borderRadius: 3,
                  marginRight: 8,
                }}>
                <FontAwesomeIcon
                  icon={faEye}
                  color="rgba(0, 0, 0, 0.5)"
                  size={12}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0, 171, 228, 0.24)',
                  padding: 4,
                  borderRadius: 3,
                }}>
                <FontAwesomeIcon icon={faEdit} color="#00ABE4" size={12} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 9,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Property ID :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.property_id}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Building Name :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.building_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: props.rented ? '#20C997' : 'red',
                  fontSize: 14,
                  textTransform: 'capitalize',
                }}>
                {props.rented ? 'Rented' : 'Not Rented'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PropertyCard.defaultProps = defaultProps;

export default PropertyCard;
