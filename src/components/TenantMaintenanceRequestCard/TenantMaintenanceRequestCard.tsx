import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useDeleteMaintenanceRequestMutation} from '../../features/auth/tenant';
import {setRefreshKey} from '../../features/pageName/pageName';

interface Props {
  property_name: string;
  priority: string;
  category: string;
  issue_date: string;
  assign_vendor: string;
  status: string;
  id: string;
  refresh: () => void;
}

const defaultProps: Props = {
  id: '1',
  property_name: 'N/A',
  priority: 'N/A',
  category: 'N/A',
  issue_date: 'N/A',
  assign_vendor: 'N/A',
  status: 'N/A',
};

const TenantMaintenanceRequestCard = (props: Props) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const [deleteMaintenanceRequest] = useDeleteMaintenanceRequestMutation();

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      `Are you sure you want to delete the Request`,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            deleteCard();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const deleteCard = async () => {
    try {
      await deleteMaintenanceRequest({params: {id: props.id}})
        .unwrap()
        .then(res => {
          if (res.success) {
            props.refresh();
            dispatch(setRefreshKey((oldKey: number) => oldKey + 1));
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Tenant-Maintenance-Request',
              }),
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const openMenu = () => {
    console.log('open');
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  const menuDetails = [
    {
      name: 'Edit',
      onPress: () => {
        setVisible(false);
        navigation.navigate('ADD', {
          screen: 'AddMaintenanceRequest',
          params: {
            type: 'Edit',
            id: props.id,
          },
        });
      },
    },
    {
      name: 'View',
      onPress: () => {
        setVisible(false);
      },
    },

    {
      name: 'Delete',
      onPress: () => {
        setVisible(false);
        showConfirmDialog();
      },
    },
  ];

  // console.log(props);
  return (
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderColor: '#00ABE4',
        backgroundColor: '#f5f5f5',
        borderRadius: 9,
        marginTop: 20,
      }}>
      <View style={{paddingHorizontal: 12, paddingVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                  }}>
                  Property Name :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.property_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                  }}>
                  Priority :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.priority}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                  }}>
                  Category :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.category}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                  }}>
                  Issue Date :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {dayjs(props.issue_date).format('DD MMM, YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                  }}>
                  Assigned Vendor :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.assign_vendor}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    marginRight: 10,
                  }}>
                  Status :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: props.status ? '#54d2ab' : '#f56a4a',
                    fontSize: 14,
                    textTransform: 'capitalize',
                    paddingHorizontal: 5,
                    backgroundColor: props.status ? '#d5eee7' : '#f8b0b0',
                  }}>
                  {props.status}
                </Text>
              </View>
            </View>

            {props.status !== 'Completed' && (
              <View style={{flex: 1}}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchorPosition="bottom"
                    contentStyle={{
                      zIndex: 9999,
                      // marginTop: -70,
                      // marginLeft: -30,
                    }}
                    anchor={
                      <TouchableOpacity onPress={() => setVisible(true)}>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          color="#00ABE4"
                          size={12}
                        />
                      </TouchableOpacity>
                    }>
                    {menuDetails.map((item, index) => {
                      return (
                        <Menu.Item
                          key={item.name + index}
                          onPress={item.onPress}
                          title={item.name}
                          titleStyle={{
                            fontSize: 12,
                            fontFamily: 'Poppins-Medium',
                          }}
                          contentStyle={{
                            paddingHorizontal: 10,
                            paddingVertical: 0,
                            marginHorizontal: 0,
                            marginVertical: 0,
                          }}
                          style={{
                            paddingHorizontal: 0,
                            paddingVertical: 0,
                            marginHorizontal: 0,
                            marginVertical: 0,
                            height: 24,
                          }}
                        />
                      );
                    })}
                  </Menu>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TenantMaintenanceRequestCard;
