import React, {useState} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

type DropDownDataObj = {
  id?: string | number;
  label: string;
  value: string;
};

type Props = {
  label?: string;
  onChange: (v: string) => void;
  containerStyles?: ViewStyle;
  dropDownHeight: number;
  datas: Array<DropDownDataObj>;
};

const defaultProps: Props = {
  label: 'Property Title (Nick Name)',
  dropDownHeight: 200,
  onChange: () => {},
  datas: data,
};

const DropDown = (props: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={{marginVertical: 10, flex: 1, ...props.containerStyles}}>
      <Text style={{color: '#45485F', marginBottom: 10}}>{props.label}</Text>
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={props.datas}
          maxHeight={props.dropDownHeight}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            props?.onChange(item?.value);
          }}
        />
      </View>
    </View>
  );
};

DropDown.defaultProps = defaultProps;

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  dropdown: {
    minHeight: 38,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: '#000',
  },
});
