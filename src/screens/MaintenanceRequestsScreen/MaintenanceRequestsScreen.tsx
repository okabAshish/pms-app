import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import MaintaenanceRequestCard from '../../components/MaintaenanceRequestCard/MaintaenanceRequestCard';
import {useOwnerAllMaintenanceRequestListMutation} from '../../features/auth/auth';
import {OwnerMaintenanceRequestList} from '../../features/types';

type Props = {};

const MaintenanceRequestsScreen = (props: Props) => {
  const [MaintenanceList, setMaintenanceList] =
    useState<OwnerMaintenanceRequestList>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  const [getAllMaintenacelist] = useOwnerAllMaintenanceRequestListMutation();

  const getAllData = async () => {
    setLoading(true);
    try {
      await getAllMaintenacelist({page: 1, limit: 10})
        .unwrap()
        .then(res => {
          console.log(res.data.data);
          if (res.success) {
            setMaintenanceList(res.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetAllData = async () => {
    setLoading(true);
    try {
      setPage(page + 1);
      await getAllMaintenacelist({page: page, limit: 10})
        .unwrap()
        .then(res => {
          console.log(res.data.data);
          if (res.success) {
            setMaintenanceList(res.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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

  useEffect(() => {
    getAllData();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={MaintenanceList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={MaintenanceList?.length > 5 && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            MaintenanceList?.length > 5 && reGetAllData();
          }}
          renderItem={({item, index}) => (
            <MaintaenanceRequestCard
              date={item?.created_at}
              property={'Property'}
              tenant={'Tenant'}
              priority={item.maintenance_priority.priority_name}
              category={item.maintenance_category.category_name}
              assigned_vendor={item.vendor_detail.vendor_name}
              status={item.maintenance_status.status_name}
              issue_details={item.issue_details}
              key={index.toString()}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MaintenanceRequestsScreen;
