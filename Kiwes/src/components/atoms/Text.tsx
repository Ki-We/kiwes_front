import {Text, StyleSheet} from 'react-native';

export default function defaultFontText({style, children}: any) {
  let fontSize = styles.medium;
  if (style && style.fontWeight) {
    if (style.fontWeight === '300') {
      fontSize = styles.light;
    } else if (style.fontWeight === '400') {
      fontSize = styles.regular;
    } else if (style.fontWeight === '600') {
      fontSize = styles.semibold;
    } else if (style.fontWeight === '700') {
      fontSize = styles.bold;
    }
  }
  return <Text style={[fontSize, style]}>{children}</Text>;
}
const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'ChosunCentennial_ttf',
  },
  light: {
    fontFamily: 'Pretendard-Light',
  },
  regular: {
    fontFamily: 'Pretendard-Regular',
  },
  medium: {
    fontFamily: 'Pretendard-Medium',
  },
  semibold: {
    fontFamily: 'Pretendard-SemiBold',
    // fontFamily: 'ChosunCentennial_ttf',
  },
  bold: {
    fontFamily: 'Pretendard-Bold',
  },
});
