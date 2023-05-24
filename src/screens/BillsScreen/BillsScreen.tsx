import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import BillsCard from '../../components/BillsCard/BillsCard';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useOwnerAllBillListMutation} from '../../features/auth/auth';
import {OwnerBillList} from '../../features/types';

type Props = {};

const BillsScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [AllBills, setAllBills] = useState<OwnerBillList>();
  const [page, setPage] = useState(2);

  const [getAllBills] = useOwnerAllBillListMutation();

  const getAllData = async () => {
    setLoading(true);
    try {
      await getAllBills({page: 1, limit: 10})
        .unwrap()
        .then(res => {
          console.log(res.data.data);
          if (res.success) {
            // setMaintenanceList(res.data.data);
            setAllBills(res?.data?.data);
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
      await getAllBills({page: page, limit: 10})
        .unwrap()
        .then(res => {
          console.log(res.data.data);
          if (res.success) {
            setAllBills(res?.data?.data);

            // setMaintenanceList(res.data.data);
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
          data={AllBills}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={AllBills?.length > 5 && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            AllBills?.length > 4 && reGetAllData();
          }}
          renderItem={({item, index}) => (
            <BillsCard
              key={item.id + index.toString()}
              bill_ref_number={item.bill_ref_number}
              total_payable_amount={item.total_payable_amount}
              payment_date={item.payment_date}
              is_paid={item.is_paid}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BillsScreen;
