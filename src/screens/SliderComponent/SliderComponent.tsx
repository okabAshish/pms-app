import {
  faChevronDown,
  faChevronRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setPageName} from '../../features/pageName/pageName';

type Props = {};

const SliderComponent = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [active, setActive] = useState('Dashboard');
  const [subMenu, setSubMenu] = useState(false);

  const menu = [
    {
      name: 'Dashboard',
      slug: 'Dashboard',
      show: true,
      type: 'Menu',
      icon: require('../../assets/images/icons/category.svg'),
      onPress: () => {
        dispatch(setPageName('Dashboard'));
        setActive('Dashboard');
        navigation.dispatch(CommonActions.navigate({name: 'Dashboard'}));
      },
    },
    {
      name: 'Property',
      slug: 'Property',
      type: 'Menu',
      show: true,
      icon: require('../../assets/images/icons/flats.svg'),
      onPress: () => {
        dispatch(setPageName('Property'));

        setActive('Property');
        navigation.dispatch(CommonActions.navigate({name: 'Property'}));
      },
    },
    {
      name: 'Tenant',
      slug: 'Tenant',
      type: 'Menu',
      icon: require('../../assets/images/icons/user.svg'),
      extraAttow: faChevronRight,
      show: true,
      onPress: () => {
        setSubMenu(!subMenu);
      },
    },

    {
      name: 'Tenant List',
      slug: 'Tenant-List',
      type: 'Sub-Menu',
      show: subMenu,
      onPress: () => {
        dispatch(setPageName('Tenant List'));

        setActive('Tenant-List');
        navigation.dispatch(CommonActions.navigate({name: 'Tenant'}));
      },
    },
    {
      name: 'Invitation List',
      slug: 'Invitation-List',
      type: 'Sub-Menu',
      show: subMenu,
      onPress: () => {
        dispatch(setPageName('Invitation List'));
        navigation.dispatch(CommonActions.navigate({name: 'Invitation-List'}));
        setActive('Invitation-List');
      },
    },
    {
      name: 'Invitation',
      slug: 'Invitation',
      icon: require('../../assets/images/icons/user.svg'),
      onPress: () => {
        dispatch(setPageName('Invitation'));

        setActive('Invitation');
        navigation.dispatch(CommonActions.navigate({name: 'Invitation'}));
      },
    },
    {
      name: 'Contract',
      type: 'Menu',
      slug: 'Contract',
      show: true,
      icon: require('../../assets/images/icons/documenttext.svg'),
      onPress: () => {
        dispatch(setPageName('Contract'));

        setActive('Contract');
        navigation.dispatch(CommonActions.navigate({name: 'Contracts'}));
      },
    },
    {
      name: 'Maintenance Request',
      type: 'Menu',
      slug: 'Maintenance-Request',
      show: true,
      icon: require('../../assets/images/icons/linkcircle.svg'),
      onPress: () => {
        dispatch(setPageName('Maintenance Request'));

        setActive('Maintenance-Request');
      },
    },
    {
      name: 'Bills',
      type: 'Menu',
      slug: 'Bills',
      show: true,
      icon: require('../../assets/images/icons/bill.svg'),
      onPress: () => {
        dispatch(setPageName('Bills'));

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
          {menu.map((item, index) => {
            if (item?.show) {
              return (
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
                      marginLeft: item?.type === 'Sub-Menu' ? 15 : 0,
                    }}>
                    {item.name}
                  </Text>
                  {item?.extraAttow && (
                    <FontAwesomeIcon
                      icon={!subMenu ? faChevronRight : faChevronDown}
                      size={10}
                      style={{marginLeft: 8, alignSelf: 'center'}}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
              );
            }
          })}
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
