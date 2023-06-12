import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../../config';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {RootState} from '../../store';

type Props = {};

const ContractPDFView = (props: Props) => {
  const navigation = useNavigation();

  var [loading, setLoading] = useState(true);

  const hideLoader = () => setLoading(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const auth = useSelector<RootState>(state => state.auth);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 25,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(69, 72, 95, 0.24)',
                padding: 4,
                borderRadius: 99999,
                marginRight: 30,
              }}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}>
              <View
                style={{
                  backgroundColor: '#45485F',
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faChevronLeft} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#45485F',
                fontFamily: 'Poppins-Medium',
                fontSize: 24,
                height: 36,
              }}>
              Pdf
            </Text>
          </View>
        </View>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: `${BASE_URL}contract-preview/${props.route.params?.id}`,
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            cache: false,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            hideLoader();
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
        {loading && <LoadingModal />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ContractPDFView;
