import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';

type LabelData = {
  slug: string;
  title: string;
};

type Props = {
  labels: Array<LabelData>;
  containerStyles: ViewStyle;
  value: Array<string>;
};

const defaultProps: Props = {
  labels: [{slug: 'Bed', title: 'Bed'}],
  value: [''],
};

const CheckBox = (props: Props) => {
  const [checked, setChecked] = useState([...props.value]);
  return (
    <View style={{...props.containerStyles}}>
      {props.labels.map((item, index) => (
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
              backgroundColor: checked === item ? '#0EB9F2' : '#f5f5f5',
              elevation: 2,
              borderWidth: 0.5,
              borderColor: '#f3f3f3',
              borderRadius: 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}
            onPress={() => {
              let a = checked;
              if (checked.find(v => v === item.slug)) {
                const index = a.indexOf(item.slug);
                if (index > -1) {
                  // only splice array when item is found
                  a.splice(index, 1); // 2nd parameter means remove one item only
                }
              } else {
                a = [...a, item.slug];
                setChecked(a);
              }
            }}>
            {/* {checked === item && <FontAwesomeIcon icon={faCheck} />} */}
          </TouchableOpacity>
          <Text>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

CheckBox.defaultProps = defaultProps;

export default CheckBox;
