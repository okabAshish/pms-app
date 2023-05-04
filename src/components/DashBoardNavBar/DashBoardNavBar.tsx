import {faBars, faBell, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

type Props = {};

const DashBoardNavBar = (props: Props) => {
  const navigation = useNavigation();

  const data = [
    [
      {
        icon: faBars,
        onPress: () => {
          console.log('Clicked');
          navigation.dispatch(DrawerActions.openDrawer());
        },
      },
      {icon: null, avatar: true, onPress: () => {}},
      {icon: null, avatar: false, text: 'Dashboard', disabled: true},
    ],
    [
      {icon: faSearch, onPress: () => {}, right: true},
      {icon: faBell, onPress: () => {}, right: true, notification: true},
    ],
  ];
  const {user} = useSelector(state => state.auth);

  console.log(user?.first_name?.split('')[0] + user?.last_name?.split('')[0]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {data.map((item, index) => (
        <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
          {item?.map((i, h) => (
            <TouchableOpacity
              style={{marginRight: i?.notification ? 0 : 10}}
              key={h}
              disabled={i?.disabled}
              onPress={i.onPress}>
              {i.icon ? (
                <View
                  style={{
                    backgroundColor: i?.right ? '#45485F' : null,
                    width: 24,
                    height: 24,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 99999,
                    position: 'relative',
                  }}>
                  <FontAwesomeIcon
                    icon={i.icon}
                    size={i?.right ? 14 : 20}
                    color={i?.right ? '#fff' : '#45485F'}
                  />
                  {i?.notification && (
                    <View
                      style={{
                        backgroundColor: 'red',
                        width: 5,
                        height: 5,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        borderRadius: 99999,
                      }}></View>
                  )}
                </View>
              ) : i.avatar ? (
                <View
                  style={{
                    backgroundColor: '#efefef',
                    width: 28,
                    height: 28,
                    borderRadius: 9999,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#00ABE4',
                    borderWidth: 0.5,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    shadowColor: 'rgba(0,0,0,0.75)',
                  }}>
                  {user?.profile_photo ? (
                    <Image
                      source={{uri: user?.profile_photo}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  ) : (
                    <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                      {user?.first_name?.split('')[0] +
                        user?.last_name?.split('')[0]}
                    </Text>
                  )}
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Poppins-Medium',
                    color: '#00ABE4',
                  }}>
                  {i.text}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default DashBoardNavBar;
