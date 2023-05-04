import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

type Props = {};

const SliderComponent = (props: Props) => {
  const navigation = useNavigation();

  const [active, setActive] = useState('Dashboard');

  const menu = [
    {
      name: 'Dashboard',
      slug: 'Dashboard',
      icon: require('../../assets/images/icons/category.svg'),
      onPress: () => {
        setActive('Dashboard');
        navigation.dispatch(CommonActions.navigate({name: 'Dashboard'}));
      },
    },
    {
      name: 'Property',
      slug: 'Property',
      icon: require('../../assets/images/icons/flats.svg'),
      onPress: () => {
        setActive('Property');
        navigation.dispatch(CommonActions.navigate({name: 'Property'}));
      },
    },
    {
      name: 'Tenant',
      slug: 'Tenant',
      icon: require('../../assets/images/icons/user.svg'),
      onPress: () => {
        setActive('Tenant');
      },
    },
    {
      name: 'Invitation',
      slug: 'Invitation',
      icon: require('../../assets/images/icons/user.svg'),
      onPress: () => {
        setActive('Invitation');
        navigation.dispatch(CommonActions.navigate({name: 'Invitation'}));
      },
    },
    {
      name: 'Contract',
      slug: 'Contract',
      icon: require('../../assets/images/icons/documenttext.svg'),
      onPress: () => {
        setActive('Contract');
      },
    },
    {
      name: 'Maintenance Request',
      slug: 'Maintenance-Request',
      icon: require('../../assets/images/icons/linkcircle.svg'),
      onPress: () => {
        setActive('Maintenance-Request');
      },
    },
    {
      name: 'Bills',
      slug: 'Bills',
      icon: require('../../assets/images/icons/bill.svg'),
      onPress: () => {
        setActive('Bills');
      },
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#31344A',
        padding: 20,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          width: 60,
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 6,
        }}>
        <Image source={require('../../assets/images/logo-white.png')} />
      </View>

      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 18,
          backgroundColor: 'rgba(243, 243, 243, 0.14)',
          borderRadius: 3,
        }}>
        <FontAwesomeIcon icon={faSearch} color="#fff" />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 5,
            color: '#fff',
          }}
          placeholderTextColor="#efefef"
          placeholder="Search..."
        />
      </View>

      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          {menu.map((item, index) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 3,
                borderWidth: 1,
                marginTop: 10,
                borderColor: active === item.slug ? '#fff' : '#31344A',
                alignItems: 'center',
              }}
              key={index + item.slug}
              onPress={item.onPress}>
              <Image source={item.icon} style={{width: 10, height: 10}} />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 500,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,

              marginTop: 10,

              alignItems: 'center',
            }}
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('user');
              navigation.dispatch(CommonActions.navigate({name: 'SignUp'}));
            }}>
            <Image
              source={require('../../assets/images/icons/category.svg')}
              style={{width: 10, height: 10}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SliderComponent;
