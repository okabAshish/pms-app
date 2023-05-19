import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import AddFloatingButton from '../../components/AddFloatingButton/AddFloatingButton';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import OwnerContractCard from '../../components/OwnerContractCard/OwnerContractCard';
import {useGetOwnerContractListMutation} from '../../features/auth/owner';
import {OwnerContractList} from '../../features/ownerTypes';
//import relativeTime from 'dayjs/plugin/relativeTime';

//dayjs.extend(relativeTime);
type Props = {};

const OwnerContractsScreen = (props: Props) => {
  const navigation = useNavigation();
  const [contractList, setContractList] = useState<OwnerContractList>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [getOwnerContractList] = useGetOwnerContractListMutation();

  const getContract = async () => {
    setLoading(true);
    try {
      await getOwnerContractList({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          console.log(res);

          if (res.success) {
            setContractList(res?.data?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetContract = async () => {
    // setLoading(true);
    console.log('Run????');
    setPage(page + 1);
    try {
      await getOwnerContractList({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            console.log(res);
            let arr: OwnerContractList = [...contractList, ...res?.data?.data];
            setContractList(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getContract();
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={contractList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            reGetContract();
          }}
          renderItem={({item, index}) => (
            <OwnerContractCard
              contract_id={item?.id}
              tenant_name={
                item?.contract_tenant_data?.title +
                ' ' +
                item?.contract_tenant_data?.first_name +
                ' ' +
                item?.contract_tenant_data?.last_name
              }
              contract_number={item?.contract_number}
              contract_type={item?.contract_type_name?.name}
              total_monthly_rent={item?.total_monthly_amt}
              start_date={item?.start_date}
              last_date={item?.end_date}
              created_at={dayjs(item.created_at).format('D MMM, YYYY h:mm A')}
              status={item?.contract_status_name?.name}
              status_id={item?.contract_status_name?.id}
              action={item?.contract_tenant_data?.first_name}
              vacant={item?.mark_as_vacant}
            />
          )}
        />
        <AddFloatingButton
          backgroundColor="#45485F"
          onPress={() => navigation.navigate('ADD', {screen: 'AddContract-1'})}
        />
      </View>
    </View>
  );
};

export default OwnerContractsScreen;
