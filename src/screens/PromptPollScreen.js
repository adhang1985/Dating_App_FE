import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PromptPollScreen = ({ navigation }) => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '', maxLength: 90 },
    { id: 2, text: '', maxLength: 90 },
    { id: 3, text: '', maxLength: 90 }
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleNext = useCallback(() => {
    console.log('Profile setup complete! Proceeding to discovery');
    navigation.navigate('Discovery');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSkip = useCallback(() => {
    console.log('Profile setup complete! Proceeding to discovery');
    navigation.navigate('Discovery');
  }, [navigation]);

  const handleSelectPrompt = useCallback(() => {
    setSelectedPrompt('Who would you rather go on a date with?');
    setIsEditing(true);
  }, []);

  const handleOptionChange = useCallback((optionId, text) => {
    setOptions(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { ...option, text: text.substring(0, option.maxLength) }
          : option
      )
    );
  }, []);

  const handleSave = useCallback(() => {
    const filledOptions = options.filter(option => option.text.trim() !== '');
    if (filledOptions.length >= 3) {
      console.log('Poll saved:', { prompt: selectedPrompt, options: filledOptions });
      setIsEditing(false);
    }
  }, [selectedPrompt, options]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setSelectedPrompt('');
    setOptions([
      { id: 1, text: '', maxLength: 90 },
      { id: 2, text: '', maxLength: 90 },
      { id: 3, text: '', maxLength: 90 }
    ]);
  }, []);

  const canSave = options.filter(option => option.text.trim() !== '').length >= 3;

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `100%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Prompt Poll</Text>
          <Text style={styles.subtitle}>(3 answers required)</Text>
        </View>

        {/* Select Prompt Button */}
        {!selectedPrompt && (
          <TouchableOpacity style={styles.selectPromptButton} onPress={handleSelectPrompt}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.selectPromptText}>Select a Prompt</Text>
          </TouchableOpacity>
        )}

        {/* Selected Prompt Display */}
        {selectedPrompt && (
          <View style={styles.selectedPromptContainer}>
            <Text style={styles.selectedPromptText}>{selectedPrompt}</Text>
          </View>
        )}

        {/* Poll Options */}
        {isEditing && (
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <View key={option.id} style={styles.optionCard}>
                <TextInput
                  style={styles.optionInput}
                  placeholder={`Option ${index + 1}`}
                  placeholderTextColor="#CCCCCC"
                  value={option.text}
                  onChangeText={(text) => handleOptionChange(option.id, text)}
                  multiline
                  maxLength={option.maxLength}
                />
                <Text style={styles.characterCount}>
                  {option.maxLength - option.text.length}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!canSave}
            >
              <Text style={[styles.saveButtonText, !canSave && styles.saveButtonTextDisabled]}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.disclaimer}>
          This detail will appear on your public profile.
        </Text>
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
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '500',
  },
  selectPromptButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  selectPromptText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedPromptContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedPromptText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 80,
  },
  optionInput: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    color: '#333333',
    textAlignVertical: 'top',
  },
  characterCount: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    fontSize: 14,
    color: '#999999',
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#999999',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 20,
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

export default PromptPollScreen;