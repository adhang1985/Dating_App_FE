import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState(['Music', 'Photography']);

  const interestOptions = [
    { value: 'Music', label: 'Music', icon: 'musical-notes' },
    { value: 'Games', label: 'Games', icon: 'game-controller' },
    { value: 'Books', label: 'Books', icon: 'book' },
    { value: 'Photography', label: 'Photography', icon: 'camera' },
    { value: 'Travel', label: 'Travel', icon: 'airplane' },
    { value: 'Sports', label: 'Sports', icon: 'basketball' },
    { value: 'Cooking', label: 'Cooking', icon: 'restaurant' },
    { value: 'Art', label: 'Art', icon: 'brush' },
    { value: 'Movies', label: 'Movies', icon: 'film' },
  ];

  const handleNext = () => {
    navigation.navigate('Pronouns');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate('Pronouns');
  };

  const toggleInterest = useCallback((interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  }, []);

  const renderInterest = (interest) => {
    const isSelected = selectedInterests.includes(interest.value);
    return (
      <TouchableOpacity
        key={interest.value}
        style={[
          styles.interestButton,
          isSelected && styles.selectedInterest
        ]}
        onPress={() => toggleInterest(interest.value)}
      >
        <Ionicons 
          name={interest.icon} 
          size={20} 
          color={isSelected ? '#FFFFFF' : '#666666'} 
          style={styles.interestIcon}
        />
        <Text style={[
          styles.interestText,
          isSelected && styles.selectedInterestText
        ]}>
          {interest.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `45%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select Interests/Hobbies</Text>
        <Text style={styles.subtitle}>Add hobbies to match with similar people.</Text>

        <View style={styles.formContainer}>
          <View style={styles.interestsGrid}>
            {interestOptions.map((interest) => renderInterest(interest))}
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
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  interestButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '30%',
    maxWidth: '48%',
  },
  selectedInterest: {
    backgroundColor: '#1B5EBD',
    borderColor: '#1B5EBD',
  },
  interestIcon: {
    marginRight: 8,
  },
  interestText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    flex: 1,
  },
  selectedInterestText: {
    color: '#FFFFFF',
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

export default InterestsScreen;