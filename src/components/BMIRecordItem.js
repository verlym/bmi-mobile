import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BMIRecordItem = ({ record }) => {
  if (!record || !record.bmi) {
    return null; // Don't render anything if the record is invalid
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bmi}>BMI: {record.bmi}</Text>
      <Text>Height: {record.height} cm</Text>
      <Text>Weight: {record.weight} kg</Text>
      <Text>Category: {record.category}</Text>
      <Text>Date: {new Date(record.createdAt).toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bmi: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BMIRecordItem;