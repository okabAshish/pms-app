import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';

interface Props {
  onPress?: () => void;
  backgroundColor?: string;
}

const defaultProps: Props = {
  backgroundColor: '#0EB9F2',
};

const AddFloatingButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: props.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: props.backgroundColor,
        borderRadius: 100,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      onPress={() => {
        props.onPress();
      }}>
      <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
    </TouchableOpacity>
  );
};

AddFloatingButton.defaultProps = defaultProps;

export default AddFloatingButton;
