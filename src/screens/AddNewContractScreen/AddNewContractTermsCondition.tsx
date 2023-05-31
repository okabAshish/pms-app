import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import AddContractTermTitleCard from '../../components/AddContractTermTitleCard/AddContractTermTitleCard';
import AddContractTermsCard from '../../components/AddContractTermsCard/AddContractTermsCard';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {
  useAddContractMutation,
  useGetTermsListMutation,
  useUpToDateContractMutation,
} from '../../features/contract/contract';
import {setContractTermData} from '../../features/contract/contractSlice';
import {
  AddContractBodyData,
  ContractTermList,
} from '../../features/contract/contractTypes';
import {RootState} from '../../store';

type Props = {};

const AddNewContractTermsCondition = (props: Props) => {
  const contract: AddContractBodyData = useSelector<RootState>(
    state => state.contract,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [termTitles, setTermTitles] = useState<ContractTermList>([]);
  const [checkedTermTitles, setCheckedTermTitles] = useState<ContractTermList>(
    [],
  );

  console.log(props?.route?.params, 'PARAMS');

  const [ContractScreenType, setContractScreenType] = useState(
    props?.route?.params?.type,
  );
  const [selectedTermTitles, setSelectedTermTitles] = useState([]);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addContract] = useAddContractMutation();
  const [upToDateContract] = useUpToDateContractMutation();

  const handleSuccess = () => {
    setTimeout(() => {
      setSuccess(!success);
    }, 1000);
  };
  const handleModal = (value: boolean) => {
    setShowTitleModal(value);
  };
  const [titleValue, setTitleValue] = useState('');
  const [id, setId] = useState(null);

  const [getTermsList] = useGetTermsListMutation();

  console.log(contract, 'Contract -5');
  console.log(contract.title_term_data);

  const allTerms = async () => {
    setLoading(true);
    try {
      // setLoading(true);
      await getTermsList({})
        .unwrap()
        .then(res => {
          setTermTitles(res.data);
          if (ContractScreenType === 'Edit') {
            let a = [...JSON.parse(contract.title_term_data)];
            let b = [];

            console.log(props?.route?.params?.terms, 'EDIT', 'RES', 'Runn');
            setCheckedTermTitles(JSON.parse(props?.route?.params?.terms));

            for (let i = 0; i < a?.length; i++) {
              let c = [];

              for (let j = 0; j < a[i].terms?.length; j++) {
                c.push(a[i].terms[j].id);
              }

              b.push({
                title_id: a[i].title_id,
                terms_data: c,
              });
            }
            setSelectedTermTitles(b);
          }
        });
      // setLoading(true);
    } catch (err) {
      console.log(err, '>>>>>>Error');
    }
    setLoading(false);
  };

  const handleId = (v: number) => {
    console.log(v, '<<<<VAL');
    setId(v);
  };

  const handleValue = (val: string) => {
    setTitleValue(val);
  };

  const handleTermsTitle = val => {
    let a = selectedTermTitles;
    if (a.includes({title_id: val})) {
      const i = a.indexOf({title_id: val});
      if (i > -1) {
        // only splice array when item is found
        a.splice(i, 1); // 2nd parameter means remove one item only
      }
    } else {
      a.push({title_id: val, term_data: []});
    }
    console.log(a, 'Added');
    setSelectedTermTitles(a);
  };

  const saveContract = async () => {
    setLoading(true);
    try {
      console.log(contract);
      await addContract(contract)
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            navigation.navigate('Main', {scree: 'Contreact'});
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const updateContract = async () => {
    setLoading(true);
    try {
      console.log(contract);

      let con = contract;

      console.log(con, 'COn');

      await upToDateContract({body: con, params: props?.route?.params?.id})
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.success) {
            navigation.navigate('Main', {scree: 'Contreact'});
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    allTerms();
  }, [showTitleModal, success]);

  useEffect(() => {
    if (props?.route?.params?.terms) {
      dispatch(
        setContractTermData({title_term_data: props?.route?.params?.terms}),
      );
      setCheckedTermTitles(JSON.parse(props?.route?.params?.terms));
    }
    setContractScreenType(props?.route?.params?.type);
  }, [props?.route?.params?.type]);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{backgroundColor: '#45485F', flex: 1}}>
      <StatusBar backgroundColor={'#45485F'} barStyle="light-content" />

      <KeyboardAwareScrollView
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#00ABE4',
              height: 32,
              width: 32,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 21,
              }}>
              4
            </Text>
          </View>
          <Text
            style={{
              color: '#00ABE4',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
            }}>
            Terms & Condition
          </Text>
        </View>

        <KeyboardAwareScrollView style={{marginTop: 20}}>
          {termTitles.map((item, index) => {
            console.log(
              checkedTermTitles.find(val => val),
              'lap',
            );
            return (
              <AddContractTermsCard
                item={item}
                key={index.toString()}
                terms={item?.terms}
                id={item?.id}
                title={item?.title}
                type={item?.type}
                created_by={item?.created_by}
                handleValue={handleValue}
                handleModal={handleModal}
                title_id={`${item?.id}`}
                handleSuccess={handleSuccess}
                handleId={handleId}
                handleTerm={v => {
                  console.log(v, 'asdadas');
                  handleTermsTitle(v);
                }}
                checked={
                  checkedTermTitles.find(val => val.title_id == item.id)
                    ? true
                    : false
                }
                subTermChecked={
                  checkedTermTitles.find(val => val.title_id == item.id)
                    ?.terms_data
                }
              />
            );
          })}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#45485F',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 5,
              }}
              onPress={() => {
                handleModal(!showTitleModal);
                handleValue('');
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  color: '#fff',
                }}>
                Add New Title
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <AddContractTermTitleCard
          isVisible={showTitleModal}
          handleModal={handleModal}
          value={titleValue}
          id={id}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              marginVertical: 32,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 24,
                paddingVertical: 5,
                backgroundColor: '#00ABE4',
                borderRadius: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                if (ContractScreenType === 'Edit') {
                  updateContract();
                } else {
                  saveContract();
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginRight: 5,
                  color: '#fff',
                }}>
                {ContractScreenType === 'Edit' ? 'Update' : 'Save'}
              </Text>
              {/* <FontAwesomeIcon icon={faChevronRight} size={12} color="#fff" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddNewContractTermsCondition;
