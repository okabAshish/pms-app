import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, Text, TouchableOpacity, View} from 'react-native';
import {
  useAddTermsTitleMutation,
  useEditTermTitleMutation,
} from '../../features/contract/contract';
import {ContractTermUpdateBody} from '../../features/contract/contractTypes';
import Input from '../Input/Input';

const DEVICE_WIDTH = Dimensions.get('window').width;

type Props = {
  isVisible: boolean;
  value?: string;
  handleModal?: (value: boolean) => void;
  id?: number;
};

const defaultProps: Props = {
  isVisible: false,
};

const AddContractTermTitleCard = (props: Props) => {
  const [title, setTitle] = useState(props.value ? props.value : '');
  //   console.log(props.value);

  const [addTitle] = useAddTermsTitleMutation();
  const [editTitle] = useEditTermTitleMutation();

  const add = async () => {
    try {
      await addTitle({title: title})
        .unwrap()
        .then(res => {
          props.handleModal(false);
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async () => {
    try {
      let body: ContractTermUpdateBody = {
        param: props.id,
        title: JSON.stringify({title: title}),
      };

      await editTitle(body)
        .unwrap()
        .then(res => {
          props.handleModal(false);
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTitle(props.value);
  }, [props.value]);

  return (
    <Modal visible={props.isVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.75)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: DEVICE_WIDTH - 100,
            backgroundColor: '#fff',
            borderRadius: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Input
            label="Enter term title"
            placehoder="Term title"
            onChange={e => setTitle(e.nativeEvent.text)}
            value={title}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 14,
                paddingVertical: 5,
                backgroundColor: '#00ABE4',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                props.value ? edit() : add();
              }}>
              <Text
                style={{
                  fontSize: 12,
                  height: 18,
                  fontFamily: 'Poppins-SemiBold',

                  color: '#fff',
                }}>
                {props.value ? 'Edit' : 'Add'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 14,
                paddingVertical: 5,
                backgroundColor: '#45485F',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                props.handleModal(false);
              }}>
              <Text
                style={{
                  fontSize: 12,
                  height: 18,
                  fontFamily: 'Poppins-SemiBold',

                  color: '#fff',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

AddContractTermTitleCard.defaultProps = defaultProps;

export default AddContractTermTitleCard;
