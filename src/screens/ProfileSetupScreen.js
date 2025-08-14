import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';

const { width } = Dimensions.get('window');

const ProfileSetupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');

  const handleDateChange = (text) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');
    
    // Add formatting
    if (cleaned.length <= 2) {
      setBirthDate(cleaned);
    } else if (cleaned.length <= 4) {
      setBirthDate(cleaned.slice(0, 2) + '/' + cleaned.slice(2));
    } else if (cleaned.length <= 8) {
      setBirthDate(cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4));
    }
  };

  const handleNext = () => {
    // Navigate to Family screen
    navigation.navigate('Family');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${14.3}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.formContainer}>
          {/* Name Section */}
          <Text style={styles.sectionTitle}>Name you go by</Text>
          
          <CustomInput
            placeholder="First Name (Required)"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          
          <CustomInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          {/* Date of Birth Section */}
          <Text style={styles.sectionTitle}>When were you born?</Text>
          
          <CustomInput
            placeholder="DD / MM / YYYY"
            value={birthDate}
            onChangeText={handleDateChange}
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
          />

          {/* Height Section */}
          <Text style={styles.sectionTitle}>How tall are you?</Text>
          
          <View style={styles.heightContainer}>
            <CustomInput
              placeholder="5 ft"
              value={height}
              onChangeText={setHeight}
              style={[styles.input, styles.heightInput]}
            />
            <CustomInput
              placeholder="6 Inch"
              style={[styles.input, styles.heightInput]}
            />
          </View>
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
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 0,
    backgroundColor: '#F5F5F5',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progress: {
    height: '100%',
    backgroundColor: '#1B5EBD',
    borderRadius: 3,
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
  input: {
    marginVertical: 8,
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  heightInput: {
    flex: 1,
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

export default ProfileSetupScreen;