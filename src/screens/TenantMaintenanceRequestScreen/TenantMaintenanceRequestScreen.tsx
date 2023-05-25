import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import TenantMaintenanceRequestCard from '../../components/TenantMaintenanceRequestCard/TenantMaintenanceRequestCard';
import {useGetMaintenanceRequestMutation} from '../../features/auth/tenant';
import {MaintenanceRequestList} from '../../features/tenantTypes';
import LoadingModal from '../../components/LoadingModal/LoadingModal';


type Props = {};

const TenantMaintenanceRequestScreen = (props: Props) => {
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceRequestList>([],);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [getMaintenanceRequest] = useGetMaintenanceRequestMutation();

  const getMaintenance = async () => {
    setLoading(true);
    try {
      await getMaintenanceRequest({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          console.log(res);

          if (res.success) {
            setMaintenanceList(res?.data?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetMaintenance = async () => {
    console.log('Run????');
    // setLoading(true);
    setPage(page + 1);
    try {
      await getMaintenanceRequest({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: MaintenanceRequestList = [
              ...maintenanceList,
              ...res?.data?.data,
            ];
            setMaintenanceList(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getMaintenance();
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
            data={maintenanceList}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              reGetMaintenance();
            }}
            renderItem={({item, index}) => (
              <TenantMaintenanceRequestCard
                property_name= {item?.property_details?.property_name}
                priority= {item?.maintenance_priority?.priority_name}
                category= {item?.maintenance_category?.category_name}
                issue_date= {item?.issue_date}
                assign_vendor= {item?.vendor_detail?.vendor_name}
                status= {item?.maintenance_status?.status_name}
              />
            )}
          />        
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenantMaintenanceRequestScreen;
