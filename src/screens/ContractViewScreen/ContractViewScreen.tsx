import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import ContractDetailsComponent from '../../components/ContractDetailsComponent/ContractDetailsComponent';
import ContractViewHeader from '../../components/ContractViewHeader/ContractViewHeader';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useGetContractDetailsMutation} from '../../features/contract/contract';
import {ContractDetails} from '../../features/contract/contractTypes';

type Props = {};

const ContractViewScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const [details, setDetatils] = useState<ContractDetails>();

  const [getContractDetails] = useGetContractDetailsMutation();

  console.log(props.id, 'CCCC');
  const getDetails = async () => {
    setLoading(true);
    try {
      await getContractDetails({params: props?.id})
        .unwrap()
        .then(res => {
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
      <ContractViewHeader />
      <ContractDetailsComponent />
    </SafeAreaView>
  );
};

export default ContractViewScreen;
