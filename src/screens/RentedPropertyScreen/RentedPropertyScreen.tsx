import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import RentedPropertyCard from '../../components/RentedPropertyCard/RentedPropertyCard';
import {useGetRentedPropertyMutation} from '../../features/auth/tenant';
import {RentedPropertyList} from '../../features/tenantTypes';

type Props = {};

const RentedPropertyScreen = (props: Props) => {
  const [rentedPropertyData, setRentedPropertyData] =
    useState<RentedPropertyList>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [getRentedProperty] = useGetRentedPropertyMutation();

  const getProperty = async () => {
    setLoading(true);
    try {
      await getRentedProperty({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          console.log(res);

          if (res.success) {
            setTotal(res.data.meta.total);
            setRentedPropertyData(res?.data?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetProperty = async () => {
    console.log('Run????');
    // setLoading(true);
    setPage(page + 1);
    try {
      await getRentedProperty({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: RentedPropertyList = [
              ...rentedPropertyData,
              ...res?.data?.data,
            ];

            setRentedPropertyData(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getProperty();
  }, []);

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

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <FlatList
          data={rentedPropertyData}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            total !== rentedPropertyData.length && renderFooter
          }
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            total !== rentedPropertyData.length && reGetProperty();
          }}
          renderItem={({item, index}) => (
            <RentedPropertyCard
              contract_number={item?.contract_number}
              start_date={item?.start_date}
              end_date={item?.end_date}
              owner_name={
                item?.contract_owner_data?.first_name +
                ' ' +
                item?.contract_owner_data?.last_name
              }
              property_name={item?.contract_properties_data?.property_name}
              owner_contact={item?.contract_owner_data?.phone}
              contract_status={item?.contract_status_name?.name}
              address={
                item?.contract_properties_data?.city +
                ' ' +
                item?.contract_properties_data?.state +
                ' ' +
                item?.contract_properties_data?.country +
                ' ' +
                item?.contract_properties_data?.zip
              }
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RentedPropertyScreen;
