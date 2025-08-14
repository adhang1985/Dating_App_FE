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
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);

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

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setShowPromptDropdown(false);
  };

  const handleReplacePhoto = () => {
    Alert.alert(
      'Replace Photo',
      'Choose new photo source',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleNext = () => {
    console.log('Proceeding to photo upload filled screen');
    navigation.navigate('PhotoUploadFilled', { 
      mainPhoto, 
      photos, 
      prompt: selectedPrompt,
      location,
      caption 
    });
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

        {/* Prompt Selector Container */}
        <View style={styles.promptSelectorContainer}>
          <TouchableOpacity 
            style={styles.promptSelector}
            onPress={() => setShowPromptDropdown(!showPromptDropdown)}
          >
            <Text style={[styles.promptText, !selectedPrompt && styles.placeholderText]}>
              {selectedPrompt || 'Select a Prompt'}
            </Text>
            <Ionicons 
              name={showPromptDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666666" 
            />
          </TouchableOpacity>
        </View>

        {/* Modal Dropdown - No scroll conflicts */}
        <Modal
          visible={showPromptDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPromptDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowPromptDropdown(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Prompt</Text>
              <ScrollView 
                style={styles.modalScrollView}
                showsVerticalScrollIndicator={true}
              >
                {prompts.map((prompt, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.modalItem,
                      index === prompts.length - 1 && styles.lastModalItem
                    ]}
                    onPress={() => handlePromptSelect(prompt)}
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
          {mainPhoto && (
            <View style={styles.photoWrapper}>
              <Image source={{ uri: mainPhoto }} style={styles.photo} />
              <View style={styles.gridOverlay}>
                {/* Grid lines */}
                <View style={styles.gridLine} />
                <View style={[styles.gridLine, styles.gridLineVertical]} />
                <View style={[styles.gridLine, { top: '66.66%' }]} />
                <View style={[styles.gridLine, styles.gridLineVertical, { left: '33.33%' }]} />
                <View style={[styles.gridLine, styles.gridLineVertical, { left: '66.66%' }]} />
              </View>
              <TouchableOpacity style={styles.replaceButton} onPress={handleReplacePhoto}>
                <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
                <Text style={styles.replaceText}>Replace</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Location Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a Location"
            placeholderTextColor="#999999"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Caption Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a caption"
            placeholderTextColor="#999999"
            value={caption}
            onChangeText={setCaption}
            multiline
          />
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default AddPromptScreen;