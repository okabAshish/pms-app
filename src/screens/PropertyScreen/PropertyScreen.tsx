import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import AddFloatingButton from '../../components/AddFloatingButton/AddFloatingButton';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import {useOwnerPropertiesMutation} from '../../features/auth/auth';
import {OwnerPropertyListData} from '../../features/types';

type Props = {};

const PropertyScreen = (props: Props) => {
  const navigation = useNavigation();

  const [propertyList, setPropertyList] = useState<OwnerPropertyListData>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(2);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(onEndReachedCalledDuringMomentum, propertyList.length, page);

  const [getAllOwnerProperties] = useOwnerPropertiesMutation();

  const getProperties = async () => {
    setLoading(true);
    try {
      await getAllOwnerProperties({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          if (res.success) {
            setTotal(res.data.meta.total);
            setPropertyList(res?.data?.data);
            setTotal(res.data?.meta.total);
            // setPage(page + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetProperties = async () => {
    console.log('Run????');
    // setLoading(true);
    setPage(page + 1);
    try {
      await getAllOwnerProperties({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: OwnerPropertyListData = [
              ...propertyList,
              ...res?.data?.data,
            ];
            setPropertyList(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getProperties();
  }, [props?.route]);

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

  // console.log(propertyList.length !== total);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 0}}>
        <FlatList
          data={propertyList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={propertyList.length !== total && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            propertyList.length !== total && reGetProperties();
          }}
          renderItem={({item, index}) => (
            <PropertyCard
              id={item?.id}
              property_id={'Prop_0000000' + item?.id}
              building_name={item?.property_name}
              key={index + item?.id}
              rented={item?.rented === 1 ? true : false}
              imageUrl={item?.property_images[0]?.photo_url}
            />
          )}
        />
        <AddFloatingButton
          onPress={() =>
            navigation.navigate('ADD', {
              screen: 'AddProperty',
              params: {
                type: 'Add',
              },
            })
          }
        />
      </View>
    </View>
  );
};

export default PropertyScreen;
