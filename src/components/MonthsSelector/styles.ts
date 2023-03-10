import {StyleSheet} from 'react-native';
import {value} from '../../helpers/scale';

const borderRadius = value(15);

const styles = StyleSheet.create({
  grayContainer: {
    padding: value(2),
    backgroundColor: 'rgb(244,246,251)',
    borderRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  monthsContainer: {
    marginTop: value(10),
    position: 'relative',
    padding: 0,
  },
  topButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: value(10),
    borderRadius,
  },
  topButtonActive: {
    backgroundColor: 'rgb(58,69,79)',
  },
  topBarText: {
    textAlign: 'center',
    fontSize: value(14),
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'black',
  },
  topBarTextActive: {
    color: 'white',
  },
  monthTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  monthText: {
    color: 'black',
    textAlign: 'center',
    fontSize: value(15),
  },
  monthActiveSelector: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    borderRadius,
  },
  monthActiveSelectorPan: {backgroundColor: 'transparent', zIndex: 2},
});

export default styles;
