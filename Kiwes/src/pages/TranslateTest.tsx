import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const TranslateTest = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('ko');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const doTranslate = () => {
    if (!inputText) {
      alert('Input text cannot be empty.');
      return;
    }

    const params = {
      Text: inputText,
      SourceLanguageCode: sourceLanguage,
      TargetLanguageCode: targetLanguage,
    };

    translate.translateText(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        alert('Error calling Amazon Translate. ' + err.message);
      } else {
        setOutputText(data.TranslatedText);
      }
    });
  };

  const clearInputs = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <View>
      <Text style={{textAlign: 'left'}}>Amazon Translate Demo</Text>
      <TextInput
        placeholder="Source Language Code"
        onChangeText={text => setSourceLanguage(text)}
        value={sourceLanguage}
      />
      <TextInput
        placeholder="Target Language Code"
        onChangeText={text => setTargetLanguage(text)}
        value={targetLanguage}
      />
      <TextInput
        style={{height: 200, borderColor: 'gray', borderWidth: 1}}
        placeholder="Text to translate..."
        onChangeText={setInputText}
        value={inputText}
        multiline={true}
      />
      <TextInput
        style={{height: 200, borderColor: 'gray', borderWidth: 1}}
        placeholder="Translated text..."
        value={outputText}
        multiline={true}
      />
      <View style={{flexDirection: 'row'}}>
        <Button title="Translate" onPress={doTranslate} />
        <Button title="Clear" onPress={clearInputs} />
      </View>
    </View>
  );
};

export default TranslateTest;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
