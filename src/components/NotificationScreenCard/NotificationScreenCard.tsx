import {faMessage} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

const NotificationScreenCard = (props: Props) => {
  return (
    <View
      style={{
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 4,
        elevation: 5,
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faMessage} color="#00ABE4" size={16} />
        <Text
          style={{
            color: '#00ABE4',
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            marginLeft: 8,
          }}>
          Message
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#000',
            marginLeft: 10,
          }}>
          . Now
        </Text>
      </View>
      <Text
        style={{
          color: '#000',
          fontFamily: 'Poppins_regular',
          marginVertical: 6,
          textTransform: 'capitalize',
        }}>
        Djcjdn
      </Text>
      <Text
        style={{
          color: 'rgba(0,0,0,0.5)',
          fontFamily: 'Poppins_regular',
        }}>
        NotificationScreenCard
      </Text>
    </View>
  );
};

export default NotificationScreenCard;
