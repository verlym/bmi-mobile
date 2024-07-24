import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { getBMIRecords } from '../api/bmiApi';
import BMIRecordItem from '../components/BMIRecordItem';

const BMIRecordsScreen = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await getBMIRecords();
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch BMI records:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Records</Text>
      <FlatList
        data={records}
        renderItem={({ item }) => <BMIRecordItem record={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default BMIRecordsScreen;