import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../components/DropDown/DropDown';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import OwnerTenantsCard from '../../components/OwnerTenantsCard/OwnerTenantsCard';
import {useGetOwnerTenantListMutation} from '../../features/contract/contract';
import {setTenantId} from '../../features/contract/contractSlice';
import {
  ContractDetails,
  ContractTenantList,
} from '../../features/contract/contractTypes';
import {OwnerTenantData} from '../../features/types';
import {RootState} from '../../store';

type Props = {};

const AddNewContractTenantScreen = (props: Props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const contract: ContractDetails = useSelector<RootState>(
    state => state.contract,
  );

  const [tenantList, setTenantList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseTenantList, setResponseTenantList] =
    useState<ContractTenantList>([]);

  const [selectedTenant, setSelectedTenant] = useState<OwnerTenantData>();
  const [value, setValue] = useState(contract?.tenant_id);

  const [ContractScreenType, setContractScreenType] = useState(
    props?.route?.params?.type,
  );

  const [getOwnerTenantList] = useGetOwnerTenantListMutation();

  // console.log(contract?.property_id);
  const getTenants = async () => {
    setLoading(false);
    try {
      await getOwnerTenantList({
        property_id: contract?.property_id,
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            setResponseTenantList(res.data);
            let a = [];

            for (let i = 0; i < res.data.length; i++) {
              a.push({
                id: res.data[i].id,
                label: `${
                  res.data[i].first_name +
                  ' ' +
                  res.data[i].middle_name +
                  ' ' +
                  res.data[i].last_name
                }`,
                value: res.data[i].id,
              });
            }

            setTenantList(a);

            if (ContractScreenType === 'Edit') {
              setValue(
                res.data.find(val => val.user_id === contract?.tenant_id)?.id,
              );
              setSelectedTenant(
                res.data.find(val => val.user_id === contract?.tenant_id),
              );
            }
            // setPage(page + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  console.log(contract, 'Add Contract - 2');

  const checkSelectedValue = v => {
    let select: OwnerTenantData = responseTenantList.find(val => val.id === v);

    setSelectedTenant(select);
  };

  useEffect(() => {
    getTenants();
  }, [contract?.property_id]);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <StatusBar backgroundColor={'#45485F'} barStyle="light-content" />

      <KeyboardAwareScrollView
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#00ABE4',
              height: 32,
              width: 32,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 21,
              }}>
              2
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Choose your tenant
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <DropDown
            label="Search Tenant"
            datas={tenantList}
            search
            onChange={v => {
              // console.log(v);
              setValue(v);
              checkSelectedValue(v);
              // setProperty({...property, type: value});
            }}
            value={value}
          />
          {selectedTenant?.id && (
            <OwnerTenantsCard
              tenant_id={
                'TNT_0000000' + (selectedTenant?.id ? selectedTenant?.id : 0)
              }
              tenant_type={
                selectedTenant?.account_type === 1
                  ? 'Individual'
                  : selectedTenant?.account_type === 2
                  ? 'Company'
                  : selectedTenant?.account_type === 3
                  ? 'Multi Occupant'
                  : 'Individual'
              }
              name={
                selectedTenant?.first_name
                  ? selectedTenant?.first_name
                  : '' + ' ' + selectedTenant?.middle_name
                  ? selectedTenant?.middle_name
                  : '' + ' ' + selectedTenant?.last_name
                  ? selectedTenant?.last_name
                  : ''
              }
              email={selectedTenant?.email}
              phone={selectedTenant?.phone}
            />
          )}
        </KeyboardAwareScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              marginVertical: 32,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 24,
                paddingVertical: 5,
                backgroundColor: '#00ABE4',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                if (selectedTenant) {
                  dispatch(setTenantId({tenant_id: Number(value)}));
                  if (props?.route?.params?.type === 'Edit') {
                    navigation.navigate('AddContract-3', {
                      type: 'Edit',
                      id: props?.route?.params?.id,
                    });
                  } else {
                    navigation.navigate('AddContract-3', {
                      type: 'Add',
                    });
                  }
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginRight: 5,
                  color: '#fff',
                }}>
                Next
              </Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddNewContractTenantScreen;
