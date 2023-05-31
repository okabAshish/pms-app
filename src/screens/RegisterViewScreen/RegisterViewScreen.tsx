import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import DropDown from '../../components/DropDown/DropDown';
import TextInput from './TextInput';
import {useGetTitleListMutation} from '../../features/auth/auth';
import {TitleList} from '../../features/types';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useDispatch} from 'react-redux';
//import {setError} from '../../features/error/error';
import {setRegister} from '../../features/auth/authProfile';
type Props = {};

const RegisterViewScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);  
  const [index, setIndex] = React.useState(2);
  
  const [titleListData, setTitleListData] = React.useState([]);
  const [user, setUser] = React.useState({
    email: '',
    phone: '',    
    password: '',
    confirm_password: ''
  });
  const [individualDetail, setIndividualDetail] = React.useState({
    title_id: null,
    occupation: '',
    first_name: '',
    middle_name: '',
    last_name: '',
  });
  const [companyDetail, setCompanyDetail] = React.useState({    
    company_name: '',
    company_type_id: '',
    tin_or_ein: '',
    company_website: '',
    contact_person: '',
    position_in_company: ''
  });
  const [error, setError] = React.useState('');
  const [getTitleList] = useGetTitleListMutation();

  let titleArray = [];

  const nextScreen = () => {
    console.log('called');
    try {
      for (const key in user) {
        if (
          user[key] === null ||
          user[key] === '' ||
          user[key] === undefined
        ) {
          throw (Error.name = `${key} is empty`);
        }
      }
      console.log(user);
      if (index==2) {
        for (const key in individualDetail) {
          if (
            (individualDetail[key] === null ||
            individualDetail[key] === '' ||
            individualDetail[key] === undefined) && (key !== 'middle_name')
          ) {
            throw (Error.name = `${key} is empty`);
          }
        }
        //console.log(individualDetail);
      }else{
        // for (const key in companyDetail) {
        //   if (
        //     companyDetail[key] === null ||
        //     companyDetail[key] === '' ||
        //     companyDetail[key] === undefined
        //   ) {
        //     throw (Error.name = `${key} is empty`);
        //   }
        // }
        //console.log(companyDetail);
      }
      dispatch(
        setRegister({
          account_type: index == 2 ? 1 : 2,
          email: user.email,
          phone: user.phone,    
          password: user.password,
          confirm_password: user.confirm_password,
          title_id: individualDetail.title_id,
          occupation: individualDetail.occupation,
          first_name: individualDetail.first_name,
          middle_name: individualDetail.middle_name,
          last_name: individualDetail.last_name,
          company_name: companyDetail.company_name,
          company_type_id: companyDetail.company_type_id,
          tin_or_ein: companyDetail,
          company_website: companyDetail,
          contact_person: companyDetail,
          position_in_company: companyDetail
        }),
      );
      navigation.dispatch(
        CommonActions.navigate({name: 'Register-Address'}),
      );
    } catch (error) {
      console.log(error);
    }
  }

  const getTitleListData = async() => {
    setLoading(true);
    try {
      // setLoading(true);
      await getTitleList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            //setPropertyTypeList(res?.data)

            const titleListContent: TitleList = res?.data;
            const titleDropdownData: any = [];
            for (let i = 0; i < titleListContent.length; i++) {
              titleDropdownData[i] = {
                label: titleListContent[i].name,
                id: titleListContent[i].id,
                value: titleListContent[i].id,
              };
            }
            setTitleListData(titleDropdownData);
          }
        });
      // setLoading(true);
    } catch (err) {
      // dispatch(setError({error: true, message: err}));
      // setTimeout(() => {
      //   dispatch(setError({error: false, message: ''}));
      // }, 350);
      console.log(err, 'EERRRR');
    }
    setLoading(false);
  }

  useEffect(() => {
    getTitleListData();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'rgba(210, 244, 255, 0.25)'} />
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/Curve.png')}
          resizeMode="cover"
          style={{height: 140, paddingHorizontal: 20, paddingTop: 45}}>
          <Text
            style={{
              color: '#45485F',
              fontFamily: 'Poppins-Medium',
              fontSize: 24,
              height: 36,
            }}>
            Sign up
          </Text>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#0EB9F2',
                  borderRadius: 5,
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: index === 2 ? '#fff' : '#0EB9F2',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                    elevation: index === 2 ? 2 : 0,
                  }}
                  onPress={() => setIndex(2)}>
                  <Text
                    style={{
                      color: index === 2 ? '#0EB9F2' : '#fff',
                      fontFamily: 'Poppins-Medium',
                      height: 18,
                      fontSize: 12,
                    }}>
                    Individual
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: index === 3 ? '#fff' : '#0EB9F2',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                    elevation: index === 3 ? 2 : 0,
                  }}
                  onPress={() => setIndex(3)}>
                  <Text
                    style={{
                      color: index === 3 ? '#0EB9F2' : '#fff',
                      fontFamily: 'Poppins-Medium',
                      height: 18,
                      fontSize: 12,
                    }}>
                    Company
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={{marginVertical: 20, paddingHorizontal: 30}}>
          <TextInput
            label="Email Address"
            placehoder="Enter the Email"
            keyboardType="email-address"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
            value={user.email}
            onChange={val => setUser({...user, email: val.nativeEvent.text}) }
          />
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                color: '#000',
                letterSpacing: 1,
              }}>
              Phone Number
            </Text>
            <PhoneInput
              containerStyle={{
                borderBottomWidth: 1,
                width: '100%',
                backgroundColor: '#fff',
              }}
              textInputStyle={{fontFamily: 'Poppins-Regular', fontSize: 14}}
              codeTextStyle={{fontFamily: 'Poppins-Regular', fontSize: 14}}
              textContainerStyle={{backgroundColor: '#fff'}}
              value={user.phone}
              onChangeText ={val => setUser({...user, phone: val})}
            />
          </View>
          {index === 2 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginBottom: 20,
                  flex: 1,
                }}>
                  <DropDown label="Title"
                  datas={titleListData}
                  onChange={val => {
                    setIndividualDetail({...individualDetail, title_id: val});
                  }} 
                  containerStyles={{
                    flex: 1,
                    marginRight: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#000',
                  }}/>
                {/* <TextInput
                  label="Title"
                  placehoder="Mr."
                  datas={titleListData}
                  onChange={val => {
                    setIndividualDetail({...individualDetail, title_id: val});
                  }}
                  containerStyles={{
                    flex: 1,
                    marginRight: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#000',
                  }}
                /> */}
                <TextInput
                  label="Occupation"
                  placehoder=""
                  containerStyles={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#000',
                  }}
                  value={individualDetail.occupation}
                  onChange={val => setIndividualDetail({...individualDetail, occupation: val.nativeEvent.text})}
                />
              </View>
              <TextInput
                label="First Name"
                placehoder="Enter the First Name"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={individualDetail.first_name}
                onChange={val => setIndividualDetail({...individualDetail, first_name: val.nativeEvent.text})}
              />
              <TextInput
                label="Middle Name ( Optional )"
                placehoder="Enter the Middle Name"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={individualDetail.middle_name}
                onChange={val => setIndividualDetail({...individualDetail, middle_name: val.nativeEvent.text})}
              />
              <TextInput
                label="Last Name"
                placehoder="Enter the Last Name"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={individualDetail.last_name}
                onChange={val => setIndividualDetail({...individualDetail, last_name: val.nativeEvent.text})}
              />
            </View>
          ) : (
            <View style={{marginTop: 20}}>
              <TextInput
                label="Company Name"
                placehoder="Enter the Company Name"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={companyDetail.company_name}
                onChange={val => setCompanyDetail({...companyDetail, company_name: val.nativeEvent.text})}
              />
              <DropDown label="Company Type" />
              <TextInput
                label="Company TIN / EIN Number"
                placehoder="Enter Company TIN / EIN Number"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={companyDetail.tin_or_ein}
                onChange={val => setCompanyDetail({...companyDetail, tin_or_ein: val.nativeEvent.text})}
              />
              <TextInput
                label="Company Website"
                placehoder="Enter Company Website"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={companyDetail.company_website}
                onChange={val => setCompanyDetail({...companyDetail, company_website: val.nativeEvent.text})}
              />
              <TextInput
                label="Contact Person Name"
                placehoder="Enter Contact Person Name"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={companyDetail.contact_person}
                onChange={val => setCompanyDetail({...companyDetail, contact_person: val.nativeEvent.text})}
              />
              <TextInput
                label="Position In Company"
                placehoder="Enter Position In Company"
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginBottom: 20,
                }}
                value={companyDetail.position_in_company}
                onChange={val => setCompanyDetail({...companyDetail, position_in_company: val.nativeEvent.text})}
              />
            </View>
          )}

          <TextInput
            label="Password"
            placehoder="Enter the Password"
            // keyboardType="visible-password"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
            secureTextEntry={true}
            value={user.password}
            onChange={val => setUser({...user, password: val.nativeEvent.text})}
          />
          <TextInput
            label="Confirm password"
            placehoder="Enter the Confirm Password"
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
            secureTextEntry={true}
            value={user.confirm_password}
            onChange={val => setUser({...user, confirm_password: val.nativeEvent.text})}
          />

          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                letterSpacing: 1,
                color: 'red',
              }}>
              {error}
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 5,
                backgroundColor: 'rgba(0, 171, 228, 0.24)',
                marginRight: 20,
              }}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  letterSpacing: 0.6,
                  lineHeight: 15,
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 5,
                backgroundColor: '#00ABE4',
              }}
              onPress={() => {
                nextScreen()
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  letterSpacing: 0.6,
                  lineHeight: 15,
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterViewScreen;
