import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import RadioButton from '../RadioButton/RadioButton';

type Props = {
  handleSubTermCheck: (v: string, a: string) => void;
  id: number;
  title_id: number;
  type: number;
  created_by: number;
  user_details: any;
  term: string;
  term_title: boolean;
  setShowInputForNewTerm: (e: boolean) => void;
  setNewTerm: (e: string) => void;
  setShowSubTermsData: (e: boolean) => void;
  setSubTermId: (e: string) => void;
  confirmDeleteSubMenu: (e: string) => void;
  checked: any;
};

const AddContractSubTermsCard = (props: Props) => {
  const dispatch = useDispatch();

  const contract = useSelector<RootState>(s => s.contract);

  const [checked, setChecked] = useState('');

  const checkContract = () => {
    if (contract?.title_term_data?.length > 0) {
      let t = JSON.parse(contract?.title_term_data);

      const index = t.findIndex(obj => obj.title_id === props.title_id);

      if (index !== -1) {
        // Object is present, so remove it from the array
        let i = t[index].terms_data.findIndex(o => o === props.id);

        if (i !== -1) {
          setChecked(true);
        }
      } else {
        // Object is not present, so add it to the array
        setChecked(false);
        return;
      }
    }
  };

  useEffect(() => {
    checkContract();
  }, []);

  useEffect(() => {
    console.log(props.checked && props.term_title, 'cHECk');
    if (props.terms?.length > 0) {
      setChecked(props.checked);
    } else if (props.term_title) {
      setChecked(props.id);
    } else if (!props.term_title) {
      setChecked('');
    }
  }, [props.checked, props.term_title]);

  console.log(props.checked, '[][]');

  return (
    <View key={props.id} style={{flexDirection: 'row'}}>
      <RadioButton
        labels={[{id: props.id, name: props?.term}]}
        buttonSize={14}
        textStyle={{
          flexWrap: 'wrap',
          color: '#484848',
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
          marginLeft: 5,
          // flex: 1,
          flexDirection: 'column',
        }}
        containerStyles={{flex: 1}}
        onChange={e => {
          setChecked(props.id);
          props.handleSubTermCheck(props.id, props.title_id);
        }}
        value={checked ? checked : ''}
      />
      {props.type === 1 && props?.created_by === props.user_details.user_id && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              marginVertical: 5,
              flexDirection: 'row',
              backgroundColor: '#00ABE4',
              paddingLeft: 10,
              paddingRight: 8,
              borderRadius: 3,
              paddingVertical: 4,
            }}
            onPress={() => {
              props.setShowInputForNewTerm(true);
              props.setNewTerm(props?.term);
              props.setShowSubTermsData(false);
              props.setSubTermId(props?.id);
            }}>
            <FontAwesomeIcon icon={faEdit} color="#fff" size={12} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              flexDirection: 'row',
              backgroundColor: '#45485F',
              paddingLeft: 10,
              paddingRight: 8,
              borderRadius: 3,
              paddingVertical: 4,
            }}
            onPress={() => {
              confirmDeleteSubMenu(props?.id);
            }}>
            <FontAwesomeIcon icon={faTrash} color="#fff" size={12} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddContractSubTermsCard;
