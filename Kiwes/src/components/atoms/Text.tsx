import {RootState} from '@/slice/RootReducer';
import {LANGUAGE, translateText} from '@/utils/utils';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function DefaultFontStack({
  style,
  children,
  numberOfLines,
}: any) {
  const language = useSelector((state: RootState) => state.language);

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

  const checkLanguage = (text: string) => {
    if (text === undefined || typeof text != 'string') return text;
    text = text?.replace(/\.\s*$/, '');

    if (language.language === LANGUAGE.EN) {
      return translateText[text] || text;
    }
    return text;
  };
  const textComponent = (
    <Text style={[fontSize, style]}>{checkLanguage(children)}</Text>
  );

  return numberOfLines !== undefined ? (
    <Text style={[fontSize, style]} numberOfLines={numberOfLines}>
      {textComponent}
    </Text>
  ) : (
    textComponent
  );
}

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'Pretendard-Medium',
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
  },
  bold: {
    fontFamily: 'Pretendard-Bold',
  },
});
