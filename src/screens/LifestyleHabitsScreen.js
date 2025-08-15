import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

const LifestyleHabitsScreen = ({ navigation }) => {
  const [smokingAnswer, setSmokingAnswer] = useState('');
  const [drinkingAnswer, setDrinkingAnswer] = useState('');
  const [weedAnswer, setWeedAnswer] = useState('');

  const smokingOptions = [
    { value: 'yes-regularly', label: 'Yes, regularly' },
    { value: 'occasionally', label: 'Occasionally / Socially' },
    { value: 'no-used-to', label: 'No, but I used to' },
    { value: 'no-never', label: 'No, never' },
    { value: 'prefer-not-say', label: 'Prefer not to say' },
  ];

  const drinkingOptions = [
    { value: 'yes-regularly', label: 'Yes, regularly' },
    { value: 'occasionally', label: 'Occasionally / Socially' },
    { value: 'no-used-to', label: 'No, but I used to' },
    { value: 'no-never', label: 'No, never' },
    { value: 'prefer-not-say', label: 'Prefer not to say' },
  ];

  const weedOptions = [
    { value: 'yes-regularly', label: 'Yes, regularly' },
    { value: 'occasionally', label: 'Occasionally / Socially' },
    { value: 'no-used-to', label: 'No, but I used to' },
    { value: 'no-never', label: 'No, never' },
    { value: 'prefer-not-say', label: 'Prefer not to say' },
  ];

  const handleNext = () => {
    navigation.navigate('IdealRelationship');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate('IdealRelationship');
  };

  const renderQuestionOptions = (question, options, selectedValue, setValue) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionContainer,
              selectedValue === option.value && styles.selectedOption
            ]}
            onPress={() => setValue(option.value)}
          >
            <Text style={[
              styles.optionText,
              selectedValue === option.value && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
            <View style={[
              styles.radioButton,
              selectedValue === option.value && styles.selectedRadio
            ]}>
              {selectedValue === option.value && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `95%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Lifestyle habits</Text>

        {renderQuestionOptions('Do you smoke tobacco?', smokingOptions, smokingAnswer, setSmokingAnswer)}
        
        {renderQuestionOptions('Do you drink alcohol?', drinkingOptions, drinkingAnswer, setDrinkingAnswer)}
        
        {renderQuestionOptions('Do you smoke weed?', weedOptions, weedAnswer, setWeedAnswer)}
      </ScrollView>

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, styles.nextButton]} 
          onPress={handleNext}
        >
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  progressContainer: {
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 0,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 15,
  },
  progress: {
    height: '100%',
    backgroundColor: '#1B5EBD',
    borderRadius: 3,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: 30,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedOption: {
    backgroundColor: '#F0F7FF',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#333333',
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#1B5EBD',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1B5EBD',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    paddingBottom: 30,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButton: {
    // Additional styling for next button if needed
  },
});

export default LifestyleHabitsScreen;