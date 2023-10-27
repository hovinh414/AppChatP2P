import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS, FONT, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  header: {},
  headerText: {
    fontFamily: FONT.bold,
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
