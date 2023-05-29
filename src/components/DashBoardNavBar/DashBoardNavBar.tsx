import {
  faBars,
  faBell,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  openDrawer: () => void;
}

const DashBoardNavBar = (props: Props) => {
  const navigation = useNavigation();

  const [routeName, setRouteName] = useState('Dashboard');

  const routes = useNavigationState(state => state?.routes);
  const {pageName} = useSelector(state => state?.page);

  const currentRoute = routes && routes[routes?.length - 1]?.name;

  // console.log(routes[routes?.length - 1]);

  const data = [
    [
      {
        icon: faBars,
        onPress: () => {
          console.log('Clicked');
          props.openDrawer();
        },
      },
      {
        icon: null,
        avatar: true,
        onPress: () => {
          navigation.navigate('View', {screen: 'OwnerProfile'});
        },
      },
      {
        icon: null,
        avatar: false,
        text: currentRoute ? currentRoute : 'Dashboard',
        disabled: true,
      },
    ],
    [
      {icon: faSearch, onPress: () => {}, right: true},
      {
        icon: faBell,
        onPress: () => {
          navigation.navigate('View', {screen: 'Notification'});
        },
        right: true,
        notification: true,
      },
    ],
  ];
  const {user} = useSelector(state => state.auth);

  console.log('>>>>>', pageName);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
      }}>
      {data.map((item, index) => (
        <View
          style={{flexDirection: 'row', alignItems: 'center'}}
          key={index + Math.random()}>
          {item?.map((i, h) => (
            <TouchableOpacity
              style={{marginRight: i?.notification ? 0 : 10}}
              key={h + i.icon}
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
                  <FontAwesomeIcon icon={faUser} />
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Poppins-Medium',
                    color: '#00ABE4',
                  }}>
                  {pageName}
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
