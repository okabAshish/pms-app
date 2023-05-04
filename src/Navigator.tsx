import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Navigator = (props: Props) => {
  const dispatch = useDispatch();
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SignUp"
          component={isLoggedIn ? DashboardScreen : SignUpScreen}
        />
        <Stack.Screen
          name="Dashboard"
          component={isLoggedIn ? DashboardScreen : SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
