import {faChevronRight, faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import DatePicketInput from '../../components/DatePicketInput/DatePicketInput';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';
import RadioButton from '../../components/RadioButton/RadioButton';
import {ContractState} from '../../features/contract/contractTypes';
import {RootState} from '../../store';

type Props = {};

const AddNewContractDetailsSlabScreen = (props: Props) => {
  const navigation = useNavigation();
  const contract_details: ContractState = useSelector<RootState>(
    state => state.contract,
  );

  const [switchModeTypeForLateFee, setSwitchModeTypeForLateFee] =
    useState('Percentage');
  const [parentRentalAmount, setParentRentalAmount] = useState(
    contract_details.pending_rentail_amount,
  );
  const [securityDeposit, setSecurityDeposit] = useState(
    contract_details.security_deposit,
  );
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const [slabs, setSlabs] = useState([]);
  const [fineType, setFineType] = useState('');
  const [late_fee, setLateFee] = useState(null);
  const [late_fee_amount, setLateFeeAmount] = useState('');
  const [lateFeeGracePeriod, setLateFeeGracePeriod] = useState('');

  const [late_fee_amountFixed, setLateFeeAmountFixed] = useState(false);
  const [lateFeeGracePeriodFixed, setLateFeeGracePeriodFixed] = useState(false);

  const addPaymentSlab = async () => {
    try {
      if (!parentRentalAmount || !amount || !date) {
        console.log('Caught Error');
      } else {
        let a = {
          pending_rentail_amount: parentRentalAmount,
          security_deposit: securityDeposit,
          amount: amount,
          date: date,
        };
        if (late_fee === 0) {
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
          total = total - amnt;
          setSlabs([...slabs, a]);
          setParentRentalAmount(String(total));
          setSecurityDeposit('');
          setAmount('');
          setDate('');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAmount('');
    setDate('');
    setLateFeeGracePeriod('');
    setLateFeeAmountFixed(false);
    setLateFeeAmount('');
    setLateFeeAmountFixed(false);
  }, [fineType]);

  let lastSlab = slabs.slice(-1)[0];

  const deleteItem = async item => {
    let total = Number(parentRentalAmount);
    let b = total;
    let amnt = Number(item.amount);

    try {
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
  };

  const nextScreen = async () => {
    if (Number(parentRentalAmount) > 0) {
      console.log('Error building');
    } else {
      navigation.navigate('AddContract-5');
    }
  };

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
                              {item?.date}
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
                          {late_fee === 0 && (
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
                            deleteItem(item);
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
            labels={['Late fee applicable?']}
            onChange={i => {
              console.log(i);
              setLateFee(i);
            }}
          />

          {late_fee === 0 && (
            <DropDown
              label="Fine Type"
              datas={[
                {id: 1, label: 'For all', value: '0'},
                {id: 2, label: 'Individual slab', value: '1'},
              ]}
              onChange={val => setFineType(val)}
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
            {late_fee === 0 ? (
              <View>
                <Input
                  label="Late fee amount"
                  switchButton={true}
                  switchButtonData={['Percentage', 'Number']}
                  onChange={e => {
                    setLateFeeAmount(e.nativeEvent.text);
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
                  onChange={e => setLateFeeGracePeriod(e.nativeEvent.text)}
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
              onChange={e => setAmount(e.nativeEvent.text)}
            />
            <DatePicketInput
              label="Date"
              onChange={v => {
                console.log(v);
                setDate(v);
              }}
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
