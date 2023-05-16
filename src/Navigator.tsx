/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  DrawerLayoutAndroid as Drawer,
  TouchableOpacity,
  View,
} from 'react-native';

import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DashBoardNavBar from './components/DashBoardNavBar/DashBoardNavBar';
import LoadingModal from './components/LoadingModal/LoadingModal';
import {setLoggedIn, setToken, setUser} from './features/auth/authProfile';
import AddNewContractDetailsScreen from './screens/AddNewContractScreen/AddNewContractDetailsScreen';
import AddNewContractDetailsSlabScreen from './screens/AddNewContractScreen/AddNewContractDetailsSlabScreen';
import AddNewContractScreen from './screens/AddNewContractScreen/AddNewContractScreen';
import AddNewContractTenantScreen from './screens/AddNewContractScreen/AddNewContractTenantScreen';
import AddNewContractTermsCondition from './screens/AddNewContractScreen/AddNewContractTermsCondition';
import AddPropertyAddionalDetailsScreen from './screens/AddPropertyScreen/AddPropertyAddionalDetailsScreen';
import AddPropertyAddressDetailsScreen from './screens/AddPropertyScreen/AddPropertyAddressDetailsScreen';
import AddPropertyAmenitiesScreen from './screens/AddPropertyScreen/AddPropertyAmenitiesScreen';
import AddPropertyDetailsScreen from './screens/AddPropertyScreen/AddPropertyDetailsScreen';
import AddPropertyFurnishingScreen from './screens/AddPropertyScreen/AddPropertyFurnishingScreen';
import AddPropertyImages from './screens/AddPropertyScreen/AddPropertyImages';
import AddPropertyScreen from './screens/AddPropertyScreen/AddPropertyScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import InvitationScreen from './screens/InvitationScreen/InvitationScreen';
import InviteTenantScreen from './screens/InviteTenantScreen/InviteTenantScreen';
import OwnerContractsScreen from './screens/OwnerContractsScreen/OwnerContractsScreen';
import OwnerTenantScreen from './screens/OwnerTenantScreen/OwnerTenantScreen';
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
  // const navigation = useNavigation();
  const routeNameRef = React.createRef();
  const navigationRef = React.useRef();

  const drawer = useRef<Drawer>(null);
  const {isLoggedIn: logIn} = useSelector(state => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(logIn);
  const [loading, setLoading] = useState(false);
  const [deaf, setdeaf] = useState(false);

  const getData = async () => {
    setLoading(true);
    setdeaf(true);
    try {
      //AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
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

  !isLoggedIn && !deaf && getData();

  if (loading) {
    return <LoadingModal />;
  }

  // console.log(isLoggedIn, routeNameRef, navigationRef);

  const AddMenus = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerShown: true,
            headerStyle: {backgroundColor: '#45485F'},
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitleAlign: 'center',

            headerShadowVisible: false,
            headerLeft: ({canGoBack}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    height: 38,
                    width: 38,
                    borderRadius: 9999,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                  }}
                  onPress={() => {
                    if (canGoBack) {
                      navigation.goBack();
                    }
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 28,
                      width: 28,
                      borderRadius: 9999,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon icon={faChevronLeft} size={14} />
                  </View>
                </TouchableOpacity>
              );
            },
          })}>
          <Stack.Screen
            name="AddProperty"
            component={AddPropertyScreen}
            options={() => ({
              title: 'Add Property',
            })}
          />

          <Stack.Screen
            name="AddProperty-2"
            component={AddPropertyDetailsScreen}
            options={() => ({
              title: 'Add Property',
            })}
          />
          <Stack.Screen
            name="AddProperty-3"
            component={AddPropertyFurnishingScreen}
            options={() => ({
              title: 'Add Property',
            })}
          />
          <Stack.Screen
            name="AddProperty-4"
            component={AddPropertyAmenitiesScreen}
            options={() => ({
              title: 'Add Property',
            })}
          />
          <Stack.Screen
            name="AddProperty-5"
            component={AddPropertyAddionalDetailsScreen}
            options={() => ({
              title: 'Add Property',
            })}
          />
          <Stack.Screen
            name="AddProperty-6"
            component={AddPropertyAddressDetailsScreen}
            options={() => ({
              title: 'Add Property',
            })}
          />
          <Stack.Screen
            name="AddProperty-7"
            component={AddPropertyImages}
            options={() => ({
              title: 'Add Property',
            })}
          />
          <Stack.Screen
            name="InviteTenant"
            component={InviteTenantScreen}
            options={() => ({
              title: 'Invite Tenant',
            })}
          />

          <Stack.Screen
            name="AddContract-1"
            component={AddNewContractScreen}
            options={() => ({
              title: 'Add Contract',
            })}
          />

          <Stack.Screen
            name="AddContract-2"
            component={AddNewContractTenantScreen}
            options={() => ({
              title: 'Add Contract',
            })}
          />
          <Stack.Screen
            name="AddContract-3"
            component={AddNewContractDetailsScreen}
            options={() => ({
              title: 'Add Contract',
            })}
          />
          <Stack.Screen
            name="AddContract-4"
            component={AddNewContractDetailsSlabScreen}
            options={() => ({
              title: 'Add Contract',
            })}
          />
          <Stack.Screen
            name="AddContract-5"
            component={AddNewContractTermsCondition}
            options={() => ({
              title: 'Add Contract',
            })}
          />
        </Stack.Navigator>
      </>
    );
  };

  const DashboardMenus = () => {
    return (
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
          <Stack.Screen name="Tenant" component={OwnerTenantScreen} />
          <Stack.Screen name="Contracts" component={OwnerContractsScreen} />
          <Stack.Screen name="Invitation-List" component={InvitationScreen} />
        </Stack.Navigator>
      </>
    );
  };

  console.log('is log', isLoggedIn);

  return (
    <NavigationContainer>
      <Drawer
        ref={drawer}
        drawerWidth={300}
        renderNavigationView={() => <SliderComponent />}>
        <>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={DashboardMenus} />
            <Stack.Screen name="ADD" component={AddMenus} />
          </Stack.Navigator>
        </>
      </Drawer>
    </NavigationContainer>
  );
};

export default Navigator;
