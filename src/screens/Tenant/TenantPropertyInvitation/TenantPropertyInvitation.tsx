import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';
import TenantInvitationCard from '../../../components/Tenant/TenantInvitationCard/TenantInvitationCard';
import {useGetPropertyInvitationMutation} from '../../../features/auth/tenant';
import {PropertyInvitationList} from '../../../features/tenantTypes';

type Props = {}; 

const InvitationScreen = (props: Props) => {
  const [invitationList, setInvitationList] = useState<PropertyInvitationList>(
    [],
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [getPropertyInvitation] = useGetPropertyInvitationMutation();

  const getInvitation = async () => {
    setLoading(true);
    try {
      await getPropertyInvitation({limit: 5, page: 1})
        .unwrap()
        .then(res => {
          console.log(res);

          if (res.success) {
            setTotal(res.data.meta.total);
            setInvitationList(res?.data?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const reGetInvitation = async () => {
    console.log('Run????');
    // setLoading(true);
    setPage(page + 1);
    try {
      await getPropertyInvitation({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: PropertyInvitationList = [
              ...invitationList,
              ...res?.data?.data,
            ];
            setInvitationList(arr);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getInvitation();
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
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 0}}>
        <FlatList
          data={invitationList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={invitationList.length !== total && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            invitationList.length !== total && reGetInvitation();
          }}
          renderItem={({item, index}) => (
            <TenantInvitationCard
              invitation_id={item?.id}
              key={index + 1}
              invited_by={
                item?.owner_data?.first_name + ' ' + item?.owner_data?.last_name
              }
              property_id={
                item?.invited_property_data?.prefix +
                '_' +
                item?.invited_property_data?.id.toString().padStart(5, '0')
              }
              property_name={item?.invited_property_data?.property_name}
              property_type={item?.invited_property_data?.property_type?.name}
              property_size={item?.invited_property_data?.area}
              invite_date={item?.created_at}
              status={item?.is_approved_by_tenant == 1 ? true : false}
            />
          )}
        />
      </View>
    </View>
  );
};

export default InvitationScreen;
