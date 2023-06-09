import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import AddFloatingButton from '../../components/AddFloatingButton/AddFloatingButton';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import OwnerTenantsCard from '../../components/OwnerTenantsCard/OwnerTenantsCard';
import {useOwnerAllTenantListMutation} from '../../features/auth/auth';
import {OwnerTenantListData} from '../../features/types';

type Props = {};

const OwnerTenantScreen = (props: Props) => {
  const navigation = useNavigation();

  const [tenantList, setTenantList] = useState<OwnerTenantListData>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [ownerAllTenantList] = useOwnerAllTenantListMutation();

  const allTenants = async () => {
    setLoading(true);
    try {
      await ownerAllTenantList({page: page, limit: 5})
        .unwrap()
        .then(res => {
          if (res.success) {
            setTenantList(res?.data?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetTenants = async () => {
    // setLoading(true);
    setPage(page + 1);
    try {
      await ownerAllTenantList({page: page, limit: 5})
        .unwrap()
        .then(res => {
          if (res.success) {
            let arr: OwnerTenantListData = [...tenantList, ...res?.data?.data];
            setTenantList(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    allTenants();
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
          data={tenantList}
          keyExtractor={({item, index}) => (item?.id + index).toString()}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            total !== tenantList.length && reGetTenants();
          }}
          ListFooterComponent={total !== tenantList.length && renderFooter}
          renderItem={({item, index}) => (
            <OwnerTenantsCard
              tenant_id={'TNT_0000000' + item?.id}
              tenant_type={
                item?.account_type === 1
                  ? 'Individual'
                  : item?.account_type === 2
                  ? 'Company'
                  : item?.account_type === 3
                  ? 'Multi Occupant'
                  : ''
              }
              name={
                item?.first_name +
                ' ' +
                item?.middle_name +
                ' ' +
                item?.last_name
              }
              email={item?.email}
              phone={item?.phone}
            />
          )}
        />
        <AddFloatingButton
          onPress={() => navigation.navigate('ADD', {screen: 'InviteTenant'})}
        />
      </View>
    </View>
  );
};

export default OwnerTenantScreen;
