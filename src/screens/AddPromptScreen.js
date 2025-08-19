import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddPromptScreen = ({ navigation, route }) => {
  const { mainPhoto, photos = [] } = route.params || {};
  
  // State for multiple prompt groups
  const [promptGroups, setPromptGroups] = useState([
    {
      id: 1,
      selectedPrompt: '',
      location: '',
      caption: '',
      photo: mainPhoto,
      showDropdown: false
    },
    {
      id: 2,
      selectedPrompt: '',
      location: '',
      caption: '',
      photo: photos[0] || null,
      showDropdown: false
    },
    {
      id: 3,
      selectedPrompt: '',
      location: '',
      caption: '',
      photo: photos[1] || null,
      showDropdown: false
    }
  ]);

  // Mock prompts
  const prompts = [
    "Two truths and a lie",
    "My simple pleasures",
    "I'm looking for",
    "The way to win me over is",
    "I get along best with people who",
    "My biggest goal right now",
    "I want someone who",
    "Perfect first date",
    "Green flag I look for",
    "Red flag I avoid"
  ];

  // Helper functions for updating prompt groups
  const updatePromptGroup = (groupId, field, value) => {
    setPromptGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, [field]: value }
          : group
      )
    );
  };

  const handlePromptSelect = (groupId, prompt) => {
    updatePromptGroup(groupId, 'selectedPrompt', prompt);
    updatePromptGroup(groupId, 'showDropdown', false);
  };

  const toggleDropdown = (groupId) => {
    setPromptGroups(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        showDropdown: group.id === groupId ? !group.showDropdown : false
      }))
    );
  };

  const handleReplacePhoto = (groupId) => {
    // Navigate to PhotoUpload screen to replace photos
    // You can pass the groupId to identify which photo to replace
    navigation.navigate('PhotoUpload', { groupId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar - Fixed at top */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '40%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Add prompt</Text>
        <Text style={styles.subtitle}>
          Photos with prompt get more likes and spark more conversations.
        </Text>

        {/* Render multiple prompt groups */}
        {promptGroups.map((group, index) => (
          <View key={group.id} style={styles.promptGroupContainer}>
            {/* Prompt Selector */}
            <View style={styles.promptSelectorContainer}>
              <TouchableOpacity 
                style={styles.promptSelector}
                onPress={() => toggleDropdown(group.id)}
              >
                <Text style={[styles.promptText, !group.selectedPrompt && styles.placeholderText]}>
                  {group.selectedPrompt || 'Select a Prompt'}
                </Text>
                <Ionicons 
                  name={group.showDropdown ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#666666" 
                />
              </TouchableOpacity>
            </View>

            {/* Modal Dropdown for this group */}
            <Modal
              visible={group.showDropdown}
              transparent={true}
              animationType="fade"
              onRequestClose={() => updatePromptGroup(group.id, 'showDropdown', false)}
            >
              <TouchableOpacity 
                style={styles.modalBackdrop}
                activeOpacity={1}
                onPress={() => updatePromptGroup(group.id, 'showDropdown', false)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select a Prompt</Text>
                  <ScrollView 
                    style={styles.modalScrollView}
                    showsVerticalScrollIndicator={true}
                  >
                    {prompts.map((prompt, promptIndex) => (
                      <TouchableOpacity 
                        key={promptIndex}
                        style={[
                          styles.modalItem,
                          promptIndex === prompts.length - 1 && styles.lastModalItem
                        ]}
                        onPress={() => handlePromptSelect(group.id, prompt)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.modalItemText}>{prompt}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Photo with Grid Overlay */}
            <View style={styles.photoContainer}>
              {group.photo ? (
                <View style={styles.photoWrapper}>
                  <Image source={{ uri: group.photo }} style={styles.photo} />
                  <View style={styles.gridOverlay}>
                    {/* Grid lines */}
                    <View style={styles.gridLine} />
                    <View style={[styles.gridLine, styles.gridLineVertical]} />
                    <View style={[styles.gridLine, { top: '66.66%' }]} />
                    <View style={[styles.gridLine, styles.gridLineVertical, { left: '33.33%' }]} />
                    <View style={[styles.gridLine, styles.gridLineVertical, { left: '66.66%' }]} />
                  </View>
                  <TouchableOpacity style={styles.replaceButton} onPress={() => handleReplacePhoto(group.id)}>
                    <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.replaceText}>Replace</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.emptyPhotoContainer}>
                  <TouchableOpacity style={styles.addPhotoButton} onPress={() => handleReplacePhoto(group.id)}>
                    <Ionicons name="camera-outline" size={40} color="#999999" />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Location Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Add a Location"
                placeholderTextColor="#999999"
                value={group.location}
                onChangeText={(text) => updatePromptGroup(group.id, 'location', text)}
              />
            </View>

            {/* Caption Textarea */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Caption</Text>
              <TextInput
                style={styles.textareaInput}
                placeholder="Write something about this photo..."
                placeholderTextColor="#999999"
                value={group.caption}
                onChangeText={(text) => updatePromptGroup(group.id, 'caption', text)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.characterCount}>{group.caption.length}/500</Text>
            </View>

            {/* Separator between groups */}
            {index < promptGroups.length - 1 && <View style={styles.groupSeparator} />}
          </View>
        ))}
      </ScrollView>
      
      {/* Upload and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleBack}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => {
            // Handle upload logic here
            console.log('Prompts uploaded successfully');
            // Navigate to Face Verification Screen
            navigation.navigate('FaceVerification');
          }}
        >
          <Text style={styles.uploadButtonText}>Upload</Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 100, // Add space for buttons
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
  title: {
    fontSize: 28,
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 22,
  },
  promptSelectorContainer: {
    marginBottom: 20,
  },
  promptSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  promptText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  placeholderText: {
    color: '#999999',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastModalItem: {
    borderBottomWidth: 0,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 0,
    marginBottom: 20
  },
  photoWrapper: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  photo: {
    width: 370,
    height: 350,
    borderRadius: 15,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
    top: '33.33%',
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineVertical: {
    top: 0,
    bottom: 0,
    left: '33.33%',
    width: 1,
    height: 'auto',
  },
  replaceButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  replaceText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333333',
  },
  textareaInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333333',
    minHeight: 100,
    maxHeight: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
    paddingBottom: 50,
    gap: 15,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B5EBD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  promptGroupContainer: {
    marginBottom: 30,
  },
  emptyPhotoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addPhotoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 10,
    fontWeight: '500',
  },
  groupSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default AddPromptScreen;