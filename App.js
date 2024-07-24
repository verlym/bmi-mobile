import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { calculateBMI, getBMIRecords } from './src/api/bmiApi';
import BMIRecordItem from './src/components/BMIRecordItem';

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [latestBMI, setLatestBMI] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const data = await getBMIRecords();
      setRecords(data || []); // Ensure it's always an array
      if (data && data.length > 0) {
        setLatestBMI(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch BMI records:', error);
      Alert.alert('Error', 'Failed to fetch BMI records');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = async () => {
    if (!height || !weight) {
      Alert.alert('Error', 'Please enter both height and weight');
      return;
    }

    try {
      const result = await calculateBMI(parseFloat(height), parseFloat(weight));
      if (result && result.id) { // Check if result is valid
        setLatestBMI(result);
        setRecords([result, ...records]);
        setHeight('');
        setWeight('');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Failed to calculate BMI:', error);
      Alert.alert('Error', 'Failed to calculate BMI');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Button title="Calculate BMI" onPress={handleCalculate} />
      </View>

      {latestBMI && (
        <View style={styles.latestResult}>
          <Text style={styles.latestBMITitle}>Latest BMI Result:</Text>
          <Text>BMI: {latestBMI.bmi}</Text>
          <Text>Category: {latestBMI.category}</Text>
          <Text>Date: {new Date(latestBMI.createdAt).toLocaleDateString()}</Text>
        </View>
      )}

      <Text style={styles.historyTitle}>BMI History</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={records}
          renderItem={({ item }) => item && item.id ? <BMIRecordItem record={item} /> : null}
          keyExtractor={(item) => item && item.id ? item.id.toString() : Math.random().toString()}
          ListEmptyComponent={<Text>No BMI records found.</Text>}
        />
      )}
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  latestResult: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  latestBMITitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});