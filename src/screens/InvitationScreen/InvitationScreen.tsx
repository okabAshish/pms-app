import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import InvitationCard from '../../components/InvitationCard/InvitationCard';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useOwnerInvitationMutation} from '../../features/auth/auth';
import {OwnerInvitationListData} from '../../features/types';

type Props = {};

const InvitationScreen = (props: Props) => {
  const [invitationList, setInvitationList] = useState<OwnerInvitationListData>(
    [],
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  console.log(onEndReachedCalledDuringMomentum, invitationList.length, page);

  const [getAllOwnerInvitation] = useOwnerInvitationMutation();

  const getInvitation = async () => {
    setLoading(true);
    try {
      await getAllOwnerInvitation({limit: 5, page: 1})
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
    // setLoading(true);
    console.log('Run????');
    setPage(page + 1);
    try {
      await getAllOwnerInvitation({limit: 5, page: page})
        .unwrap()
        .then(res => {
          if (res.success) {
            // console.log()
            let arr: OwnerInvitationListData = [
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
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 0}}>
        <FlatList
          data={invitationList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={total !== invitationList.length && renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            total !== invitationList.length && reGetInvitation();
          }}
          renderItem={({item, index}) => (
            <InvitationCard
              invitation_id={item?.id}
              email={item?.email}
              phone={item?.phone}
              building_name={item?.invited_property_data?.property_name}
              key={index + 1}
              is_registered={item?.already_registered === 1 ? true : false}
              url_key={item?.url_key}
            />
          )}
        />
      </View>
    </View>
  );
};

export default InvitationScreen;
