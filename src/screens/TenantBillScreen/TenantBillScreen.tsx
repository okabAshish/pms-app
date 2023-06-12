import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import TenantBillCard from '../../components/TenantBillCard/TenantBillCard';
import {useGetTransactionListMutation} from '../../features/auth/tenant';
import {TransactionListData} from '../../features/tenantTypes';

type Props = {};

const TenantBillScreen = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(0);

  const [data, setData] = useState<TransactionListData>([]);

  const [getTransactionList] = useGetTransactionListMutation();

  const getTransactions = async () => {
    setloading(true);
    try {
      await getTransactionList({
        params: {
          limit: '5',
          page: '1',
        },
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            setData(res.data.data);
            setTotal(res.data.total);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };

  const reGetTransactions = async () => {
    setloading(true);
    try {
      await getTransactionList({
        params: {
          limit: '5',
          page: page,
        },
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            setData(res.data.data);
            setPage(page + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          keyExtractor={(item, index) => item.id + index.toString()}
          data={data}
          ListFooterComponent={total !== data?.length && renderFooter()}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            total !== data?.length && reGetTransactions();
          }}
          renderItem={({item, index}) => (
            <TenantBillCard
              key={index + item.id}
              transaction_amount={item.transaction_amount.toString()}
              transaction_number={item.transaction_number}
              created_at={item.created_at}
              status={item.transaction_status}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TenantBillScreen;
