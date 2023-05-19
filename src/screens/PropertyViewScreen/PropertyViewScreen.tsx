import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import PropertyViewAddress from '../../components/PropertyViewAddress/PropertyViewAddress';
import PropertyViewApplication from '../../components/PropertyViewApplication/PropertyViewApplication';
import PropertyViewImageGallary from '../../components/PropertyViewImageGallary/PropertyViewImageGallary';
import PropertyViewInfo from '../../components/PropertyViewInfo/PropertyViewInfo';
import {useGetOwnerPropertyDetailsMutation} from '../../features/auth/owner';
import {OwnerPropertyDetailsData} from '../../features/ownerTypes';
import LoadingModal from '../../components/LoadingModal/LoadingModal';

type Props = {};

const PropertyViewScreen = (props: Props) => {
  console.log(props.id, 'CCCC');
  const [loading, setLoading] = useState(false);

  const [details, setDetatils] = useState<OwnerPropertyDetailsData>();

  const [OwnerPropertyDetails] = useGetOwnerPropertyDetailsMutation();
  const getDetails = async () => {
    setLoading(true);
    console.log(props?.id, 'xxx');
    try {
      await OwnerPropertyDetails({param: props?.id})
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
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 15,
      }}>
      <ScrollView>
        <PropertyViewImageGallary />
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <PropertyViewApplication />
          <PropertyViewAddress />
          <PropertyViewInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewScreen;
