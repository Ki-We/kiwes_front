import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {height} from '../../global';

export default function SetupLayout({title, children, onNext}: any) {
  return (
    // <View style={styles1.container}>
    //   <View style={styles1.case1} />
    //   <View style={styles1.case2} />
    // </View>
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView style={styles.middleContainer}>
        <Text>asdf</Text>
        {children}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Your Button" onPress={onNext} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  middleContainer: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  buttonContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcoral',
  },
});
const styles1 = StyleSheet.create({
  container: {
    height: height * 675,
    backgroundColor: 'white',
  },
  case1: {
    width: 100,
    backgroundColor: 'red',
  },
  case2: {
    width: 100,
    backgroundColor: 'green',
  },
});