import {faEdit, faEye, faCopy, faSync} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { DrawerNavigationConfig } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
    invitation_id: number;
    invited_by: string;
    property_id: string;
    property_name: string;
    property_type: string;
    property_size: string;
    invite_date: string;
    status: boolean;
}

const defaultProps: Props = {
    invitation_id: 0,
    invited_by: 'N/A',
    property_id: 'N/A',
    property_name: 'N/A',
    property_type: 'N/A',
    property_size: 'N/A',
    invite_date: 'N/A',
    status: false,
}

const TenantInvitationCard = (props: Props) => {

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
                        Invited By :
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
                        {props.invited_by}
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
                        Property ID :
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
                        {props.property_id}
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
                        Property Nick Name :
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
                        {props.property_name}
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
                        Property Type :
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
                        {props.property_type}
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
                        Property Size (In Sq Ft) :
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
                        {props.property_size}
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
                        Invite Date :
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
                        {props.invite_date}
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
                        Status :
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: props.status ? '#54d2ab' : '#f56a4a',
                            fontSize: 14,
                            textTransform: 'capitalize',
                            paddingHorizontal: 5,
                            backgroundColor: props.status ? '#d5eee7' : '#f8b0b0',
                        }}>
                        {props.status ? 'Approved' : 'Cancelled'}
                    </Text>
                    </View>
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
        </View>
        </TouchableOpacity>
    );
};

TenantInvitationCard.defaultProps = defaultProps;

export default TenantInvitationCard;
