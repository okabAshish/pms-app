import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import ContractDetailsComponent from '../../components/ContractDetailsComponent/ContractDetailsComponent';
import ContractViewHeader from '../../components/ContractViewHeader/ContractViewHeader';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useGetContractDetailsMutation} from '../../features/contract/contract';
import {ContractDetails} from '../../features/contract/contractTypes';

type Props = {};

const ContractViewScreen = (props: Props) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [details, setDetatils] = useState<ContractDetails>();

  const [getContractDetails] = useGetContractDetailsMutation();

  // console.log(, 'CCCC');
  const getDetails = async () => {
    setLoading(true);
    try {
      await getContractDetails({params: props?.route?.params?.id})
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            setDetatils(res.data);
          }
        });
    } catch (err) {
      console.log(err, '<><>');
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <StatusBar backgroundColor={'#0EB9F2'} />
      <ScrollView>
        <ContractViewHeader
          contract_number={details?.contract_number}
          property_type={details?.contract_properties_data?.property_type}
          created_at={details?.created_at}
        />
        <ContractDetailsComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContractViewScreen;
