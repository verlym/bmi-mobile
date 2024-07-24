import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { calculateBMI } from '../api/bmiApi';

const CalculateBMIScreen = ({ navigation }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleCalculate = async () => {
    if (!height || !weight) {
      Alert.alert('Error', 'Please enter both height and weight');
      return;
    }

    try {
      const result = await calculateBMI(parseFloat(height), parseFloat(weight));
      Alert.alert('BMI Result', `Your BMI is ${result.bmi}\nCategory: ${result.category}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate BMI');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculate BMI</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CalculateBMIScreen;