import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ContractDetailsComponent, {
  SlabContainer,
} from '../../components/ContractDetailsComponent/ContractDetailsComponent';
import ContractViewHeader from '../../components/ContractViewHeader/ContractViewHeader';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {useGetContractDetailsMutation} from '../../features/contract/contract';
import {ContractDetails} from '../../features/contract/contractTypes';

type Props = {};

const ContractViewScreen = (props: Props) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [payment_slabs, setPayment_slabs] = useState([]);
  const [amenities, setAmenities] = useState({
    containerTitle: 'Property Amenities',
    value: [],
  });

  const [furnishing, setFurnishing] = useState({
    containerTitle: 'Property Furnishing',
    value: [],
  });
  const [terms, setTerms] = useState({
    containerTitle: 'Terms & Condition',
    value: [],
  });

  const [details, setDetatils] = useState<ContractDetails>();

  const [getContractDetails] = useGetContractDetailsMutation();

  const getDetails = async () => {
    setLoading(true);
    try {
      await getContractDetails({params: props?.route?.params?.id})
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            setDetatils(res.data);
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
            setPayment_slabs(a);

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

            setAmenities({...amenities, value: b});

            for (let l = 0; l < res.data.contract_term_titles.length; l++) {
              if (res.data.contract_term_titles[l].contract_terms.length > 0) {
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
              } else {
                d.push([
                  {
                    title: res.data.contract_term_titles[l].title_text,

                    border: true,
                    id: l,
                  },
                ]);
              }
            }

            setTerms({...terms, value: d});

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

              setFurnishing({...furnishing, value: k});
            }
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

  console.log(details, 'CCCC');

  if (loading) {
    return <LoadingModal />;
  }

  const data: Array<SlabContainer> = [
    {
      containerTitle: 'Contract Details',
      value: [
        [
          {
            title: 'Security Deposit',
            data: `$${details?.security_deposit}`,
            id: 1,
          },
          {title: 'Rent/mth', data: `$${details?.monthly_rent}`, id: 2},
        ],
        [
          {title: 'Discount', data: `$${details?.discount}`, id: 3},
          {
            title: 'Total Rent/mth',
            data: `$${details?.total_monthly_amt}`,
            id: 4,
          },
        ],
        [
          {
            title: 'Owner',
            data:
              details?.contract_owner_data?.title +
              ' ' +
              details?.contract_owner_data?.first_name +
              ' ' +
              details?.contract_owner_data?.middle_name +
              ' ' +
              details?.contract_owner_data?.last_name,
            id: 5,
          },
          {
            title: 'Tenant',
            data:
              details?.contract_tenant_data?.title +
              ' ' +
              details?.contract_tenant_data?.first_name +
              ' ' +
              details?.contract_tenant_data?.middle_name +
              ' ' +
              details?.contract_tenant_data?.last_name,
            id: 6,
          },
        ],

        [
          {
            title: 'Grace Period',
            data: `${details?.grace_period ? details?.grace_period : 0} Month`,
            id: 7,
          },
          {
            title: 'Contract Period',
            data: `${details?.contract_period} months`,
            id: 8,
          },
        ],
        [
          {
            title: 'Service Charges/mth',
            data: `$${details?.monthly_service_charge}`,
            id: 9,
          },
          {
            title: 'Other Charges/mth',
            data: `$${details?.monthly_other_charge}`,
            id: 10,
          },
        ],
        [
          {
            title: 'Total Rent Amount',
            data: `$${
              Number(details?.contract_period) * details?.total_monthly_amt
            }`,
            id: 11,
          },
          {
            title: 'Total Contract Amount',
            data: `$${
              details?.security_deposit +
              Number(details?.contract_period) * details?.total_monthly_amt
            }`,
            id: 12,
          },
        ],

        [
          {
            title: 'Start Date',
            data: details?.start_date,
            id: 13,
            date: true,
          },
          {
            title: 'End Date',
            data: details?.end_date,
            id: 14,
            date: true,
          },
        ],
        [
          {
            title: 'Late Fine',
            data: `${details?.late_fee_applicable ? 'Yes' : 'No'}`,
            id: 15,
          },
        ],
      ],
    },
    ...payment_slabs,
    {
      containerTitle: 'Owner Info',
      value: [
        [
          {
            title: 'Name',
            data:
              details?.contract_owner_data?.title +
              ' ' +
              details?.contract_owner_data?.first_name +
              ' ' +
              details?.contract_owner_data?.middle_name +
              ' ' +
              details?.contract_owner_data?.last_name,
            id: 1,
          },
          {title: 'Email', data: details?.contract_owner_data.email, id: 2},
        ],
        [
          {title: 'Phone', data: details?.contract_owner_data.phone, id: 3},
          {
            title: 'Account type',
            data: details?.contract_owner_data.account_type,
            id: 4,
          },
        ],
        [
          {
            title: 'Address',
            data:
              (details?.contract_owner_data?.address
                ? details?.contract_owner_data?.address
                : '') +
              ' ' +
              (details?.contract_owner_data?.address_two
                ? details?.contract_owner_data?.address_two
                : '') +
              ' ' +
              (details?.contract_owner_data?.city_name
                ? details?.contract_owner_data?.city_name
                : '') +
              ' ' +
              (details?.contract_owner_data?.state_name
                ? details?.contract_owner_data?.state_name
                : '') +
              ' ' +
              (details?.contract_owner_data?.country_name
                ? details?.contract_owner_data?.country_name
                : '') +
              ' ' +
              (details?.contract_owner_data?.zip
                ? details?.contract_owner_data?.zip
                : ''),
            id: 5,
          },
        ],
      ],
    },
    {
      containerTitle: 'Tenant Info',
      value: [
        [
          {
            title: 'Name',
            data:
              details?.contract_tenant_data?.title +
              ' ' +
              details?.contract_tenant_data?.first_name +
              ' ' +
              details?.contract_tenant_data?.middle_name +
              ' ' +
              details?.contract_tenant_data?.last_name,
            id: 1,
          },
          {title: 'Email', data: details?.contract_tenant_data.email, id: 2},
        ],
        [
          {title: 'Phone', data: details?.contract_tenant_data.phone, id: 3},
          {
            title: 'Account type',
            data: details?.contract_tenant_data.account_type,
            id: 4,
          },
        ],
        [
          {
            title: 'Address',
            data:
              (details?.contract_tenant_data?.address
                ? details?.contract_tenant_data?.address
                : '') +
              ' ' +
              (details?.contract_tenant_data?.city
                ? details?.contract_tenant_data?.city
                : '') +
              ' ' +
              (details?.contract_tenant_data?.state
                ? details?.contract_tenant_data?.state
                : '') +
              ' ' +
              (details?.contract_tenant_data?.zip
                ? details?.contract_tenant_data?.zip
                : ''),
            id: 5,
          },
        ],
      ],
    },
    {
      containerTitle: 'Property Details',
      value: [
        [
          {
            title: 'Property Name',
            data: details?.contract_properties_data.property_name,
            id: 1,
          },
          {
            title: 'Type',
            data: details?.contract_properties_data.property_type,
            id: 2,
          },
        ],
        [
          {
            title: 'Property Size(sq.ft)',
            data: details?.contract_properties_data?.area,
            id: 3,
          },
          {
            title: 'Parking type',
            data: details?.contract_properties_data.parking_type,
            id: 4,
          },
        ],
        [
          {
            title: 'Num of parking',
            data: details?.contract_properties_data.nof_parking,
            id: 5,
          },
          {
            title: 'Num of Bedrooms',
            data: details?.contract_properties_data?.nof_bedrooms,
            id: 5,
          },
        ],
        [
          {
            title: 'Num of Bathrooms',
            data: details?.contract_properties_data?.nof_baths,
            id: 5,
          },
          {
            title: 'Num of Floor',
            data: details?.contract_properties_data?.total_no_floor,

            id: 5,
          },
        ],
        [
          {
            title: 'Property Built Year',
            data: details?.contract_properties_data?.age_of_property,

            id: 5,
          },
          {
            title: 'Address',
            data:
              (details?.contract_properties_data?.address_one
                ? details?.contract_properties_data?.address_one
                : '') +
              ' ' +
              (details?.contract_properties_data?.address_two
                ? details?.contract_properties_data?.address_two
                : '') +
              ' ' +
              (details?.contract_properties_data?.city_name
                ? details?.contract_properties_data?.city_name
                : '') +
              ' ' +
              (details?.contract_properties_data?.state_name
                ? details?.contract_properties_data?.state_name
                : '') +
              ' ' +
              (details?.contract_properties_data?.zip
                ? details?.contract_properties_data?.zip
                : ''),
            id: 5,
          },
        ],
      ],
    },
    amenities,
    furnishing,
    terms,
  ];

  console.log(details?.contract_properties_data);

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <StatusBar backgroundColor={'#0EB9F2'} />
      <ScrollView>
        <ContractViewHeader
          contract_number={details?.contract_number}
          property_type={details?.contract_properties_data?.property_type}
          created_at={details?.created_at}
        />
        {data.map((item, index) => (
          <ContractDetailsComponent slab={item} key={index} />
        ))}
        <View
          style={{
            paddingVertical: 20,
            flexDirection: 'row',
            backgroundColor: '#45485F',
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0EB9F2',
              borderRadius: 5,
              paddingHorizontal: 15,
              paddingVertical: 5,
              marginHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate('View', {
                screen: 'Contract-PDF-View',
                params: {id: props.route.params.id},
              });
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', color: '#fff'}}>
              View PDF
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContractViewScreen;
