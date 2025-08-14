import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  disabled = false,
  icon = null
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'social' && styles.socialButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'social' && styles.socialText,
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={textStyles}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: '#1B5EBD',
  },
  secondaryButton: {
    backgroundColor: '#333333',
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  socialText: {
    color: '#333333',
  },
  disabledText: {
    color: '#999999',
  },
});

export default CustomButton;