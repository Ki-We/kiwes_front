import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';

export default function SetupLayout({title, children, onNext}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView style={styles.middleContainer}>{children}</ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Your Button" onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
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
    marginBottom: 10,
    backgroundColor: 'lightgreen',
  },
  buttonContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcoral',
  },
});
