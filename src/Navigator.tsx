import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {DrawerLayoutAndroid as Drawer} from 'react-native';

import DashBoardNavBar from './components/DashBoardNavBar/DashBoardNavBar';
import LoadingModal from './components/LoadingModal/LoadingModal';
import {setLoggedIn, setToken, setUser} from './features/auth/authProfile';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import PropertyScreen from './screens/PropertyScreen/PropertyScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import SliderComponent from './screens/SliderComponent/SliderComponent';

type Props = {};

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
};

const Navigator = (props: Props) => {
  const dispatch = useDispatch();

  const drawer = useRef<Drawer>(null);
  const {isLoggedIn: logIn} = useSelector(state => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(logIn);
  const [loading, setLoading] = useState(false);
  const [deaf, setdeaf] = useState(false)

  const getData = async () => {
    setLoading(true);
    setdeaf(true)
    try {
      //AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      console.log('token',token);
      if (token !== null) {
        // value previously stored
        let _user = await AsyncStorage.getItem('user');

        //let user = JSON.parse(_user);
        dispatch(setUser(_user));
        dispatch(setToken(token));
        dispatch(setLoggedIn(true));
        setIsLoggedIn(true);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
    setLoading(false);
  };

 
  !isLoggedIn && !deaf &&  getData();


  if (loading) {
    return <LoadingModal />;
  }

  console.log('is log',isLoggedIn);

  return (
    <NavigationContainer>
      <Drawer
        ref={drawer}
        drawerWidth={300}
        renderNavigationView={() => <SliderComponent />}>
        <>
          <DashBoardNavBar openDrawer={() => drawer.current?.openDrawer()} />
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="SignUp"
              component={isLoggedIn ? DashboardScreen : SignUpScreen}
            />
            <Stack.Screen
              name="Dashboard"
              component={isLoggedIn ? DashboardScreen : SignUpScreen}
            />
            <Stack.Screen name="Property" component={PropertyScreen} />
          </Stack.Navigator>
        </>
      </Drawer>
    </NavigationContainer>
  );
};

export default Navigator;
