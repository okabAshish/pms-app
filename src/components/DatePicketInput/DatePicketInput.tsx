import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  Text,
  TextInputAndroidProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import CustomAlertModal from '../../container/CustomAlertModal/CustomAlertModal';
import {setError} from '../../features/error/error';

type Props = {
  label?: string;
  placehoder?: string;
  onChange?: (e: string) => void;
  switchButton: boolean;
  switchButtonData: Array<string>;
  keyboardType: KeyboardTypeOptions;
  autoFoucs?: boolean;
  autoCapitalize: boolean;
  autoComplete: TextInputAndroidProps['autoComplete'];
  autoCorrect: boolean;
  containerStyles?: ViewStyle;
  value?: any;
  disabled: boolean;
};

const defaultProps: Props = {
  label: 'Property Title (Nick Name)',
  placehoder: 'Enter a nick name of the property',
  onChange: () => {},
  switchButton: false,
  switchButtonData: ['Sq Ft.', 'Meter'],
  keyboardType: 'default',
  autoFoucs: false,
  autoCapitalize: false,
  autoComplete: 'off',
  autoCorrect: false,
  disabled: false,
  value: `${Date.now()}`,
};

const DatePicketInput = (props: Props) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(props.value);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  console.log(props.value);

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);

    if (date < Date.now()) {
      dispatch(
        setError({
          error: true,
          message: 'Selected Date cannot be less than todays date',
        }),
      );
      setTimeout(() => {
        dispatch(setError({error: false, message: ''}));
      }, 3000);
    } else {
      setSelectedDate(date);
      props.onChange(date);
      hideDatePicker();
    }
  };

  useEffect(() => {
    setSelectedDate(props.value);
  }, [props.value]);

  if (error.error) {
    return <CustomAlertModal />;
  }

  return (
    <View style={{...props.containerStyles}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#45485F',
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
          }}>
          {props?.label}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        disabled={props.disabled}
        onPress={() => setDatePickerVisibility(true)}>
        <Text style={{color: props.disabled ? '#rgba(0,0,0,0.6)' : '#000'}}>
          {props.value}
        </Text>
        <TouchableOpacity
          onPress={() => setDatePickerVisibility(true)}
          disabled={props.disabled}>
          <FontAwesomeIcon
            icon={faCalendar}
            color={props.disabled ? '#rgba(0,0,0,0.6)' : '#000'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

DatePicketInput.defaultProps = defaultProps;

export default DatePicketInput;
