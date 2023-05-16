import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AddContractTermTitleCard from '../../components/AddContractTermTitleCard/AddContractTermTitleCard';
import AddContractTermsCard from '../../components/AddContractTermsCard/AddContractTermsCard';
import {useGetTermsListMutation} from '../../features/contract/contract';
import {ContractTermList} from '../../features/contract/contractTypes';

type Props = {};

const AddNewContractTermsCondition = (props: Props) => {
  const [termTitles, setTermTitles] = useState<ContractTermList>([]);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const allTerms = async () => {
    setLoading(true);
    try {
      await getTermsList({})
        .unwrap()
        .then(res => {
          setTermTitles(res.data);
        });
    } catch (err) {
      console.log(err, '>>>>>>Error');
    }
    setLoading(false);
  };

  const handleId = (v: number) => {
    setId(v);
  };

  const handleValue = (val: string) => {
    setTitleValue(val);
  };

  useEffect(() => {
    allTerms();
  }, [showTitleModal, success]);

  if (loading) {
    return (
      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </SafeAreaView>
    );
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
          {termTitles.map((item, index) => (
            <AddContractTermsCard
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
            />
          ))}

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
                navigation.navigate('AddContract-4');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  height: 24,
                  fontFamily: 'Poppins-Medium',
                  marginRight: 5,
                  color: '#fff',
                }}>
                Next
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
