import {StyleSheet} from 'react-native';
import NothingShow from './NothingShow';
import {height} from '../global';

export default function NothingDefault({text}: {text: string}) {
  return <NothingShow title={text} styleKiwe={styleKiwe} />;
}
const styleKiwe = StyleSheet.create({
  text: {
    fontSize: height * 20,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    margin: 10,
  },
});
