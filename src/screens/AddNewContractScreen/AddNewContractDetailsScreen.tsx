import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import DatePicketInput from '../../components/DatePicketInput/DatePicketInput';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import {useGetContractTypeListMutation} from '../../features/contract/contract';
import {setContractData} from '../../features/contract/contractSlice';
import {AddContractBodyData} from '../../features/contract/contractTypes';

type Props = {};

const AddNewContractDetailsScreen = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [ContractTypeList, setContractTypeList] = useState([]);
  const [start_date, setStartDate] = useState(Date.now());
  const [contractPeriod, setContractPeriod] = useState(0);
  const [gracePeriod, setGracePeriod] = useState(0);
  const [noticePeriod, setNoticePeriod] = useState(60);
  const [switchModeType, setSwitchModeType] = useState('Percentage');
  const [contract, setContract] = useState<AddContractBodyData>({
    contract_type_id: Number(''),
    contract_period: '',
    grace_period: '',
    start_date: Date.now(),
    end_date: '',
    norice_period: '',
    security_deposit: '',
    monthly_rent: '',
    monthly_service_charge: '',
    other_charge: '',
    discount: '',
    total_rental_amount: '',
    total_contract_amount: '',
  });

  const [last_date, setLastDate] = useState(Date.now());

  const [getContractTypeList] = useGetContractTypeListMutation();

  const changeEndDate = () => {
    if (!contract.contract_period || !contract.grace_period) {
      console.log('Error');
    }

    const end = dayjs(contract.start_date).add(
      Number(contract.contract_period) + Number(contract.grace_period),
      'M',
    );

    setContract({...contract, end_date: end});
  };

  const getContractTypes = async () => {
    try {
      await getContractTypeList({})
        .unwrap()
        .then(res => {
          if (res.success) {
            let a = [];
            for (let i = 0; i < res.data.length; i++) {
              a.push({
                id: res.data[i].id,
                label: res.data[i].name,
                value: res.data[i].id,
              });
            }
            setContractTypeList(a);
          }
        });
    } catch (err) {
      console.warn(err);
    }
  };

  const handleRentalAmount = () => {
    let se = Number(contract.security_deposit),
      mo_re = Number(contract.monthly_rent),
      mo_se_ch = Number(contract.monthly_service_charge),
      o_c = Number(contract.other_charge),
      discount = Number(contract.discount);

    let rent = Number(contract.contract_period) * mo_re;
    let serviceCharge = Number(contract.contract_period) * mo_se_ch;
    let other_charge = Number(contract.contract_period) * o_c;

    let total_rent = rent + serviceCharge + other_charge;
    let contractamt = total_rent + se;

    if (discount !== 0) {
      if (switchModeType === 'Percentage') {
        total_rent = total_rent - total_rent * (discount / 100);
        contractamt = total_rent + se;
      } else {
        total_rent = total_rent - discount * Number(contract.contract_period);
        contractamt = total_rent + se;
      }
    }

    setContract({
      ...contract,
      total_rental_amount: String(total_rent),
      total_contract_amount: String(contractamt),
    });

    console.log(total_rent, contractamt);
  };

  const nextScreen = () => {
    dispatch(
      setContractData({
        contract_type_id: contract.contract_type_id,
        contract_period: contract.contract_period,
        grace_period: contract.grace_period,
        start_date: contract.start_date,
        end_date: contract.end_date,
        notice_period: contract.notice_period,
        security_deposit: contract.security_deposit,
        monthly_rent: contract.monthly_rent,
        monthly_service_charge: contract.monthly_service_charge,
        other_charge: contract.other_charge,
        discount:
          contract.discount + (switchModeType === 'Percentage' ? '%' : ''),
        total_rental_amount: contract.total_rental_amount,
        total_contract_amount: contract.total_contract_amount,
      }),
    );
    navigation.navigate('AddContract-4');
  };

  useEffect(() => {
    handleRentalAmount();
  }, [
    contract.security_deposit,
    contract.monthly_rent,
    contract.monthly_service_charge,
    contract.other_charge,
    contract.contract_period,
    contract.discount,
    switchModeType,
  ]);

  useEffect(() => {
    getContractTypes();
  }, []);

  useEffect(() => {
    changeEndDate();
  }, [contract.start_date]);

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
              3
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Contract Details
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          <DropDown
            label="Contract type"
            datas={ContractTypeList}
            onChange={value => {
              console.log(value);
              setContract({...contract, contract_type_id: value});
              //   setProperty({...property, type: value});
            }}
          />
          <Input
            label="Contract period (In Months)"
            placehoder="Enter contract period"
            keyboardType="numeric"
            onChange={e => {
              setContract({...contract, contract_period: e.nativeEvent.text});
            }}
          />

          <Input
            label="Grace Period (In Month)"
            placehoder="0"
            keyboardType="numeric"
            onChange={e => {
              setContract({...contract, grace_period: e.nativeEvent.text});
            }}
          />
          <DatePicketInput
            label="Start Date"
            containerStyles={{marginVertical: 5}}
            onChange={val => {
              console.log(val, '>>>VALA');
              setContract({...contract, start_date: val});
            }}
            value={dayjs(contract.start_date).format('DD/MM/YYYY')}
          />
          <DatePicketInput
            label="End Date"
            disabled
            containerStyles={{marginVertical: 5}}
            value={dayjs(contract.end_date).format('DD/MM/YYYY')}
          />
          <Input
            label="Notice Period (In Days)"
            value={noticePeriod}
            onChange={val => {
              setNoticePeriod(val.nativeEvent.text);
              setContract({...contract, notice_period: val.nativeEvent.text});
            }}
            placehoder="Enter Notice Period (In Days)"
          />
          <Input
            label="Security Deposit"
            onChange={e => {
              setContract({...contract, security_deposit: e.nativeEvent.text});
            }}
            placehoder="Enter security deposit amount"
          />
          <Input
            label="Monthly rent"
            onChange={e => {
              setContract({...contract, monthly_rent: e.nativeEvent.text});
            }}
            placehoder="Enter monthly rent amount"
          />
          <Input
            label="Monthly service charge"
            onChange={e => {
              setContract({
                ...contract,
                monthly_service_charge: e.nativeEvent.text,
              });
            }}
            placehoder="Enter service charge amount"
          />
          <Input
            label="Other charge"
            onChange={e => {
              setContract({...contract, other_charge: e.nativeEvent.text});
            }}
            placehoder="Enter Other charges"
          />
          <Input
            label="Discount"
            switchButton={true}
            switchButtonData={['Percentage', 'Number']}
            onChange={e => {
              setContract({
                ...contract,
                discount: e.nativeEvent.text,
              });
            }}
            placehoder="Enter Other charges"
            switchModeType={switchModeType}
            setSwitchModeType={val => setSwitchModeType(val)}
          />
          <Input
            disabled={true}
            label="Total rental amount"
            placehoder="0"
            value={contract.total_rental_amount}
          />
          <Input
            disabled={true}
            label="Total Contract Amount"
            placehoder="Total Payable Amount"
            value={contract.total_contract_amount}
          />
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
                nextScreen();
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

export default AddNewContractDetailsScreen;
