import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import PropertyViewAddress from '../../components/PropertyViewAddress/PropertyViewAddress';
import PropertyViewApplication from '../../components/PropertyViewApplication/PropertyViewApplication';
import PropertyViewImageGallary from '../../components/PropertyViewImageGallary/PropertyViewImageGallary';
import PropertyViewInfo from '../../components/PropertyViewInfo/PropertyViewInfo';
import {useGetOwnerPropertyDetailsMutation} from '../../features/auth/owner';
import {OwnerPropertyDetailsData} from '../../features/ownerTypes';

type Props = {};

const PropertyViewScreen = (props: Props) => {
  //console.log(props, 'CCCC');
  const [loading, setLoading] = useState(false);

  const [details, setDetatils] = useState<OwnerPropertyDetailsData>();
  const [property_images, setPropertyImages] = useState([]);

  const [OwnerPropertyDetails] = useGetOwnerPropertyDetailsMutation();
  const getDetails = async () => {
    setLoading(true);
    //console.log(props?.route?.params?.id, 'xxx');
    try {
      await OwnerPropertyDetails({param: props?.route?.params?.id})
        .unwrap()
        .then(res => {
          //console.log(res);

          if (res.success) {
            let a = [];

            setDetatils(res.data);

            for (let i = 0; i < res.data.property_images.length; i++) {
              a.push({
                imgUrl: res.data.property_images[i].media[0].original_url,
                text: res.data.property_images[i].image_caption,
                text2: res.data.property_images[i].image_category?.name,
              });
            }

            setPropertyImages(a);
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
        <PropertyViewImageGallary imges={property_images} />
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <PropertyViewApplication
            property_built_year={props.property_built_year}
            parking_available={details?.parking_available == 1 ? 'Yes' : 'No'}
            no_of_bedrooms={details?.no_of_bedrooms}
            no_of_bathroom={details?.no_of_bathroom}
            balcony_terrace={details?.balcony_terrace == 1 ? 'Yes' : 'No'}
          />
          <PropertyViewAddress
            state_name={details?.state_name}
            city_name={details?.city_name}
            zip={details?.zip}
            address_one={details?.address_one}
            address_two={details?.address_two}
          />
          <PropertyViewInfo
            property_name={details?.property_name}
            property_type_name={details?.property_type_name}
            property_size={details?.property_size}
            hoa_fee={details?.hoa_fee}
            hoa_fee_type={details?.hoa_fee_type}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewScreen;
