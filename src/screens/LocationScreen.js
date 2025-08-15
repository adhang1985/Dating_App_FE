import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';

const LocationScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');

  const handleNext = () => {
    navigation.navigate('Profession');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `20%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Location</Text>
        <Text style={styles.subtitle}>Turn on location to find nearby matches.</Text>

        <View style={styles.formContainer}>
          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              {/* Location Pin */}
              <View style={styles.locationPin}>
                <Ionicons name="location" size={24} color="#1B5EBD" />
              </View>
              
              {/* Mock Map Content */}
              <View style={styles.mapContent}>
                <Text style={styles.mapText}>CHUWAIPIMPARA</Text>
                <Text style={styles.mapText}>VAISHALI NAGAR</Text>
                <Text style={styles.mapText}>MOTI NAGAR</Text>
                <Text style={styles.mapText}>SANJAY NAGAR</Text>
                <View style={styles.restaurantMarker}>
                  <Text style={styles.restaurantText}>🍽️ Kanha Restaurant</Text>
                </View>
                <Text style={styles.mapText}>Madhav Path</Text>
                <Text style={styles.mapText}>Queens Rd</Text>
              </View>
              
              {/* Current Location Button */}
              <TouchableOpacity style={styles.currentLocationBtn}>
                <Ionicons name="locate" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <CustomInput
            placeholder="Enter your address, area or postcode"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

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
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F2FF',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPin: {
    position: 'absolute',
    top: '45%',
    left: '30%',
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  mapText: {
    fontSize: 10,
    color: '#666666',
    position: 'absolute',
  },
  restaurantMarker: {
    position: 'absolute',
    top: 60,
    right: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  restaurantText: {
    fontSize: 10,
    color: '#333',
  },
  currentLocationBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginVertical: 8,
  },
  disclaimer: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'left',
    marginTop: 30,
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

export default LocationScreen;