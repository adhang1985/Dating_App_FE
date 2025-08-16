import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FiltersScreen = ({ navigation }) => {
  const [location, setLocation] = useState('Jaipur');
  const [selectedGender, setSelectedGender] = useState('Female');
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [distance, setDistance] = useState(20);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleReset = useCallback(() => {
    setLocation('Jaipur');
    setSelectedGender('Female');
    setAgeRange([20, 40]);
    setDistance(20);
  }, []);

  const handleApplyFilter = useCallback(() => {
    const filters = {
      location,
      gender: selectedGender,
      ageRange,
      distance
    };
    console.log('Applying filters:', filters);
    navigation.goBack();
  }, [location, selectedGender, ageRange, distance, navigation]);

  const handleGenderSelect = useCallback((gender) => {
    setSelectedGender(gender);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Location</Text>
          <View style={styles.locationInput}>
            <TextInput
              style={styles.locationText}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
              placeholderTextColor="#999"
            />
            <Ionicons name="location" size={20} color="#999" />
          </View>
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Gender</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity 
              style={[styles.genderOption, selectedGender === 'Female' && styles.selectedGender]}
              onPress={() => handleGenderSelect('Female')}
            >
              <Text style={[styles.genderText, selectedGender === 'Female' && styles.selectedGenderText]}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.genderOption, selectedGender === 'Male' && styles.selectedGender]}
              onPress={() => handleGenderSelect('Male')}
            >
              <Text style={[styles.genderText, selectedGender === 'Male' && styles.selectedGenderText]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.genderOption, selectedGender === 'Others' && styles.selectedGender]}
              onPress={() => handleGenderSelect('Others')}
            >
              <Text style={[styles.genderText, selectedGender === 'Others' && styles.selectedGenderText]}>Others</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Age</Text>
          <Text style={styles.rangeText}>{ageRange[0]}-{ageRange[1]}</Text>
          <View style={styles.customSlider}>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: '50%', left: '20%' }]} />
              <TouchableOpacity style={[styles.sliderThumb, { left: '20%' }]} />
              <TouchableOpacity style={[styles.sliderThumb, { left: '70%' }]} />
            </View>
          </View>
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Distance</Text>
          <Text style={styles.rangeText}>{distance}km</Text>
          <View style={styles.customSlider}>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: '40%' }]} />
              <TouchableOpacity style={[styles.sliderThumb, { left: '40%' }]} />
            </View>
          </View>
        </View>
        
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5EBD',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#1B5EBD',
  },
  genderText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  selectedGenderText: {
    color: '#FFFFFF',
  },
  rangeText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  customSlider: {
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#1B5EBD',
    borderRadius: 2,
    position: 'absolute',
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#1B5EBD',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  bottomActions: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 15,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FiltersScreen;