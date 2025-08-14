import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

const FaceVerificationScreen = ({ navigation }) => {
  const handleFaceVerification = () => {
    console.log('Starting face verification');
    navigation.navigate('FaceVerificationProgress');
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Verification?',
      'You can verify your profile later in settings to increase trust and visibility.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: () => navigation.navigate('Welcome') } // For now, go back to welcome
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('FaceVerificationProgress');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={styles.progressBar} />
        </View>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Verify Your Face Live</Text>
        <Text style={styles.subtitle}>For a safer, more authentic dating experience</Text>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.benefitText}>Confirm you're a real person</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.benefitText}>Increase trust and visibility with matches</Text>
          </View>
        </View>

        {/* How it Works */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How it Works?</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.stepText}>Follow the on-screen pose or expression (e.g., blink, smile).</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.stepText}>We'll compare it with your profile photos using secure AI.</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.stepText}>Get verified in seconds — no retakes needed unless there's an error.</Text>
            </View>
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
          <Text style={styles.privacyText}>
            Your video is never shared and is only used for one-time verification.
          </Text>
        </View>

        {/* Face Verification Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Face Verification"
            onPress={handleFaceVerification}
            icon={<Ionicons name="camera" size={20} color="#FFFFFF" />}
          />
        </View>
      </ScrollView>

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
    backgroundColor: '#F8F9FA',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 0,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 15,
  },
  progressBar: {
    width: '90%', // Almost complete
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  skipButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    color: '#333333',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 22,
  },
  benefitsContainer: {
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  stepsList: {
    paddingLeft: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333333',
    marginRight: 10,
    marginTop: 2,
  },
  stepText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    lineHeight: 22,
  },
  privacyText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default FaceVerificationScreen;