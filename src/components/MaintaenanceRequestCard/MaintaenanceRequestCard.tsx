import {faEye} from '@fortawesome/free-regular-svg-icons';
import {faListDots} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  property: string;
  tenant: string;
  priority: string;
  category: string;
  assigned_vendor: string;
  status: string;
  date: string;
  issue_details: string;
};

const MaintaenanceRequestCard = (props: Props) => {
  const navigation = useNavigation();

  const details = {
    date: props.date,
    data: [
      {
        title: 'Property',
        vale: props.property,
      },
      {
        title: 'Tenant',
        vale: props.tenant,
      },
      {
        title: 'Priority',
        vale: props.priority,
      },
      {
        title: 'Category',
        vale: props.category,
      },
      {
        title: 'Assigned Vendor',
        vale: props.assigned_vendor,
      },
      {
        title: 'Status',
        vale: props.status,
        status: props.status.toLowerCase(),
      },
    ],
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      `Are you sure you want to Complete the Request`,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            // deleteTitle();
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

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('View', {
          screen: 'Maintenance-View',
          params: {
            property: props.property,
            tenant: props.tenant,
            priority: props.priority,
            category: props.category,
            assigned_vendor: props.assigned_vendor,
            status: props.status,
            date: props.date,
            issue_details: props.issue_details,
          },
        })
      }
      style={{marginVertical: 10}}>
      <View
        style={{
          borderLeftColor: '#00ABE4',
          borderLeftWidth: 2,
          borderRadius: 6,
          backgroundColor: '#efefef',
          paddingHorizontal: 15,
          paddingVertical: 10,
          flex: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            {details.data.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginTop: 5,
                }}
                key={item.title + index.toString() + item.vale}>
                <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                  {item.title} :
                </Text>
                <Text
                  style={{
                    color: item.status
                      ? item.status === 'progress'
                        ? '#150094'
                        : item.status === 'completed'
                        ? 'green'
                        : '#red'
                      : '#484848',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    backgroundColor: item.status
                      ? item.status === 'progress'
                        ? '#CFDDFF'
                        : item.status === 'completed'
                        ? 'lightgreen'
                        : '#red'
                      : '#efefef',
                    marginLeft: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 3,
                  }}>
                  {item.vale}
                </Text>
              </View>
            ))}
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text> {dayjs(details.date).format('DD/MM/YYYY')}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 5,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(69, 72, 95, 0.24)',
                  padding: 8,
                  borderRadius: 5,
                  marginHorizontal: 8,
                }}
                onPress={() =>
                  navigation.navigate('View', {
                    screen: 'Maintenance-View',
                    params: {
                      property: props.property,
                      tenant: props.tenant,
                      priority: props.priority,
                      category: props.category,
                      assigned_vendor: props.assigned_vendor,
                      status: props.status,
                      date: props.date,
                      issue_details: props.issue_details,
                    },
                  })
                }
                >
                <FontAwesomeIcon icon={faEye} color="#45485F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(69, 72, 95, 0.24)',
                  padding: 8,
                  borderRadius: 5,
                  //   marginHorizontal: 8,
                }}
                onPress={() => showConfirmDialog()}>
                <FontAwesomeIcon icon={faListDots} color="#45485F" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MaintaenanceRequestCard;
