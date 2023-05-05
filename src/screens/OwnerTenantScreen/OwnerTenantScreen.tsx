import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import OwnerTenantsCard from '../../components/OwnerTenantsCard/OwnerTenantsCard';
import {useOwnerAllTenantListMutation} from '../../features/auth/auth';
import {OwnerTenantListData} from '../../features/types';

type Props = {};

const OwnerTenantScreen = (props: Props) => {
  const [tenantList, setTenantList] = useState<OwnerTenantListData>([]);
  const [page, setPage] = useState(1);

  const [ownerAllTenantList] = useOwnerAllTenantListMutation();

  const allTenants = async () => {
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
  };

  const reGetTenants = async () => {
    setPage(page + 1);
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
  };

  useEffect(() => {
    allTenants();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={tenantList}
          keyExtractor={({item, index}) => (item?.id + index).toString()}
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
      </View>
    </View>
  );
};

export default OwnerTenantScreen;
