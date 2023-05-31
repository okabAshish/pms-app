import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import TenantContractScreenCard from '../../components/TenantContractScreenCard/TenantContractScreenCard';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useGetTenantContactListMutation} from '../../features/auth/tenant';
import {TenantContactList} from '../../features/tenantTypes';


type Props = {};

const TenantContractScreen = (props: Props) => {
  const [contactList, setContactList] = useState<TenantContactList>([],);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [getTenantContactList] = useGetTenantContactListMutation();

  const getContract = async () => {
    setLoading(true);
    try {
      await getTenantContactList({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          console.log(res);

          if (res.success) {
            setTotal(res.data.meta.total);
            setContactList(res?.data?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetContract = async () => {
    console.log('Run????');
    // setLoading(true);
    setPage(page + 1);
    try {
      await getTenantContactList({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: TenantContactList = [
              ...contactList,
              ...res?.data?.data,
            ];
            setContactList(arr);
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
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 20}}>
      <FlatList
          data={contactList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={contactList.length !== total && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            contactList.length !== total && reGetContract();
          }}
          renderItem={({item, index}) => (
            <TenantContractScreenCard
              contract_number = {item?.contract_number}
              end_date = {item?.end_date}
              owner_name = {item?.contract_owner_data?.first_name+' '+item?.contract_owner_data?.last_name}
              owner_contact = {item?.contract_owner_data?.phone}
              created_at = {item?.created_at}
            />
          )}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}; 

export default TenantContractScreen;
