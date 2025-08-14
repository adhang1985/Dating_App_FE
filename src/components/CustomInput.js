import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ 
  placeholder, 
  value, 
  onChangeText, 
  style, 
  secureTextEntry = false,
  keyboardType = 'default',
  ...props 
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#999999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
  },
});

export default CustomInput;