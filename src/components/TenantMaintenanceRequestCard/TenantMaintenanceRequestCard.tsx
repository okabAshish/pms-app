import {
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';

interface Props {
  property_name: string;
  priority: string;
  category: string;
  issue_date: string;
  assign_vendor: string;
  status: string;
}

const defaultProps: Props = {
  property_name: 'N/A',
  priority: 'N/A',
  category: 'N/A',
  issue_date: 'N/A',
  assign_vendor: 'N/A',
  status: 'N/A'
}

const TenantMaintenanceRequestCard = (props: Props) => {
  console.log(props);
  return (
    <TouchableOpacity
        style={{
            borderWidth: 2,
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
                        property Name :
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
                        Priority :
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
                        {props.priority}
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
                        Category :
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
                        {props.category}
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
                        Issue Date :
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
                        {dayjs(props.issue_date).format('DD MMM, YYYY')}
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
                        Assigned Vendor :
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
                        {props.assign_vendor}
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
                        {props.status}
                    </Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity>                        
                        <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        color="#00ABE4"
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

export default TenantMaintenanceRequestCard;
