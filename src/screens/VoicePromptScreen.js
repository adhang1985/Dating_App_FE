import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VoicePromptScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0.5); // 15/30 seconds

  const maxDuration = 30;
  const currentTime = Math.floor(audioProgress * maxDuration);

  const handleNext = useCallback(() => {
    console.log('Voice prompt complete, proceeding to video prompt');
    navigation.navigate('VideoPrompt');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate('VideoPrompt');
  }, [navigation]);

  const handleMicrophonePress = useCallback(() => {
    setIsRecording(!isRecording);
  }, [isRecording]);

  const handlePlaySample = useCallback(() => {
    console.log('Playing sample answer');
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `98%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Voice prompt</Text>

        <View style={styles.mainContainer}>
          {/* Audio Player Interface */}
          <View style={styles.audioPlayer}>
            <Text style={styles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(maxDuration)}
            </Text>
            
            <View style={styles.progressSlider}>
              <View style={[styles.progressSliderFill, { width: `${audioProgress * 100}%` }]} />
              <View style={[styles.progressThumb, { left: `${audioProgress * 100}%` }]} />
            </View>
          </View>

          <Text style={styles.recordingPrompt}>Tap to start recording</Text>

          {/* Microphone Button */}
          <TouchableOpacity 
            style={[styles.microphoneButton, isRecording && styles.microphoneButtonActive]}
            onPress={handleMicrophonePress}
          >
            <Ionicons 
              name="mic" 
              size={32} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>

          {/* Play Sample Button */}
          <TouchableOpacity style={styles.sampleButton} onPress={handlePlaySample}>
            <Ionicons name="play" size={16} color="#333333" />
            <Text style={styles.sampleButtonText}>Play a sample answer</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          This detail will appear on your public profile.
        </Text>
      </View>

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
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: 40,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioPlayer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 50,
    width: width - 50,
    alignItems: 'center',
    marginBottom: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minHeight: 200,
    justifyContent: 'center',
  },
  timeDisplay: {
    fontSize: 22,
    color: '#999999',
    marginBottom: 40,
    fontWeight: '500',
  },
  progressSlider: {
    width: '70%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'relative',
  },
  progressSliderFill: {
    height: '100%',
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginLeft: -8,
  },
  recordingPrompt: {
    fontSize: 18,
    color: '#999999',
    marginBottom: 40,
    textAlign: 'center',
  },
  microphoneButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1B5EBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  microphoneButtonActive: {
    backgroundColor: '#FF4444',
  },
  sampleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
  },
  sampleButtonText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 8,
    fontWeight: '500',
  },
  disclaimer: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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

export default VoicePromptScreen;