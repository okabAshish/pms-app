import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import DatePicketInput from '../../../components/DatePicketInput/DatePicketInput';
import DropDown from '../../../components/DropDown/DropDown';
import Input from '../../../components/Input/Input';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';
import {Asset} from '../../../components/UploadImage/UploadImage';
import {
  useAddMaintenanceRequestMutation,
  useGetMaintenaceRequestDetailsMutation,
  useGetMaintenanceDropdownListMutation,
} from '../../../features/auth/tenant';
import {setRefreshKey} from '../../../features/pageName/pageName';
import {AddMaintenanceRequestResponseData} from '../../../features/tenantTypes';
import {RootState} from '../../../store';

type Props = {};

const TenantAddMaintenanceRequestScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const key = useSelector<RootState>(s => s.page.refreshKey);

  const [filePath, setFilePath] = useState<Asset>(props?.filePath);
  const [date, setDate] = useState(Date.now());
  const [issue_details, setIssueDetails] = useState('');
  const [property_id, setpropertyId] = useState('');
  const [maint_category_id, setMaintenanceCategoryId] = useState('');
  const [priorty_id, setPriorityId] = useState('');
  const [properties, setProperties] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Priorities, setPriorities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [getAllDatas] = useGetMaintenanceDropdownListMutation();
  const [getAllMaintenaceDetails] = useGetMaintenaceRequestDetailsMutation();

  const [addRequest, {error: w, originalArgs}] =
    useAddMaintenanceRequestMutation();

  console.log(
    properties.find(val => val),
    property_id,
    'ID-1',
  );

  const openLibrary = async () => {
    setError('');
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    await launchImageLibrary(options, (response: Response) => {
      //   console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(`${response.errorMessage}`);
        return;
      }
      //   console.log('base64 -> ', response.assets.base64);
      //   console.log('uri -> ', response.assets[0].uri);
      //   console.log('width -> ', response.assets[0].width);
      //   console.log('height -> ', response.assets[0].height);
      //   console.log('fileSize -> ', response.assets[0].fileSize);
      //   console.log('type -> ', response.assets[0].type);
      //   console.log('fileName -> ', response.assets[0].fileName);
      //   console.log(response);
      //   props.setImage(response.assets[0]);
      setFilePath(response.assets[0]);
    });
  };

  let imageType = ['image/png', 'image/jpg', 'image/jpeg'];

  const getAllDropDownData = async () => {
    try {
      await getAllDatas({})
        .unwrap()
        .then(res => {
          console.log(res, '!RES');
          if (res.success) {
            let a = [];
            for (let i = 0; i < res.data?.maintenance_property.length; i++) {
              a.push({
                id: res.data?.maintenance_property[i].id,
                label:
                  res.data?.maintenance_property[i].contract_properties_data
                    ?.property_name,
                value:
                  res.data?.maintenance_property[i].contract_properties_data
                    ?.property_id,
              });
            }
            setProperties(a);
            let b = [];
            for (let h = 0; h < res.data?.maintenance_category.length; h++) {
              b.push({
                id: res.data?.maintenance_category[h].id,
                label: res.data?.maintenance_category[h].category_name,
                value: res.data?.maintenance_category[h].id,
              });
            }
            setCategories(b);
            let c = [];
            for (let h = 0; h < res.data?.maintenance_priority.length; h++) {
              c.push({
                id: res.data?.maintenance_priority[h].id,
                label: res.data?.maintenance_priority[h].priority_name,
                value: res.data?.maintenance_priority[h].id,
              });
            }
            setPriorities(c);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSettingData = async () => {
    setLoading(true);
    try {
      await getAllMaintenaceDetails({
        params: {
          id: props.route?.params?.id,
        },
      })
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            setIssueDetails(res.data.issue_details);
            setpropertyId(res.data.property_id);
            setMaintenanceCategoryId(res.data.maint_category_id);
            setPriorityId(res.data.priority_id);
            setDate(res.data.issue_date);
            let img = {
              type: res.data.media[0].mime_type,
              uri: res.data.media[0].original_url,
            };
            setFilePath(img);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleAddRequest = async () => {
    try {
      if (!filePath) {
        setError('Please Add Image');
        return;
      }
      let fd = new FormData();

      let a = {
        issue_details: issue_details,
        property_id: property_id,
        maint_category_id: maint_category_id,
        priority_id: priorty_id,
        issue_date: dayjs(date).format('DD/MM/YYYY'),
        is_image_added: true,
      };

      for (const key in a) {
        if (!a[key]) {
          setError(`${key.replace('_', ' ')} is missing`);
        }
      }

      for (const i in a) {
        fd.append(i, a[i]);
      }

      fd.append('image', {
        name: filePath.fileName,
        type: filePath.type,
        uri: filePath.uri,
      });

      console.log(fd);

      await addRequest(fd)
        .unwrap()
        .then((res: AddMaintenanceRequestResponseData) => {
          console.log(res);
          if (res.success) {
            dispatch(setRefreshKey(key + 1));
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Tenant-Maintenance-Request',
                params: {
                  refresh: key,
                },
              }),
            );
          }
        });
    } catch (err) {
      console.log(err.data);
    }
  };

  const handleEditRequest = async () => {
    try {
      if (!filePath) {
        setError('Please Add Image');
        return;
      }
      let fd = new FormData();

      let is_image_added = false;

      if (filePath.uri.includes('file://')) {
        is_image_added = true;
        fd.append('image', {
          name: filePath.fileName,
          type: filePath.type,
          uri: filePath.uri,
        });
      }

      let a = {
        id: props.route?.params?.id,
        issue_details: issue_details,
        property_id: property_id,
        maint_category_id: maint_category_id,
        priority_id: priorty_id,
        issue_date: dayjs(date).format('DD/MM/YYYY'),
        is_image_added: is_image_added,
      };

      for (const key in a) {
        if (!a[key] && key !== 'is_image_added') {
          setError(`${key.replace('_', ' ')} is missing`);
        }
      }

      for (const i in a) {
        fd.append(i, a[i]);
      }

      console.log(fd);

      await addRequest(fd)
        .unwrap()
        .then((res: AddMaintenanceRequestResponseData) => {
          console.log(res);
          if (res.success) {
            dispatch(setRefreshKey(key + 1));
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Tenant-Maintenance-Request',
                params: {
                  refresh: key,
                },
              }),
            );
          }
        });
    } catch (err) {
      console.log(err.data);
    }
  };

  useEffect(() => {
    getAllDropDownData();
    if (props.route.params.type === 'Edit') {
      handleSettingData();
    }
  }, []);

  console.log(filePath);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'#45485F'} barStyle="light-content" />
      <View style={{paddingHorizontal: 20, paddingTop: 14}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Issue Details"
            placehoder="Enter Issue Details"
            inputProps={{multiline: true}}
            inputStyles={{
              maxHeight: 120,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              color: '#000',
            }}
            onChange={e => {
              setError('');

              setIssueDetails(e.nativeEvent.text);
            }}
            value={issue_details}
          />
          <DropDown
            label="Property"
            datas={properties}
            onChange={e => {
              setError('');

              setpropertyId(e);
            }}
            value={property_id}
          />
          <DropDown
            label="Maintenance Category"
            datas={Categories}
            onChange={e => {
              setError('');

              setMaintenanceCategoryId(e);
            }}
            value={maint_category_id}
          />
          <DropDown
            label="Maintenance Priority"
            datas={Priorities}
            onChange={e => {
              setError('');

              setPriorityId(e);
            }}
            value={priorty_id}
          />
          <DatePicketInput
            label="Issue Date"
            value={dayjs(date).format('DD/MM/YYYY')}
            onChange={e => {
              setError('');
              setDate(e);
            }}
          />
          <Text
            style={{
              color: '#45485F',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              marginTop: 10,
              marginBottom: 5,
            }}>
            Support Document
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f5',
              flex: 1,
              height: 180,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
            onPress={openLibrary}>
            {imageType.includes(filePath?.type) ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: filePath?.uri}}
                    style={{
                      width: 120,
                      height: 120,
                      resizeMode: 'contain',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <View style={{marginLeft: -20}}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: '#efefef',
                        flexDirection: 'row',
                        elevation: 1,
                        shadowColor: 'rgba(0,0,0,0.6)',
                        padding: 5,
                        backgroundColor: '#fff',
                        borderRadius: 9999,
                      }}
                      onPress={() => {
                        setFilePath(null);
                      }}>
                      <FontAwesomeIcon icon={faX} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text
                  style={{
                    color: '#45485F',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    marginTop: 10,
                    marginBottom: 5,
                  }}>
                  Re - Upload Image
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: '#45485F',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                Upload Image
              </Text>
            )}
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
              }}>
              {error}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 24,
                paddingVertical: 6,
                marginBottom: 20,
                backgroundColor: '#20c997',
                borderRadius: 5,
              }}
              onPress={() => {
                if (props.route.params.type === 'Add') {
                  handleAddRequest();
                } else {
                  handleEditRequest();
                }
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TenantAddMaintenanceRequestScreen;
