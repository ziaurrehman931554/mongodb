import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState<any>('');
  const [value, setValue] = useState<any>('');
  const [id, setId] = useState('');
  const [fetchData, setFetchData] = useState<any>(null);

  const handleSaveData = () => {
    axios
      .post('http://localhost:5000/data', {name, value})
      .then(response => {
        console.log('Data saved:', response.data);
        setName('');
        setValue('');
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };

  const handleFetchData = () => {
    axios
      .get(`http://localhost:5000/data/${id}`)
      .then(response => {
        console.log('Data fetched:', response.data);
        setFetchData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetchData(null);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Value"
          value={value}
          onChangeText={text => setValue(text)}
        />
        <Button title="Save Data" onPress={handleSaveData} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ID to Fetch Data"
          value={id}
          onChangeText={text => setId(text)}
        />
        <Button title="Fetch Data" onPress={handleFetchData} />
      </View>

      {fetchData && (
        <View style={styles.dataContainer}>
          <Text>Name: {fetchData.name}</Text>
          <Text>Value: {fetchData.value}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '80%',
  },
  dataContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
});

export default App;
