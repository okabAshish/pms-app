import * as Icon from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {Text, View, ViewStyle} from 'react-native';
import CheckBoxButton from './CheckBoxButton';

type LabelData = {
  slug: string;
  title: string;
  icon?: string;
  id: number;
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
  const [checked, setChecked] = useState(props.value);

  // console.log(props.labels, 'CheckBox');

  const createIcon = (icon: string) => {
    let a = `${icon?.split(' ')[1].split('-')[1]}`;

    let str = a.charAt(0).toUpperCase() + a.slice(1);

    return Icon['fa' + str];
  };

  useEffect(() => {
    setChecked(props.value);
  }, [props.value]);

  return (
    <View style={{...props.containerStyles}}>
      {props.labels.map((item, index) => {
        // console.log(checked.includes(item?.slug));

        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 4,
            }}
            key={item.slug + index.toString()}>
            <CheckBoxButton
              value={item.id}
              onChange={(v: string) => {
                let a = checked;
                if (a.includes(v)) {
                  const i = a.indexOf(v);
                  if (i > -1) {
                    // only splice array when item is found
                    a.splice(i, 1); // 2nd parameter means remove one item only
                  }
                  setChecked(a);
                  props.onChange(a);
                } else {
                  a = [...a, v];
                  setChecked(a);
                  props.onChange(a);
                }
              }}
              checked={checked.find(val => val === item.id)}
            />

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
