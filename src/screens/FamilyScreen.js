import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FamilyScreen = ({ navigation }) => {
  const [hasChildren, setHasChildren] = useState('');
  const [familyPlans, setFamilyPlans] = useState('');

  const childrenOptions = [
    { value: 'no', label: "Don't have Children" },
    { value: 'yes', label: 'Have Children' },
    { value: 'prefer-not-say', label: 'Prefer not to say' },
  ];

  const familyPlansOptions = [
    { value: 'no', label: "Don't want children" },
    { value: 'yes', label: 'Want Children' },
    { value: 'open', label: 'Open to Children' },
    { value: 'not-sure', label: 'Not Sure' },
    { value: 'prefer-not-say', label: 'Prefer not to say' },
  ];

  const handleNext = () => {
    navigation.navigate('Education');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate('Education');
  };

  const renderOption = (option, selectedValue, onSelect) => (
    <TouchableOpacity
      key={option.value}
      style={[
        styles.optionButton,
        selectedValue === option.value && styles.selectedOption
      ]}
      onPress={() => onSelect(option.value)}
    >
      <Text style={[
        styles.optionText,
        selectedValue === option.value && styles.selectedOptionText
      ]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${28.6}%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Family</Text>

        <View style={styles.formContainer}>
          {/* Children Section */}
          <Text style={styles.sectionTitle}>Do you have Children?</Text>
          
          <View style={styles.optionsContainer}>
            {childrenOptions.map(option => 
              renderOption(option, hasChildren, setHasChildren)
            )}
          </View>

          {/* Family Plans Section */}
          <Text style={styles.sectionTitle}>What are family plans?</Text>
          
          <View style={styles.optionsContainer}>
            {familyPlansOptions.map(option => 
              renderOption(option, familyPlans, setFamilyPlans)
            )}
          </View>

          <Text style={styles.disclaimer}>
            This detail will appear on your public profile.
          </Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 0,
    backgroundColor: '#F5F5F5',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 20,
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
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
    marginTop: 20,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    backgroundColor: '#E8F2FF',
    borderColor: '#1B5EBD',
  },
  optionText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#1B5EBD',
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'left',
    marginTop: 20,
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 40,
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

export default FamilyScreen;