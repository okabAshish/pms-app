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
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import {
  useGetOwnerPropertyDetailsMutation,
  useGetOwnerPropertyListMutation,
} from '../../features/auth/owner';
import {useGetContractDetailsMutation} from '../../features/contract/contract';
import {
  setAllContractData,
  setPropertyId as setP,
} from '../../features/contract/contractSlice';
import {ContractDetails} from '../../features/contract/contractTypes';
import {OwnerPropertyDetailsData} from '../../features/ownerTypes';
import {RootState} from '../../store';

type Props = {
  route: any;
};

const AddNewContractScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contract = useSelector<RootState>(state => state.contract);
  const [loading, setLoading] = useState(false);

  const [propertyList, setPropertyList] = useState([]);
  const [propertyDetails, setPropertyDetails] =
    useState<OwnerPropertyDetailsData>({});
  const [property_id, setPropertyId] = useState(contract?.property_id);

  const [getOwnerPropertyList] = useGetOwnerPropertyListMutation();
  const [getOwnerPropertyDetails] = useGetOwnerPropertyDetailsMutation();

  const [ContractScreenType, setContractScreenType] = useState(
    props?.route?.params?.type,
  );

  console.log(ContractScreenType, 'TYPE');
  console.log(contract, 'Contract - 1');

  const getProperties = async () => {
    setLoading(true);
    try {
      await getOwnerPropertyList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];

            for (let i = 0; i < res.data.length; i++) {
              a.push({
                id: res.data[i].id,
                label: res.data[i].property_name,
                value: res.data[i].id,
              });
            }

            setPropertyList(a);

            if (ContractScreenType === 'Edit') {
              console.log('EDIT');
              getDetails();
            } else {
              dispatch(
                setAllContractData({
                  contract_period: null,
                  grace_period: null,
                  start_date: '',
                  end_date: '',
                  notice_period: '',
                  security_deposit: '',
                  monthly_rent: '',
                  monthly_service_charge: '',
                  other_charge: '',
                  discount: '',
                  total_rental_amount: '',
                  total_contract_amount: '',
                  fine_type: '',
                  late_fee_amount: '',
                  late_fee_grace_period: '',
                  amount: '',
                  property_id: '',
                  tenant_id: '',
                  contract_type_id: '',
                  late_fee_applicable: '',
                  payment_slab_data: '',
                  title_term_data: '',
                }),
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

  const getPropertyDetails = async (val: number) => {
    setLoading(true);
    try {
      await getOwnerPropertyDetails({param: val})
        .unwrap()
        .then(res => {
          if (res.success) {
            setPropertyDetails(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const [details, setDetatils] = useState<ContractDetails>();

  const [getContractDetails] = useGetContractDetailsMutation();

  const getDetails = async () => {
    setLoading(true);
    try {
      await getContractDetails({params: props?.route?.params?.id})
        .unwrap()
        .then(async res => {
          console.log(res);
          if (res.success) {
            setPropertyId(res.data.property_id);
            await getPropertyDetails(res.data.property_id);
            setDetatils(res.data);

            console.log('id:', JSON.stringify(res.data.contract_term_titles));

            let arr = [];

            for (let i = 0; i < res.data.contract_term_titles?.length; i++) {
              let c = [];

              for (
                let j = 0;
                j < res.data.contract_term_titles[i].contract_terms?.length;
                j++
              ) {
                c.push(
                  res.data.contract_term_titles[i].contract_terms[j].term_id,
                );
              }

              arr.push({
                title_id: res.data.contract_term_titles[i].title_id,
                terms_data: c,
              });
            }

            dispatch(
              setAllContractData({
                contract_period: res.data.contract_period,
                grace_period: res.data.contract_start_grace_period,
                start_date: res.data.start_date,
                end_date: res.data.end_date,
                notice_period: res.data.notice_period,
                security_deposit: String(res.data.security_deposit),
                monthly_rent: String(res.data.monthly_rent),
                monthly_service_charge: String(res.data.monthly_service_charge),
                other_charge: String(res.data.monthly_other_charge),
                discount: String(res.data.discount),
                total_rental_amount: String(
                  res.data.total_monthly_amt *
                    ((res.data.contract_period
                      ? Number(res.data.contract_period)
                      : 0) +
                      (res.data.contract_start_grace_period
                        ? Number(res.data.contract_start_grace_period)
                        : 0)),
                ),
                total_contract_amount: String(
                  res.data.total_monthly_amt *
                    ((res.data.contract_period
                      ? Number(res.data.contract_period)
                      : 0) +
                      (res.data.contract_start_grace_period
                        ? Number(res.data.contract_start_grace_period)
                        : 0)) +
                    res.data.security_deposit,
                ),
                fine_type: String(res.data.late_fine_slab_type),
                late_fee_amount: String(
                  res.data.late_fee_amt ? res.data.late_fee_amt : '',
                ),
                late_fee_grace_period: res.data?.grace_period
                  ? String(res.data?.grace_period)
                  : '',
                amount: '',
                property_id: res.data.property_id,
                tenant_id: res.data.tenant_id,
                contract_type_id: res.data.contract_type_id,
                late_fee_applicable: res.data.late_fee_applicable
                  ? String(res.data.late_fee_applicable)
                  : '',
                payment_slab_data: JSON.stringify(
                  res.data.contract_payment_date_amount_data,
                ),
                title_term_data: JSON.stringify(arr),
              }),
            );
            let a = [];
            let b = [];
            let c = [];
            let d = [];
            for (
              let i = 0;
              i < res.data?.contract_payment_date_amount_data.length;
              i++
            ) {
              a.push({
                containerTitle: 'Payment Slabs ' + (i + 1),
                value: [
                  [
                    {
                      title: 'Date',
                      data: '2023-04-12T12:42:16.000000Z',
                      date: true,
                      id: 1,
                    },
                    {
                      title: 'Amount',
                      data: '$2000',
                      id: 2,
                    },
                  ],
                  [
                    {title: 'Fine Amount', data: '$10', id: 3},
                    {title: 'Grace Period', data: '3', id: 4},
                  ],
                ],
              });
            }
            // setPayment_slabs(a);

            for (
              let j = 0;
              j <
              res.data.contract_properties_data.contract_property_amenities
                .length;
              j++
            ) {
              b.push([
                {
                  title:
                    res.data.contract_properties_data
                      .contract_property_amenities[j].icon,
                  data: res.data.contract_properties_data
                    .contract_property_amenities[j].name,
                  icon: true,
                  id: 1,
                },
              ]);
            }

            // setAmenities({...amenities, value: b});

            for (let l = 0; l < res.data.contract_term_titles.length; l++) {
              for (
                let m = 0;
                m < res.data.contract_term_titles[l].contract_terms.length;
                m++
              ) {
                d.push([
                  {
                    title: res.data.contract_term_titles[l].title_text,
                    data: res.data.contract_term_titles[l].contract_terms[m]
                      .term_text,
                    border: true,
                    id: l,
                  },
                ]);
              }
            }

            // setTerms({...terms, value: d});

            console.log(d, '<><><?');

            if (
              res.data.contract_properties_data.contract_property_furnishings
                .length > 0
            ) {
              for (
                let k = 0;
                k <
                res.data.contract_properties_data.contract_property_furnishings
                  .length;
                k++
              ) {
                c.push([
                  {
                    title:
                      res.data.contract_properties_data
                        .contract_property_furnishings[k].icon,
                    data: res.data.contract_properties_data
                      .contract_property_furnishings[k].name,
                    icon: true,
                    id: 1,
                  },
                ]);
              }

              // setFurnishing({...furnishing, value: k});
            }
          }
        });
    } catch (err) {
      console.log(err, '<><>');
    }
    setLoading(false);
  };

  useEffect(() => {
    getProperties();
  }, []);

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
              1
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Select your property
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#45485F',
                paddingHorizontal: 32,
                paddingVertical: 5,
                borderRadius: 9999,
              }}
              onPress={() => navigation.navigate('AddProperty')}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                Add New Property +
              </Text>
            </TouchableOpacity>
          </View>
          <DropDown
            label="Property Type"
            datas={propertyList}
            search
            value={property_id}
            onChange={value => {
              console.log(value);
              setPropertyId(Number(value));
              getPropertyDetails(Number(value));
            }}
          />
          {propertyDetails.id && (
            <PropertyCard
              property_id={`PROP_00000000${
                propertyDetails?.id ? propertyDetails?.id : 0
              }`}
              building_name={propertyDetails.property_name}
              rented={propertyDetails?.rented === 1 ? true : false}
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
                if (property_id !== 0) {
                  dispatch(
                    setP({
                      property_id: property_id,
                    }),
                  );

                  if (props?.route?.params?.type === 'Edit') {
                    navigation.navigate('AddContract-2', {
                      type: 'Edit',
                      id: props?.route?.params?.id,
                    });
                  } else {
                    navigation.navigate('AddContract-2', {
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

export default AddNewContractScreen;
