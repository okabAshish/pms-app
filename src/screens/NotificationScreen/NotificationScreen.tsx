import {faChevronLeft, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import NotificationScreenCard from '../../components/NotificationScreenCard/NotificationScreenCard';
import {useGetUserAllNotificationMutation} from '../../features/auth/auth';
import {NotificationUserDataList} from '../../features/types';

type Props = {};

const NotificationScreen = (props: Props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [propertyList, setPropertyList] = useState<NotificationUserDataList>(
    [],
  );

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(2);

  const [getUserAllNotification] = useGetUserAllNotificationMutation();

  const allNotification = async () => {
    setLoading(true);
    try {
      await getUserAllNotification({params: {limit: '5', page: '1'}})
        .unwrap()
        .then(res => {
          if (res.success) {
            setTotal(res.data.total);
            setPropertyList(res?.data?.data);
            // setPage(page + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetProperties = async () => {
    console.log('Run????');
    // setLoading(true);
    setPage(page + 1);
    try {
      await getUserAllNotification({
        params: {limit: '5', page: page.toString()},
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: NotificationUserDataList = [
              ...propertyList,
              ...res?.data?.data,
            ];
            setPropertyList(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    allNotification();
  }, [props?.route]);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 14,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(69, 72, 95, 0.24)',
              padding: 4,
              borderRadius: 99999,
              marginRight: 30,
            }}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            <View
              style={{
                backgroundColor: '#45485F',
                width: 26,
                height: 26,
                borderRadius: 9999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon icon={faChevronLeft} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: '#45485F',
              fontFamily: 'Poppins-Medium',
              fontSize: 24,
              height: 36,
            }}>
            Notification
          </Text>
        </View>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faEllipsisV} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={propertyList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={propertyList.length !== total && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            propertyList.length !== total && reGetProperties();
          }}
          renderItem={({item, index}) => (
            <NotificationScreenCard
              notification_message={item.notification_message}
              sender_name={item.sender_name}
              key={index + item.id.toString()}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const renderFooter = () => {
  return (
    // Footer View with Loader
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.65)',
      }}>
      <ActivityIndicator color="black" style={{margin: 15}} />
    </View>
  );
};

export default NotificationScreen;
