import {faCheck, faEdit, faTrash, faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useAddTermMutation,
  useDeleteTermMutation,
  useDeleteTermTitleMutation,
  useEditTermMutation,
} from '../../features/contract/contract';
import {setContractTermData} from '../../features/contract/contractSlice';
import {
  ContractTermListSingleData,
  ContractTerms,
} from '../../features/contract/contractTypes';
import {RootState} from '../../store';
import Input from '../Input/Input';
import RadioButton from '../RadioButton/RadioButton';
import AddContractSubTermsCard from './AddContractSubTermsCard';

interface Props {
  title_id: string;
  handleSuccess?: () => void;
  handleValue?: (val: string) => void;
  handleModal?: (b: boolean) => void;
  handleId?: (v: number) => void;
  handleTerm: (v: string) => void;
  terms: any;
  item: any;
}

let demoTerms = [
  {id: 1, term: 'Lome Ipsume', createdBy: null, type: 0},
  {id: 1, term: 'Lome Ipsume', createdBy: 59, type: 1},
];

const AddContractTermsCard = (props: Props & ContractTermListSingleData) => {
  const dispatch = useDispatch();
  const {user} = useSelector<RootState>(state => state.auth);
  const contract = useSelector<RootState>(state => state.contract);
  const user_details = JSON.parse(user);

  const [Term, setTerm] = useState(false);

  const [showSubTerms, setShowSubTerms] = useState(false);
  const [showInputForNewTerm, setShowInputForNewTerm] = useState(false);
  const [newTerm, setNewTerm] = useState('');
  const [newTerms, setnewTerms] = useState<ContractTerms>(props.terms);
  const [showSubTermsData, setShowSubTermsData] = useState(true);
  const [subTermId, setSubTermId] = useState(null);

  const [addTerm] = useAddTermMutation();
  const [editTerm] = useEditTermMutation();
  const [deleteTermTitle] = useDeleteTermTitleMutation();
  const [deleteTerm] = useDeleteTermMutation();

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      `Are you sure you want to delete Term title`,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            deleteTitle();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const confirmDeleteSubMenu = (id: number) => {
    return Alert.alert(
      'Are your sure?',
      `Are you sure you want to delete term`,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            delet(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const deleteTitle = async () => {
    try {
      await deleteTermTitle({param: props.id})
        .unwrap()
        .then(res => {
          if (res?.success) {
            props.handleSuccess();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const delet = async (id: number) => {
    console.log(id);
    try {
      await deleteTerm({param: id})
        .unwrap()
        .then(res => {
          console.log(res);
          if (res?.success) {
            console.log(res);
            props.handleSuccess();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const add = async () => {
    try {
      await addTerm({term: newTerm, title_id: props.title_id})
        .unwrap()
        .then(res => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (id: number) => {
    try {
      await editTerm({title: JSON.stringify({term: newTerm}), param: id})
        .unwrap()
        .then(res => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(newTerms);

  const handleTermCheck = () => {
    // props.handleTerm(props.title_id);

    let a = [];

    for (let i = 0; i < props.terms.length; i++) {
      a.push(props?.terms[i]?.id);
    }

    let t = [];
    if (contract?.title_term_data) {
      t = JSON.parse(contract?.title_term_data);
    }

    if (t.length > 0) {
      const index = t.findIndex(obj => obj.title_id === props.title_id);

      if (index !== -1) {
        // Object is present, so remove it from the array
        t.splice(index, 1);
      } else {
        // Object is not present, so add it to the array
        t.push({title_id: props.title_id, terms_data: [...a]});
      }
    } else {
      t.push({title_id: props.title_id, terms_data: [...a]});
    }

    console.log(t, 'LLLLL');

    dispatch(
      setContractTermData({
        title_term_data: JSON.stringify(t),
      }),
    );
  };

  const handleSubTermCheck = (term_id, title_id) => {
    // props.handleTerm(props.title_id);

    let t = [];
    if (contract?.title_term_data) {
      t = JSON.parse(contract?.title_term_data);
    }

    if (t.length > 0) {
      console.log('called');
      // console.log(first)
      const index = t.findIndex(obj => obj.title_id === title_id);

      console.log(t.findIndex(obj => obj.title_id === title_id));

      if (index !== -1) {
        // Object is present, so remove it from the array

        const i = t[index].terms_data.findIndex(ob => ob === term_id);

        if (i !== -1) {
          console.log('AA');
          t[index].terms_data.splice(i, 1);
        } else {
          console.log('AB');

          let a = [...t[index].terms_data, term_id];
          t[index].terms_data = a;
        }
      } else {
        console.log('AC');

        t.push({title_id: title_id, terms_data: [term_id]});
      }
    } else {
      t.push({title_id: title_id, terms_data: [term_id]});
    }

    console.log(t, '>>>>>>>T');
    dispatch(setContractTermData({title_term_data: JSON.stringify(t)}));
  };

  useEffect(() => {
    setnewTerms(props.terms);
  }, [showSubTermsData]);

  return (
    <TouchableOpacity
      onLongPress={() => {
        setTerm(!Term);
        handleTermCheck();
      }}
      onPress={() => setShowSubTerms(!showSubTerms)}
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f5f5f5',
        elevation: 1,
        shadowColor: 'rgba(0,0,0,0.6)',
      }}>
      <View
        style={{
          flexDirection: 'row',

          justifyContent: 'space-between',
        }}>
        <RadioButton
          labels={[props.title]}
          value={Term ? '0' : ''}
          onChange={v => {
            if (v === 0) {
              setTerm(true);
            } else {
              setTerm(false);
            }
            handleTermCheck();
          }}
          buttonSize={18}
          borderColor="#f5f5f5"
          textStyle={{
            flexWrap: 'wrap',
            color: '#000',
            fontFamily: 'Poppins-Regular',
            marginLeft: 5,
            // flex: 1,
            flexDirection: 'column',
          }}
          containerStyles={{flex: 1}}
        />
        {props.type === 1 && user_details.user_id === props.created_by && (
          <View>
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
                props?.handleValue(props.title);
                props?.handleModal(true);
                props.handleId(props.id);
              }}>
              <FontAwesomeIcon icon={faEdit} color="#fff" />
              <Text style={{color: '#fff', marginHorizontal: 5}}>Edit</Text>
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
              onPress={() => showConfirmDialog()}>
              <FontAwesomeIcon icon={faTrash} color="#fff" />
              <Text style={{color: '#fff', marginHorizontal: 5}}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showSubTerms && (
        <View style={{paddingHorizontal: 12, marginTop: 20}}>
          {showSubTermsData &&
            newTerms.map((item, index) => {
              return (
                <AddContractSubTermsCard
                  id={item.id}
                  key={item.id + index}
                  title_id={item.title_id}
                  created_by={item.created_by}
                  term={item.term}
                  type={item.type}
                  user_details={user_details}
                  setSubTermId={e => setSubTermId(e)}
                  setNewTerm={e => setNewTerm(e)}
                  setShowInputForNewTerm={e => setShowInputForNewTerm(e)}
                  setShowSubTermsData={e => setShowSubTermsData(e)}
                  confirmDeleteSubMenu={e => confirmDeleteSubMenu(e)}
                  handleSubTermCheck={(a, b) => handleSubTermCheck(a, b)}
                />
              );
            })}
          <View style={{marginTop: -12}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {!showInputForNewTerm && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: '#45485F',
                    borderRadius: 3,
                    marginTop: 12,
                  }}
                  onPress={() => setShowInputForNewTerm(true)}>
                  <Text style={{color: '#fff'}}>Add +</Text>
                </TouchableOpacity>
              )}
              {showInputForNewTerm && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <Input
                    inputStyles={{
                      backgroundColor: '#f5f5f5',
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderRadius: 4,
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                    }}
                    label="Enter Terms"
                    placehoder="Enter Terms"
                    containerStyles={{flex: 1}}
                    onChange={e => setNewTerm(e.nativeEvent.text)}
                    value={newTerm}
                  />
                  <TouchableOpacity
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 4,
                      backgroundColor: 'lightgreen',
                      borderRadius: 5,
                      marginLeft: 10,
                      // marginTop: -12,
                      marginBottom: 14,
                    }}
                    onPress={() => {
                      if (newTerm.length > 0) {
                        if (showSubTermsData) {
                          add();
                          setShowInputForNewTerm(false);
                          props.handleSuccess();
                        } else {
                          edit(subTermId);
                          setShowInputForNewTerm(false);
                          props.handleSuccess();
                        }
                        // setShowInputForNewTerm(false);
                        // let a = [...newTerms];
                        // a.push({
                        //   id: newTerm.length + 1,
                        //   term: newTerm,
                        //   createdBy: 56,
                        //   type: 1,
                        // });
                        // setnewTerms(a);
                      }
                    }}>
                    <FontAwesomeIcon icon={faCheck} color="#fff" size={12} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 4,
                      backgroundColor: '#45485F',
                      borderRadius: 5,
                      marginLeft: 10,
                      // marginTop: -12,
                      marginBottom: 14,
                    }}
                    onPress={() => {
                      setShowSubTermsData(true);

                      setShowInputForNewTerm(false);
                    }}>
                    <FontAwesomeIcon icon={faX} color="#fff" size={12} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AddContractTermsCard;
