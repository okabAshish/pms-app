import {Dimensions, StyleSheet} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    backgroundColor: '#E8F9FF',
    marginTop: -50,
    minHeight: 400,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_container: {
    flex: 1,
  },
  img_conatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sign_up_image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  changeSubContainer: {
    backgroundColor: 'rgba(90, 207, 246, 1)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: -100,
    width: 200,
    borderRadius: 6,
    margin: 0,
    flexDirection: 'row',
    height: 50,

    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  changeButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 0,
  },
  changeButtonText: {
    fontWeight: 600,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  containerTitle: {
    backgroundColor: '#efefef',
    width: DEVICE_WIDTH - 80,
    minHeight: 100,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 3,
    shadowColor: 'rgba(0,0,0,0.65)',
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.01)',
  },
  containerTitleText: {
    fontSize: 24,
    color: '#45485F',
    height: 36,
    fontFamily: 'Poppins-Medium',
  },
  container: {
    marginTop: -30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt_10: {
    marginTop: 10,
  },
});
