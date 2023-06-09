import {faChevronRight, faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import DatePicketInput from '../../components/DatePicketInput/DatePicketInput';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import RadioButton from '../../components/RadioButton/RadioButton';
import {
  setAllContractData,
  setContractSlabData,
  setUpdateChange,
} from '../../features/contract/contractSlice';
import {
  AddContractSlabList,
  ContractState,
} from '../../features/contract/contractTypes';
import {RootState} from '../../store';

type Props = {};

let todaysDate = new Date().getDate();

const AddNewContractDetailsSlabScreen = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const contract_details: ContractState = useSelector<RootState>(
    state => state.contract,
  );

  console.log(contract_details, 'COntract -3');

  const [switchModeTypeForLateFee, setSwitchModeTypeForLateFee] =
    useState('Percentage');
  const [parentRentalAmount, setParentRentalAmount] = useState(
    contract_details.total_rental_amount,
  );
  const [securityDeposit, setSecurityDeposit] = useState(
    contract_details.security_deposit,
  );
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(contract_details.start_date);

  console.log(date, contract_details.start_date, 'DDDDD');

  const [loading, setLoading] = useState(false);
  const [slabs, setSlabs] = useState([]);
  const [fineType, setFineType] = useState('');
  const [late_fee, setLateFee] = useState(
    contract_details.late_fee_applicable
      ? contract_details.late_fee_applicable
      : '',
  );
  const [late_fee_data, setLateFeeData] = useState('');
  const [late_fee_amount, setLateFeeAmount] = useState('');
  const [lateFeeGracePeriod, setLateFeeGracePeriod] = useState('');

  const [late_fee_amountFixed, setLateFeeAmountFixed] = useState(false);
  const [lateFeeGracePeriodFixed, setLateFeeGracePeriodFixed] = useState(false);

  const [ContractScreenType, setContractScreenType] = useState(
    props?.route?.params?.type,
  );

  console.log(ContractScreenType, 'TYPE');

  const showConfirmDialog = () => {
    return Alert.alert(
      'Will not able to Add Slab',
      `Negative slab cannot be added`,
      [
        // The "Yes" button

        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'Okay',
          onPress: () => {},
        },
      ],
    );
  };

  const confirmDeleteSlab = (id: number) => {
    return Alert.alert(
      'Are your sure?',
      `Are you sure you want to delete Slabs`,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            setSlabs([]);
            setSecurityDeposit(contract_details.security_deposit);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  let err = () => {
    return Alert.alert(
      "Date Can't be Less tha Last Slab Date",
      `Selcted Date is less than Last Slab Date`,
      [
        // The "Yes" button
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'Okay',
          onPress: () => {},
        },
      ],
    );
  };

  const addPaymentSlab = async () => {
    setLoading(true);
    try {
      console.log(dayjs(date).date() === String(todaysDate), 'asdasdsad');
      // if (dayjs(date).date() === String(todaysDate)) {
      //   err();
      // }
      slabs.find(val => {
        if (val.date >= date) {
          err();
          throw (Error.name = 'Err');
        }
      });
      if (!parentRentalAmount || !amount || !date) {
        console.log('Caught Error');
      } else {
        let a = {
          pending_rentail_amount: parentRentalAmount,
          security_deposit: securityDeposit,
          amount: amount,
          date: date,
        };
        if (late_fee_data?.id === 1) {
          if (!late_fee_amount || !lateFeeGracePeriod) {
            console.log('Error Caught');
            throw (Error.name = 'Error');
          }
          a['late_fee_amount'] = switchModeTypeForLateFee
            ? late_fee_amount + ' %'
            : late_fee_amount;

          a['late_fee_grace_period'] = lateFeeGracePeriod;

          if (fineType === '0') {
            setLateFeeAmountFixed(true);
            setLateFeeGracePeriodFixed(true);
          }
          if (fineType === '1') {
            setLateFeeAmount('');
            setLateFeeGracePeriod('');
          }
        }

        let total = Number(parentRentalAmount);
        let amnt = Number(amount);

        if (total <= 0) {
          throw (Error.name = 'Pending Total problem');
        } else {
          if (amnt > total) {
            showConfirmDialog();
            throw (Error.name = 'Err');
          }

          total = total - amnt;
          setSlabs([...slabs, a]);
          setParentRentalAmount(String(total));
          setSecurityDeposit('');
          setAmount('');
          setDate(contract_details.start_date);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  console.log(slabs, 'SLABS');

  const nextScreen1 = () => {
    let b: AddContractSlabList = [];

    if (fineType === '1') {
      for (let i = 0; i < slabs?.length; i++) {
        b.push({
          payment_date: slabs[i]?.date,
          payment_amount: slabs[i].amount,
          fine_amount: slabs[i]?.late_fee_amount,
          grace_period: slabs[i]?.late_fee_grace_period
            ? slabs[i]?.late_fee_grace_period
            : '',
          is_deposite_included: slabs[i]?.security_deposit.length > 0 ? 1 : 0,
        });
      }
    } else {
      for (let i = 0; i < slabs?.length; i++) {
        b.push({
          payment_date: slabs[i]?.date,
          payment_amount: slabs[i]?.amount,
          fine_amount: slabs[i]?.late_fee_amount,
          grace_period: slabs[i]?.late_fee_grace_period
            ? slabs[i]?.late_fee_grace_period
            : '',
          is_deposite_included: slabs[i]?.security_deposit.length > 0 ? 1 : 0,
        });
      }
    }

    console.log(b, 'asdsad');

    dispatch(
      setContractSlabData({
        late_fee_applicable: late_fee_data?.id === 1 ? 1 : 0,
        fine_type: fineType,
        late_fee_amount: fineType === '0' ? late_fee_amount : '',
        late_fee_grace_period: lateFeeGracePeriod,
        payment_slab_data: JSON.stringify(b),
      }),
    );
  };

  const confirmDialog = () => {
    return Alert.alert('Deleting Slabs', 'Editing amounts will delete slabs', [
      // The "Yes" button

      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'Okay',
        onPress: () => {
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

          dispatch(
            setUpdateChange({
              payment_slab_changed: true,
            }),
          );
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        },
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  };

  useEffect(() => {
    setAmount('');
    setDate(contract_details.start_date);

    setLateFeeGracePeriod('');
    setLateFeeAmountFixed(false);
    setLateFeeAmount('');
    setLateFeeAmountFixed(false);
  }, [fineType, contract_details.start_date]);

  const runAddSlab = () => {
    if (contract_details.payment_slab_data) {
      let a = [...JSON.parse(contract_details.payment_slab_data)];
      let b = [];

      a.forEach((v, index) => {
        console.log(v.is_deposite_included);
        b.push({
          date: v.payment_date,
          amount: v.payment_amount,
          late_fee_amount: v.payment_date,
          late_fee_grace_period: v.grace_period,
          security_deposit:
            v.is_deposite_included === 1
              ? contract_details.security_deposit
              : 0,
        });
      });

      setSlabs(b);
    }
  };

  useEffect(() => {
    runAddSlab();
  }, [contract_details.payment_slab_data]);

  let lastSlab = slabs.slice(-1)[0];

  const deleteItem = async item => {
    let total = Number(parentRentalAmount);
    let b = total;
    let amnt = Number(item.amount);

    try {
      setLoading(true);
      b += amnt;

      //   console.log(b);
      setParentRentalAmount(String(b));

      let a = [...slabs];

      const i = a.indexOf(item);
      if (i > -1) {
        // only splice array when item is found
        a.splice(i, 1); // 2nd parameter means remove one item only
      }

      //   console.log(a.length);

      if (a.length === 0) {
        setSecurityDeposit(String(contract_details.security_deposit));
      }

      setSlabs(a);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const nextScreen = async () => {
    if (Number(parentRentalAmount) > 0) {
      console.log('Error building');
    } else {
      nextScreen1();
      if (ContractScreenType === 'Edit') {
        navigation.navigate('AddContract-5', {
          type: 'Edit',
          terms: contract_details.title_term_data,
          id: props?.route?.params?.id,
        });
      } else {
        navigation.navigate('AddContract-5', {
          type: 'Add',
        });
      }
    }
  };

  useEffect(() => {
    if (contract_details?.payment_slab_data && ContractScreenType === 'Edit') {
      setParentRentalAmount('0');
    } else {
      setParentRentalAmount(contract_details.total_rental_amount);
    }
  }, [
    contract_details.total_rental_amount,
    contract_details?.payment_slab_data,
  ]);

  if (loading) {
    return <LoadingModal />;
  }

  useEffect(() => {
    setContractScreenType(props?.route?.params?.type);
  }, [props?.route?.params?.type]);

  console.log(late_fee === '0', late_fee, 'Late');

  return (
    <View style={{backgroundColor: '#45485F', flex: 1}}>
      <KeyboardAwareScrollView
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}>
        <View style={{backgroundColor: '#fff'}}>
          <View
            style={{
              backgroundColor: slabs?.length === 0 ? '#f5f5f5' : '#fff',
              minHeight: 200,
              marginVertical: 20,
              borderRadius: 6,
              borderColor: '#f5f5f5',
              borderWidth: 1,
              justifyContent: slabs?.length === 0 ? 'center' : 'flex-start',
              alignItems: slabs?.length === 0 ? 'center' : 'flex-start',

              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            {slabs?.length === 0 ? (
              <Text style={{color: '#000', fontFamily: 'Poppins-Light'}}>
                All the Payment Slabs
              </Text>
            ) : (
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {slabs.map((item, index) => {
                  return (
                    <View>
                      <View
                        style={{
                          backgroundColor: '#def7f0',
                          flexDirection: 'row',
                          paddingVertical: 6,
                          paddingHorizontal: 18,
                          borderRadius: 4,
                          marginHorizontal: 6,
                          marginVertical: 6,
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'Poppins-Regular',
                                color: '#000',
                              }}>
                              Date :
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                                color: '#000',
                                marginHorizontal: 10,
                              }}>
                              {!item?.created_at
                                ? dayjs(item?.date).format('DD/MM/YYYY')
                                : dayjs(item?.payment_date).format(
                                    'DD/MM/YYYY',
                                  )}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Poppins-Regular',
                                color: '#1ec997',
                              }}>
                              ${item?.amount}
                              {item?.security_deposit
                                ? ' + $' + item?.security_deposit
                                : ''}
                            </Text>
                          </View>
                          {late_fee_data?.id === 1 && (
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Regular',
                                    color: '#000',
                                  }}>
                                  Fine amount :
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Regular',
                                    color: '#000',
                                    marginHorizontal: 10,
                                  }}>
                                  {item?.late_fee_amount}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Regular',
                                    color: '#000',
                                  }}>
                                  Grace Period :
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Regular',
                                    color: '#000',
                                    marginHorizontal: 10,
                                  }}>
                                  {item?.late_fee_grace_period}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                      {item === lastSlab && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 9999,
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 0,
                            elevation: 1,
                            shadowColor: 'rgba(0,0,0,0.7)',
                            zIndex: 1000,
                          }}
                          onPress={() => {
                            if (
                              contract_details.payment_slab_data &&
                              ContractScreenType === 'Edit'
                            ) {
                              confirmDialog();
                            } else {
                              deleteItem(item);
                            }
                          }}>
                          <FontAwesomeIcon icon={faX} size={12} />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          <RadioButton
            labels={[{id: 1, name: 'Late fee applicable?'}]}
            onChange={i => {
              console.log(i, 'onChange');
              if (slabs.length > 0) {
                confirmDeleteSlab();
                setLateFee(0);
                setLateFeeData(i);
              } else {
                setLateFee('');
                setLateFeeData(i);
              }
            }}
            value={late_fee_data ? late_fee_data?.id : ''}
          />

          {late_fee_data?.id === 1 && (
            <DropDown
              label="Fine Type"
              datas={[
                {id: 1, label: 'For all', value: '0'},
                {id: 2, label: 'Individual slab', value: '1'},
              ]}
              onChange={val => {
                if (
                  contract_details.fine_type &&
                  ContractScreenType === 'Edit'
                ) {
                  confirmDialog();
                } else if (slabs > 0) {
                  showConfirmDialog();
                } else {
                  // deleteItem(item);
                  setFineType(val);
                }
              }}
            />
          )}

          <Input
            label="Parent Rentail Amount"
            placehoder="0"
            value={parentRentalAmount}
            onChange={e => setParentRentalAmount(e.nativeEvent.text)}
            disabled
          />
          {slabs?.length < 1 && (
            <Input
              label="Security Deposit"
              placehoder="0"
              value={securityDeposit}
              onChange={e => setSecurityDeposit(e.nativeEvent.text)}
              disabled
            />
          )}

          <>
            {late_fee_data?.id === 1 ? (
              <View>
                <Input
                  label="Late fee amount"
                  switchButton={true}
                  switchButtonData={['Percentage', 'Number']}
                  onChange={e => {
                    if (
                      contract_details.late_fee_amount &&
                      ContractScreenType === 'Edit'
                    ) {
                      confirmDialog();
                    } else {
                      // deleteItem(item);
                      setLateFeeAmount(e.nativeEvent.text);
                    }
                  }}
                  value={late_fee_amount}
                  placehoder="Enter as 10% or Simply 100"
                  switchModeType={switchModeTypeForLateFee}
                  setSwitchModeType={val => setSwitchModeTypeForLateFee(val)}
                  disabled={late_fee_amountFixed}
                />
                <Input
                  label="Grace period (In days)"
                  placehoder="Enter the grace period"
                  value={lateFeeGracePeriod}
                  onChange={e => {
                    if (
                      contract_details.late_fee_grace_period &&
                      ContractScreenType === 'Edit'
                    ) {
                      confirmDialog();
                    } else {
                      // deleteItem(item);
                      setLateFeeGracePeriod(e.nativeEvent.text);
                    }
                  }}
                  disabled={lateFeeGracePeriodFixed}
                />
              </View>
            ) : (
              <></>
            )}

            <Input
              label="Amount"
              placehoder="Enter amount"
              value={amount}
              onChange={e => {
                if (contract_details.amount && ContractScreenType === 'Edit') {
                  confirmDialog();
                } else {
                  // deleteItem(item);
                  setAmount(e.nativeEvent.text);
                }
              }}
            />
            <DatePicketInput
              label="Date"
              onChange={v => {
                console.log(v);
                slabs.find(val => {
                  if (val.date >= v) {
                    Alert.alert(
                      "Date Can't be Less tha Last Slab Date",
                      `Selcted Date is less than Last Slab Date`,
                      [
                        // The "Yes" button
                        // The "No" button
                        // Does nothing but dismiss the dialog when tapped
                        {
                          text: 'Okay',
                          onPress: () => {},
                        },
                      ],
                    );
                  } else {
                    setDate(v);
                  }
                });
              }}
              value={dayjs(date).format('DD/MM/YYYY')}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 32,
              }}>
              <TouchableOpacity
                style={{
                  borderColor: '#00ABE4',
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
                onPress={() => addPaymentSlab()}>
                <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                  Add Payment Slab
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </View>
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
    </View>
  );
};

export default AddNewContractDetailsSlabScreen;
