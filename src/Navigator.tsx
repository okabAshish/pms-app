import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from './components/LoadingModal/LoadingModal';
import {setLoggedIn, setToken, setUser} from './features/auth/authProfile';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';

type Props = {};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = (props: Props) => {
  const dispatch = useDispatch();
  const {isLoggedIn: logIn} = useSelector(state => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(logIn);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');

      if (token !== null) {
        // value previously stored
        let _user = await AsyncStorage.getItem('user');

        let user = JSON.parse(_user);
        dispatch(setUser(user));
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

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

  console.log(isLoggedIn);

  const DrawerNavStack = () => {
    return (
      <Drawer.Navigator
        initialRouteName="SignUp"
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SignUp"
          component={isLoggedIn ? DrawerNavStack : SignUpScreen}
        />
        <Drawer.Screen
          name="Dashboard"
          component={isLoggedIn ? DrawerNavStack : SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
