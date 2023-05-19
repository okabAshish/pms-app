import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  icon: any;
  title: string;
  desc: string;
};

const defaultprops: Props = {
  icon: faCalendar,
  title: 'Built Year',
  desc: '2015',
};

const PropertyViewApplicationCard = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // marginHorizontal: 12,
        marginVertical: 10,
        width: 180,
      }}>
      <View
        style={{
          backgroundColor: '#33CCFF',
          borderRadius: 3,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          width: 40,
          height: 40,
          marginRight: 10,
        }}>
        <FontAwesomeIcon icon={props.icon} color="#fff" size={20} />
      </View>
      <View>
        <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
          {props.title}
        </Text>
        <Text
          style={{
            color: '#86868694',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
          }}>
          {props.desc}
        </Text>
      </View>
    </View>
  );
};

PropertyViewApplicationCard.defaultProps = defaultprops;

export default PropertyViewApplicationCard;
