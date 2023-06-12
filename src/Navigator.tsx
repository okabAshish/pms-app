/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
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
import BillsScreen from './screens/BillsScreen/BillsScreen';
import ContractPDFView from './screens/ContractPDFView/ContractPDFView';
import ContractViewScreen from './screens/ContractViewScreen/ContractViewScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from './screens/ForgotPasswordScreen/NewPasswordScreen';
import OTPVerification from './screens/ForgotPasswordScreen/OTPVerification';
import InvitationScreen from './screens/InvitationScreen/InvitationScreen';
import InviteTenantScreen from './screens/InviteTenantScreen/InviteTenantScreen';
import MaintenanceRequestsScreen from './screens/MaintenanceRequestsScreen/MaintenanceRequestsScreen';
import MainternanceRequestViewScreen from './screens/MainternanceRequestViewScreen/MainternanceRequestViewScreen';
import NotificationScreen from './screens/NotificationScreen/NotificationScreen';
import OwnerContractsScreen from './screens/OwnerContractsScreen/OwnerContractsScreen';
import OwnerTenantScreen from './screens/OwnerTenantScreen/OwnerTenantScreen';
import PropertyScreen from './screens/PropertyScreen/PropertyScreen';
import PropertyViewScreen from './screens/PropertyViewScreen/PropertyViewScreen';
import RegisterAddressViewScreen from './screens/RegisterViewScreen/RegisterAddressViewScreen';
import RegisterViewScreen from './screens/RegisterViewScreen/RegisterViewScreen';
import RentedPropertyScreen from './screens/RentedPropertyScreen/RentedPropertyScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import SliderComponent from './screens/SliderComponent/SliderComponent';
import TenantSliderComponent from './screens/SliderComponent/TenantSliderComponent';
import TenantAddMaintenanceRequestScreen from './screens/Tenant/TenantAddMaintenanceRequestScreen/TenantAddMaintenanceRequestScreen';
import PropertyInvitation from './screens/Tenant/TenantPropertyInvitation/TenantPropertyInvitation';
import TenantBillScreen from './screens/TenantBillScreen/TenantBillScreen';
import TenantContractScreen from './screens/TenantContractScreen/TenantContractScreen';
import TenantMaintenanceRequestScreen from './screens/TenantMaintenanceRequestScreen/TenantMaintenanceRequestScreen';
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen';

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

  const auth = useSelector(state => state.auth);

  // console.log(auth);

  const [isLoggedIn, setIsLoggedIn] = useState(logIn);
  const [loading, setLoading] = useState(false);
  const [deaf, setdeaf] = useState(false);
  const [userRole, setUserRole] = useState(2);

  const getData = async () => {
    setLoading(true);
    setdeaf(true);
    try {
      // setLoading(true);
      //AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      if (token !== null) {
        // value previously stored
        let _user = await AsyncStorage.getItem('user');
        const role_id = JSON.parse(_user).user_details.role_id;
        console.log(role_id);
        console.log(JSON.parse(_user), 'asdasdas');
        setUserRole(role_id);
        //let user = JSON.parse(_user);
        dispatch(setUser(_user));
        dispatch(setToken(token));
        dispatch(setLoggedIn(true));
        setIsLoggedIn(true);
      }
      // setLoading(true);
    } catch (e) {
      // error reading value
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();

    setIsLoggedIn(logIn);
  }, [logIn]);

  if (loading) {
    return <LoadingModal />;
  }

  // console.log(isLoggedIn, userRole);

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
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
          />

          <Stack.Screen
            name="AddProperty-2"
            component={AddPropertyDetailsScreen}
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
          />
          <Stack.Screen
            name="AddProperty-3"
            component={AddPropertyFurnishingScreen}
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
          />
          <Stack.Screen
            name="AddProperty-4"
            component={AddPropertyAmenitiesScreen}
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
          />
          <Stack.Screen
            name="AddProperty-5"
            component={AddPropertyAddionalDetailsScreen}
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
          />
          <Stack.Screen
            name="AddProperty-6"
            component={AddPropertyAddressDetailsScreen}
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
          />
          <Stack.Screen
            name="AddProperty-7"
            component={AddPropertyImages}
            options={r => {
              return {
                title: `${r.route.params?.type} Property`,
              };
            }}
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
          <Stack.Screen
            name="AddMaintenanceRequest"
            component={TenantAddMaintenanceRequestScreen}
            options={() => ({
              title: 'Add Maintenance Request',
            })}
          />
        </Stack.Navigator>
      </>
    );
  };

  const ViewScreen = () => {
    return (
      <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Property-View" component={PropertyViewScreen} />
          <Stack.Screen name="Contract-View" component={ContractViewScreen} />
          <Stack.Screen
            name="Maintenance-View"
            component={MainternanceRequestViewScreen}
          />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="OwnerProfile" component={UserProfileScreen} />
          <Stack.Screen name="Contract-PDF-View" component={ContractPDFView} />
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
            name="Dashboard"
            component={isLoggedIn ? DashboardScreen : SignUpScreen}
          />
          <Stack.Screen name="Property" component={PropertyScreen} />
          <Stack.Screen name="Tenant" component={OwnerTenantScreen} />
          <Stack.Screen name="Contracts" component={OwnerContractsScreen} />
          <Stack.Screen
            name="Tenant-Contracts"
            component={TenantContractScreen}
          />
          <Stack.Screen
            name="Tenant-Rented-Property"
            component={RentedPropertyScreen}
          />

          <Stack.Screen
            name="Tenant-Maintenance-Request"
            component={TenantMaintenanceRequestScreen}
          />

          <Stack.Screen name="Tenant-Bill" component={TenantBillScreen} />

          <Stack.Screen name="Invitation-List" component={InvitationScreen} />
          <Stack.Screen
            name="Maintenance"
            component={MaintenanceRequestsScreen}
          />
          <Stack.Screen name="Bill" component={BillsScreen} />

          <Stack.Screen
            name="Property-Invitation"
            component={PropertyInvitation}
          />
        </Stack.Navigator>
      </>
    );
  };

  console.log('is log', isLoggedIn);
  console.log('userRole', userRole);

  const Main = () => {
    return (
      <>
        <Drawer
          ref={drawer}
          drawerWidth={300}
          renderNavigationView={
            () =>
              userRole === 2 ? (
                <SliderComponent
                  closeDrawer={() => drawer.current?.closeDrawer()}
                />
              ) : (
                <TenantSliderComponent
                  closeDrawer={() => drawer.current?.closeDrawer()}
                />
              )
            //userRole === 2 ? console.log('owner') : console.log('tenant')
          }>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Main"
              component={isLoggedIn ? DashboardMenus : SignUpScreen}
            />
            <Stack.Screen name="ADD" component={AddMenus} />
            <Stack.Screen name="View" component={ViewScreen} />
          </Stack.Navigator>
        </Drawer>
      </>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <>
          <Stack.Screen
            name="Main"
            component={isLoggedIn ? Main : SignUpScreen}
          />
          <Stack.Screen
            name="SignUp"
            component={isLoggedIn ? DashboardScreen : SignUpScreen}
          />
          <Stack.Screen
            name="Register"
            component={isLoggedIn ? DashboardScreen : RegisterViewScreen}
          />
          <Stack.Screen
            name="Register-Address"
            component={isLoggedIn ? DashboardScreen : RegisterAddressViewScreen}
          />
          <Stack.Screen
            name="Reset-Password"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="OTP-Verification" component={OTPVerification} />
          <Stack.Screen name="New-Password" component={NewPasswordScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
