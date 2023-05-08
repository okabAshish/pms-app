import * as Icon from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';

type LabelData = {
  slug: string;
  title: string;
  icon?: string;
};

type Props = {
  labels: Array<LabelData>;
  containerStyles: ViewStyle;
  onChange: (e: Array<string>) => void;
  value: Array<string>;
};

const defaultProps: Props = {
  labels: [{slug: 'Bed', title: 'Bed', icon: 'fas fa-bed'}],
  onChange: () => {},
  value: [''],
};

const CheckBox = (props: Props) => {
  const [checked, setChecked] = useState([...props.value]);

  const createIcon = (icon: string) => {
    let a = `${icon?.split(' ')[1].split('-')[1]}`;

    let str = a.charAt(0).toUpperCase() + a.slice(1);

    return Icon['fa' + str];
  };

  return (
    <View style={{...props.containerStyles}}>
      {props.labels.map((item, index) => {
        console.log(checked.includes(item?.slug));

        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <TouchableOpacity
              style={{
                padding: 4,
                height: 24,
                width: 24,
                backgroundColor: checked.includes(item.slug)
                  ? '#0EB9F2'
                  : '#f5f5f5',
                elevation: 2,
                borderWidth: 0.5,
                borderColor: '#f3f3f3',
                borderRadius: 2,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
              }}
              onPress={() => {
                let a = checked;
                if (checked.find(v => v === item.slug)) {
                  console.log('first');
                  const index = a.indexOf(item.slug);
                  if (index > -1) {
                    // only splice array when item is found
                    a.splice(index, 1); // 2nd parameter means remove one item only
                  }
                  setChecked(a);
                  props.onChange(a);
                } else {
                  a = [...a, item.slug];
                  setChecked(a);
                  props.onChange(a);
                }
              }}>
              {/* {checked === item && <FontAwesomeIcon icon={faCheck} />} */}
            </TouchableOpacity>

            {item?.icon && (
              <FontAwesomeIcon
                icon={createIcon(item?.icon)}
                size={20}
                style={{marginLeft: 10}}
              />
            )}

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                marginLeft: 10,
                fontSize: 14,
              }}>
              {item.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

CheckBox.defaultProps = defaultProps;

export default CheckBox;
