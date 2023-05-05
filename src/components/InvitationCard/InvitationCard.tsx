import {faEdit, faEye, faCopy, faSync} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Network from '../../config'
import { DrawerNavigationConfig } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
    invitation_id: number;
    email: string;
    phone: string;
    building_name: string;
    is_registered: boolean;
    url_key: string;
}

const defaultProps: Props = {
    invitation_id: 0,
    email: 'N/A',
    phone: 'N/A',
    building_name: 'N/A',
    is_registered: false,
    url_key: '',
};

const InvitationCard = (props: Props) => {
  //   console.log(props.building_name);
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
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 10}}>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000',
                            fontSize: 14,
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
                        {props.email != '' ? props.email : props.phone}
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
                        Building Name :
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
                        {props.building_name}
                    </Text>
                    </View>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4,
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000',
                            fontSize: 14,
                            marginRight: 10,
                        }}>
                        Is Registered :
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: props.is_registered ? '#54d2ab' : '#f56a4a',
                            fontSize: 14,
                            textTransform: 'capitalize',
                            paddingHorizontal: 5,
                            backgroundColor: props.is_registered ? '#d5eee7' : '#f8b0b0',
                        }}>
                        {props.is_registered ? 'Yes' : 'No'}
                    </Text>
                    </View>
                </View>
                
                <View style={{flex: 2}}>

                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={() => Clipboard.setString(Network.inviteUrl+props.url_key)}
                        style={{
                            backgroundColor: 'rgb(196,187,249)',
                            padding: 4,
                            borderRadius: 3,
                            marginRight: 8,
                        }}>
                        <FontAwesomeIcon
                            icon={faCopy}
                            color="rgb(159,101,255)"
                            size={12}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgb(254,220,176)',
                            padding: 4,
                            borderRadius: 3,
                        }}>
                        <FontAwesomeIcon 
                            icon={faSync} 
                            color="#fcb761" 
                            size={12} 
                        />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
        </View>
        </TouchableOpacity>
    );
};

InvitationCard.defaultProps = defaultProps;

export default InvitationCard;
