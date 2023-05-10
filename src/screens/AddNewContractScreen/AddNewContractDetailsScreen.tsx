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
import DatePicketInput from '../../components/DatePicketInput/DatePicketInput';
import DropDown from '../../components/DropDown/DropDown';
import Input from '../../components/Input/Input';

type Props = {};

const AddNewContractDetailsScreen = (props: Props) => {
  const navigation = useNavigation();
  const [start_date, setStartDate] = useState(Date.now());
  const [contractPeriod, setContractPeriod] = useState(0);
  const [gracePeriod, setGracePeriod] = useState(0);
  const [noticePeriod, setNoticePeriod] = useState(60);
  const [switchModeType, setSwitchModeType] = useState('Percentage');

  const [last_date, setLastDate] = useState(Date.now());

  const changeEndDate = () => {
    const end = dayjs(start_date).add(contractPeriod + gracePeriod, 'M');
    console.log(end, 'END');
    setLastDate(end);
  };

  useEffect(() => {
    changeEndDate();
  }, [start_date]);

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
            datas={[
              {label: 'Residental', value: 'Residental', id: 1},
              {label: 'Commercial', value: 'Commercial', id: 2},
            ]}
            onChange={value => {
              console.log(value);
              //   setProperty({...property, type: value});
            }}
          />
          <Input
            label="Contract period (In Months)"
            placehoder="Enter contract period"
            keyboardType="numeric"
            onChange={() => {}}
          />

          <Input
            label="Grace Period (In Month)"
            placehoder="0"
            keyboardType="numeric"
            onChange={() => {}}
          />
          <DatePicketInput
            label="Start Date"
            containerStyles={{marginVertical: 5}}
            onChange={val => setStartDate(val)}
          />
          <DatePicketInput
            label="End Date"
            disabled
            containerStyles={{marginVertical: 5}}
            value={last_date}
          />
          <Input
            label="Notice Period (In Days)"
            value={noticePeriod}
            onChange={val => setNoticePeriod(val.nativeEvent.text)}
            placehoder="Enter Notice Period (In Days)"
          />
          <Input
            label="Security Deposit"
            onChange={e => {}}
            placehoder="Enter security deposit amount"
          />
          <Input
            label="Monthly rent"
            onChange={e => {}}
            placehoder="Enter monthly rent amount"
          />
          <Input
            label="Monthly service charge"
            onChange={e => {}}
            placehoder="Enter service charge amount"
          />
          <Input
            label="Other charge"
            onChange={e => {}}
            placehoder="Enter Other charges"
          />
          <Input
            label="Discount"
            switchButton={true}
            switchButtonData={['Percentage', 'Number']}
            onChange={e => {}}
            placehoder="Enter Other charges"
            switchModeType={switchModeType}
            setSwitchModeType={val => setSwitchModeType(val)}
          />
          <Input
            disabled={true}
            label="Total rental amount"
            placehoder="0"
            value={String(4000)}
          />
          <Input
            disabled={true}
            label="Total Contract Amount"
            placehoder="Total Payable Amount"
            value={String(4000)}
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
              onPress={() => navigation.navigate('AddContract-4')}>
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
