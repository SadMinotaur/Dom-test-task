import {StyleSheet} from 'react-native';
import {value} from '../../helpers/scale';

const styles = StyleSheet.create({
  grayContainer: {
    padding: value(2),
    backgroundColor: 'rgb(244,246,251)',
    borderRadius: value(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthsContainer: {
    marginTop: value(10),
  },
  topButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: value(10),
    borderRadius: value(20),
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
  monthText: {
    color: 'black',
    textAlign: 'center',
    fontSize: value(15),
  },
  monthContainer: {
    flex: 1,
  },
  monthActive: {
    backgroundColor: 'white',
  },
});

export default styles;
