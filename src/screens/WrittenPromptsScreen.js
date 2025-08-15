import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WrittenPromptsScreen = ({ navigation }) => {
  const [selectedPrompts, setSelectedPrompts] = useState([
    {
      id: 1,
      prompt: "The way to win me over is...",
      answer: "Bring me coffee in the morning and ask about my day. Simple but effective.",
      isCompleted: true
    }
  ]);
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const availablePrompts = [
    "The way to win me over is...",
    "My most controversial opinion is...",
    "Two truths and a lie...",
    "The most spontaneous thing I've done...",
    "A random fact I love is...",
    "My most useless skill is...",
    "I never leave home without...",
    "A shower thought I had recently..."
  ];

  const handleNext = useCallback(() => {
    console.log('Written prompts complete, proceeding to voice prompt');
    navigation.navigate('VoicePrompt');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate('VoicePrompt');
  }, [navigation]);

  const handleSelectPrompt = useCallback(() => {
    setShowPromptsModal(true);
  }, []);

  const handlePromptSelected = useCallback((prompt) => {
    const newPrompt = {
      id: Date.now(),
      prompt: prompt,
      answer: '',
      isCompleted: false
    };
    setSelectedPrompts(prev => [...prev, newPrompt]);
    setEditingPromptId(newPrompt.id);
    setCurrentAnswer('');
    setShowPromptsModal(false);
  }, []);

  const handleAnswerChange = useCallback((text) => {
    setCurrentAnswer(text);
  }, []);

  const handleSaveAnswer = useCallback(() => {
    if (editingPromptId && currentAnswer.trim()) {
      setSelectedPrompts(prev => 
        prev.map(p => 
          p.id === editingPromptId 
            ? { ...p, answer: currentAnswer, isCompleted: true }
            : p
        )
      );
      setEditingPromptId(null);
      setCurrentAnswer('');
    }
  }, [editingPromptId, currentAnswer]);

  const handleEditPrompt = useCallback((promptId) => {
    const prompt = selectedPrompts.find(p => p.id === promptId);
    if (prompt) {
      setEditingPromptId(promptId);
      setCurrentAnswer(prompt.answer);
    }
  }, [selectedPrompts]);

  const renderPromptCard = (prompt, index) => {
    const isEditing = editingPromptId === prompt.id;
    const isEmpty = !prompt.isCompleted && !isEditing;

    if (isEmpty) {
      return (
        <TouchableOpacity 
          key={prompt.id}
          style={styles.emptyPromptCard}
          onPress={() => handleEditPrompt(prompt.id)}
        >
          <View style={styles.emptyPromptContent}>
            <Text style={styles.emptyPromptTitle}>Select a Prompt</Text>
            <Text style={styles.emptyPromptSubtitle}>And write your own answer</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    if (isEditing) {
      return (
        <View key={prompt.id} style={styles.editingPromptCard}>
          <Text style={styles.promptTitle}>{prompt.prompt}</Text>
          <TextInput
            style={styles.answerInput}
            placeholder="Write your answer..."
            placeholderTextColor="#999999"
            value={currentAnswer}
            onChangeText={handleAnswerChange}
            multiline
            maxLength={200}
          />
          <View style={styles.editingActions}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveAnswer}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity 
        key={prompt.id}
        style={styles.filledPromptCard}
        onPress={() => handleEditPrompt(prompt.id)}
      >
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark" size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.promptTitle}>{prompt.prompt}</Text>
        <Text style={styles.promptAnswer}>{prompt.answer}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptySlots = () => {
    const emptySlots = [];
    const currentCount = selectedPrompts.length;
    
    for (let i = currentCount; i < 5; i++) {
      emptySlots.push(
        <TouchableOpacity 
          key={`empty-${i}`}
          style={styles.emptyPromptCard}
          onPress={handleSelectPrompt}
        >
          <View style={styles.emptyPromptContent}>
            <Text style={styles.emptyPromptTitle}>Select a Prompt</Text>
            <Text style={styles.emptyPromptSubtitle}>And write your own answer</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
    
    return emptySlots;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `97%` }]} />
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Written Prompts</Text>

        <View style={styles.selectPromptContainer}>
          <TouchableOpacity style={styles.selectPromptButton} onPress={handleSelectPrompt}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.selectPromptText}>Select a Prompt</Text>
          </TouchableOpacity>
          <Text style={styles.promptCount}>3 to 5</Text>
        </View>

        <View style={styles.promptsContainer}>
          {selectedPrompts.map((prompt, index) => renderPromptCard(prompt, index))}
          {selectedPrompts.length < 5 && renderEmptySlots()}
        </View>

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

      {/* Prompts Selection Modal */}
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
            
            {availablePrompts.map((prompt, index) => {
              const isSelected = selectedPrompts.some(p => p.prompt === prompt);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.promptOption}
                  onPress={() => !isSelected && handlePromptSelected(prompt)}
                  disabled={isSelected}
                >
                  <View style={styles.promptOptionContent}>
                    <View style={[
                      styles.bulletPoint, 
                      isSelected && styles.selectedBullet
                    ]} />
                    <Text style={[
                      styles.promptOptionText,
                      isSelected && styles.selectedPromptText
                    ]}>
                      {prompt}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.savedIndicator}>
                      <Ionicons name="checkmark" size={16} color="#1B5EBD" />
                      <Text style={styles.savedText}>Save</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: 30,
  },
  selectPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  selectPromptButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  selectPromptText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  promptCount: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  promptsContainer: {
    marginBottom: 30,
  },
  filledPromptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B5EBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
    marginRight: 40,
  },
  promptAnswer: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  emptyPromptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyPromptContent: {
    flex: 1,
  },
  emptyPromptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 4,
  },
  emptyPromptSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editingPromptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  editingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginRight: 15,
  },
  selectedBullet: {
    backgroundColor: '#1B5EBD',
  },
  promptOptionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  selectedPromptText: {
    color: '#1B5EBD',
    fontWeight: '500',
  },
  savedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 23,
  },
  savedText: {
    fontSize: 14,
    color: '#1B5EBD',
    marginLeft: 5,
  },
});

export default WrittenPromptsScreen;