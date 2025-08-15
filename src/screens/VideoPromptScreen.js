import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VideoPromptScreen = ({ navigation }) => {
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const availablePrompts = [
    "The way to win me over is...",
    "My most controversial opinion is...",
    "Two truths and a lie...",
    "The most spontaneous thing I've done...",
    "A random fact I love is...",
    "My most useless skill is...",
    "Two truths and a lie...",
    "The most spontaneous thing I've done...",
    "A random fact I love is..."
  ];

  const handleNext = useCallback(() => {
    console.log('Video prompt complete, proceeding to prompt poll');
    navigation.navigate('PromptPoll');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate('PromptPoll');
  }, [navigation]);

  const handleSelectPrompt = useCallback(() => {
    setShowPromptsModal(true);
  }, []);

  const handlePromptSelected = useCallback((prompt) => {
    setSelectedPrompt(prompt);
    setShowPromptsModal(false);
  }, []);

  const handleStartRecording = useCallback(() => {
    if (selectedPrompt) {
      setIsRecording(true);
      console.log('Starting video recording for:', selectedPrompt);
    }
  }, [selectedPrompt]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `99%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Video prompt</Text>

        <View style={styles.mainContainer}>
          {/* Video Prompt Card */}
          {selectedPrompt ? (
            <TouchableOpacity 
              style={styles.selectedPromptCard}
              onPress={handleStartRecording}
            >
              <Text style={styles.selectedPromptText}>{selectedPrompt}</Text>
              <Text style={styles.recordingPromptText}>Tap to start recording</Text>
              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>Recording...</Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.videoPromptCard}
              onPress={handleSelectPrompt}
            >
              <View style={styles.promptContent}>
                <Text style={styles.promptTitle}>Select a Prompt</Text>
                <Text style={styles.promptSubtitle}>And record a video of your answer</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={handleSelectPrompt}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
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

      {/* Video Prompts Selection Modal */}
      <Modal
        visible={showPromptsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPromptsModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Prompts</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowPromptsModal(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalSectionTitle}>Personality & Fun</Text>
            
            {availablePrompts.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.promptOption}
                onPress={() => handlePromptSelected(prompt)}
              >
                <View style={styles.promptOptionContent}>
                  <View style={styles.videoIcon}>
                    <Ionicons name="videocam" size={16} color="#666666" />
                  </View>
                  <Text style={styles.promptOptionText}>
                    {prompt}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    justifyContent: 'center',
    paddingVertical: 40,
  },
  videoPromptCard: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 60,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  promptContent: {
    alignItems: 'center',
  },
  promptTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
    textAlign: 'center',
  },
  promptSubtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPromptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedPromptText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  recordingPromptText: {
    fontSize: 18,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 20,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4444',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    color: '#FF4444',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  promptOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  promptOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  promptOptionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
});

export default VideoPromptScreen;