import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const App = () => {
  // In JS, we don't need to define the type in <>
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');

  const handleTap = (type, value) => {
    if (type === 'number') {
      setDisplayValue(displayValue === '0' ? String(value) : displayValue + value);
    }

    if (type === 'operator') {
      setOperator(value); // No "as Operator" needed here!
      setFirstValue(displayValue);
      setDisplayValue('0');
    }

    if (type === 'clear') {
      setDisplayValue('0');
      setFirstValue('');
      setOperator(null);
    }

    if (type === 'equal') {
      const current = parseFloat(displayValue);
      const previous = parseFloat(firstValue);

      if (operator === '+') setDisplayValue(String(previous + current));
      if (operator === '-') setDisplayValue(String(previous - current));
      if (operator === '*') setDisplayValue(String(previous * current));
      if (operator === '/') {
        setDisplayValue(current !== 0 ? String(previous / current) : 'Error');
      }

      setFirstValue('');
      setOperator(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <CalcButton title="C" color="#a5a5a5" onPress={() => handleTap('clear')} />
          <CalcButton title="+/-" color="#a5a5a5" onPress={() => {}} />
          <CalcButton title="%" color="#a5a5a5" onPress={() => {}} />
          <CalcButton title="÷" color="#f09a36" onPress={() => handleTap('operator', '/')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="7" onPress={() => handleTap('number', 7)} />
          <CalcButton title="8" onPress={() => handleTap('number', 8)} />
          <CalcButton title="9" onPress={() => handleTap('number', 9)} />
          <CalcButton title="×" color="#f09a36" onPress={() => handleTap('operator', '*')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="4" onPress={() => handleTap('number', 4)} />
          <CalcButton title="5" onPress={() => handleTap('number', 5)} />
          <CalcButton title="6" onPress={() => handleTap('number', 6)} />
          <CalcButton title="-" color="#f09a36" onPress={() => handleTap('operator', '-')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="1" onPress={() => handleTap('number', 1)} />
          <CalcButton title="2" onPress={() => handleTap('number', 2)} />
          <CalcButton title="3" onPress={() => handleTap('number', 3)} />
          <CalcButton title="+" color="#f09a36" onPress={() => handleTap('operator', '+')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="0" flex={2} onPress={() => handleTap('number', 0)} />
          <CalcButton title="." onPress={() => handleTap('number', '.')} />
          <CalcButton title="=" color="#f09a36" onPress={() => handleTap('equal')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Simple JS component - no complex interface definitions
const CalcButton = ({ title, onPress, color = '#333', flex = 1 }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: color, flex }]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'flex-end' },
  displayContainer: { padding: 20, justifyContent: 'flex-end', alignItems: 'flex-end' },
  displayText: { color: '#fff', fontSize: 80, fontWeight: '300' },
  buttonContainer: { paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10 },
  button: { height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  buttonText: { fontSize: 30, color: '#fff', fontWeight: '400' },
});

export default App;