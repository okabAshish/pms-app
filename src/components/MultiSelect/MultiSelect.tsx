import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';

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

type MultiSelectDataObj = {
  id?: string | number;
  label: string;
  value: string;
};

type Props = {
  label?: string;
  onChange: (v: Array<string>) => void;
  containerStyles?: ViewStyle;
  maxHeight: number;
  datas: Array<MultiSelectDataObj>;
  value?: Array<string>;
  search?: boolean;
};

const defaultProps: Props = {
  label: 'Property Title (Nick Name)',
  maxHeight: 200,
  onChange: () => {},
  datas: data,
  search: false,
};

const MultiSelectDropDown = (props: Props) => {
  const [value, setValue] = useState(props.value);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={{marginVertical: 10, flex: 1, ...props.containerStyles}}>
      <Text style={{color: '#45485F', marginBottom: 10}}>{props.label}</Text>
      <View>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: '#000'}}
          data={props.datas}
          search={props.search}
          maxHeight={props.maxHeight}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item);
            setIsFocus(false);
            props?.onChange(item);
          }}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <FontAwesomeIcon color="black" icon={faTrash} size={17} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

MultiSelectDropDown.defaultProps = defaultProps;

export default MultiSelectDropDown;

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
    // color: 'white',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    // color: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.4)',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    color: '#000',
  },
  inputSearchStyle: {
    borderRadius: 5,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
