import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import AddFloatingButton from '../../components/AddFloatingButton/AddFloatingButton';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import {useOwnerPropertiesMutation} from '../../features/auth/auth';
import {OwnerPropertyListData} from '../../features/types';

type Props = {};

const PropertyScreen = (props: Props) => {
  const navigation = useNavigation();

  const [propertyList, setPropertyList] = useState<OwnerPropertyListData>([]);
  const [page, setPage] = useState(1);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  console.log(onEndReachedCalledDuringMomentum, propertyList.length, page);

  const [getAllOwnerProperties] = useOwnerPropertiesMutation();

  const getProperties = async () => {
    try {
      await getAllOwnerProperties({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          if (res.success) {
            setPropertyList(res?.data?.data);
            // setPage(page + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const reGetProperties = async () => {
    console.log('Run????');
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
  };

  useEffect(() => {
    getProperties();
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

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 0}}>
        <FlatList
          data={propertyList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            reGetProperties();
          }}
          renderItem={({item, index}) => (
            <PropertyCard
              property_id={'Prop_0000000' + item?.id}
              building_name={item?.property_name}
              key={index + item?.id}
              rented={item?.rented === 1 ? true : false}
              imageUrl={item?.property_images[0]?.photo_url}
            />
          )}
        />
        <AddFloatingButton
          onPress={() => navigation.navigate('ADD', {screen: 'AddProperty'})}
        />
      </View>
    </View>
  );
};

export default PropertyScreen;
