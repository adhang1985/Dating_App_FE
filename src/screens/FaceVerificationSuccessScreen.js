import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { BlurView } from 'expo-blur';

const FaceVerificationSuccessScreen = ({ navigation }) => {
  const handleContinue = () => {
    console.log('Face verification completed, proceeding to profile setup');
    // Navigate to profile setup after face verification
    navigation.navigate('ProfileSetup');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    handleContinue();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Blurred Background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=800&fit=crop&crop=face' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Blur overlay */}
      <BlurView intensity={50} style={styles.blurOverlay} />

      {/* Success Modal */}
      <View style={styles.modalContainer}>
        <View style={styles.successModal}>
          <Text style={styles.modalTitle}>Profile Photo Verified!</Text>
          
          {/* Verified Photo */}
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' }}
              style={styles.verifiedPhoto}
              resizeMode="cover"
            />
            {/* Checkmark Badge */}
            <View style={styles.checkmarkBadge}>
              <Ionicons name="thumbs-up" size={20} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.successMessage}>
            Your profile photo is successfully verified and approved.
          </Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Continue"
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>

      {/* Navigation Arrows */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#666666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  blurOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  successModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    width: '100%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 25,
  },
  verifiedPhoto: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  checkmarkBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default FaceVerificationSuccessScreen;