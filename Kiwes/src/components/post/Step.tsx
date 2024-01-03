import {StyleSheet, View, Text} from 'react-native';
import {width} from '../../global';

export default function Step({name, title, children}: any) {
  return (
    <View>
      <Text style={styles.stepTitle}>{title}</Text>
      <br />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 25,
    fontWeight: '800',
  },
});
