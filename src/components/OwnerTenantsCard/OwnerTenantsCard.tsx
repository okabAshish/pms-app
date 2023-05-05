import {
  faEnvelope,
  faEye,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface Props {
  tenant_id: string;
  tenant_type: string;
  name: string;
  email: string;
  phone: string;
}

const defaultProps: Props = {
  tenant_id: 'TNT_00000001',
  tenant_type: 'Individal',
  name: 'N/A',
  email: 'Mailto:' + 'N/A',
  phone: 'N/A',
};

const OwnerTenantsCard = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        borderLeftWidth: 2,
        borderColor: '#00ABE4',
        backgroundColor: '#f5f5f5',
        borderRadius: 9,
        marginTop: 20,
      }}>
      <View style={{paddingHorizontal: 12, paddingVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 11}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 9,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Tenant ID :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.tenant_id}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  fontSize: 14,
                }}>
                Tenant Type :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 12,
                  textTransform: 'capitalize',
                  marginLeft: 8,
                  flex: 1,
                  flexWrap: 'wrap',
                }}>
                {props.tenant_type}
              </Text>
            </View>

            {props.name && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <FontAwesomeIcon icon={faUser} size={12} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    marginLeft: 5,
                  }}>
                  Name :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.name}
                </Text>
              </View>
            )}

            {props.email && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <FontAwesomeIcon icon={faEnvelope} size={12} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    marginLeft: 5,
                  }}>
                  Email :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.email}
                </Text>
              </View>
            )}

            {props.phone && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <FontAwesomeIcon icon={faPhone} size={12} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    marginLeft: 5,
                  }}>
                  Phone :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 12,
                    textTransform: 'capitalize',
                    marginLeft: 8,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {props.phone}
                </Text>
              </View>
            )}
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(69, 72, 95, 0.4)',
                  padding: 4,
                  borderRadius: 3,
                }}>
                <FontAwesomeIcon
                  icon={faEye}
                  color="rgba(0, 0, 0, 0.5)"
                  size={12}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

OwnerTenantsCard.defaultProps = defaultProps;

export default OwnerTenantsCard;
