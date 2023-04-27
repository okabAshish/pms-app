/* eslint-disable prettier/prettier */
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Tooltip } from '@rneui/base';
import React from 'react';
import {
    TextInput as Input,
    NativeSyntheticEvent,
    StyleSheetProperties,
    Text,
    TextInputChangeEventData,
    View,
} from 'react-native';

type Props = {
    placeholder?: string;
    autoCorrect?: boolean;
    autoFocus?: boolean;
    value: any;
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    multiline?: boolean;
    title?: string;
    tooltip?: string;
    style?: StyleSheetProperties;
};

const defaultProps: Props = {
    placeholder: 'Enter Email or Phone',
    autoCorrect: false,
    autoFocus: false,
    multiline: false,
    value: undefined,
    onChange: function (e: NativeSyntheticEvent<TextInputChangeEventData>): void {
        throw new Error('Function not implemented.' + e.nativeEvent.text);
    },
    title: 'Phone Or Email Address',
    tooltip: 'Enter Email or Phone',
};

const TextInput = (props: Props) => {
    props = { ...defaultProps, ...props };

    const [visible, setVisible] = React.useState(false);
    const [focus, setFocus] = React.useState(false);

    console.log(focus);
    return (
        <View style={props.style}>
            <View style={{ flexDirection: 'row' }}>
                <Text
                    style={{ fontSize: 12, color: '#000', fontWeight: 400, height: 18 }}>
                    {props.title}
                </Text>
                <Tooltip
                    containerStyle={{ marginTop: 22, marginLeft: -10, width: 200 }}
                    backgroundColor={'#fff'}
                    visible={visible}
                    onOpen={() => setVisible(true)}
                    onClose={() => setVisible(false)}
                    popover={
                        <Text style={{ flexWrap: 'wrap', fontSize: 12 }}>
                            {props.tooltip}
                        </Text>
                    }
                    withPointer={false}>
                    <View
                        style={{
                            backgroundColor: 'rgba(90, 207, 246, 1)',
                            borderRadius: 9999,
                            padding: 2,
                        }}>
                        <FontAwesomeIcon icon={faInfo} size={6} />
                    </View>
                </Tooltip>
            </View>
            <Input
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={{
                    borderBottomWidth: 1,
                    borderRadius: 0,
                    borderColor: focus ? '#45485F' : '#aaa',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    fontSize: 14,
                }}
                placeholder={props.placeholder}
            />
        </View>
    );
};

export default TextInput;
