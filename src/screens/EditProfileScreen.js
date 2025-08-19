import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Static data moved outside component to prevent recreation
const INTERESTS_DATA = [
  { id: 'music', name: 'Music', icon: 'musical-notes', selected: true },
  { id: 'books', name: 'Books', icon: 'book', selected: false },
  { id: 'cooking', name: 'Cooking', icon: 'restaurant', selected: true },
  { id: 'photography', name: 'Photography', icon: 'camera', selected: false },
  { id: 'games', name: 'Games', icon: 'game-controller', selected: true },
  { id: 'books2', name: 'Books', icon: 'library', selected: false },
  { id: 'photography2', name: 'Photography', icon: 'camera-outline', selected: true },
  { id: 'music2', name: 'Music', icon: 'musical-note', selected: false },
];

const EditProfileScreen = ({ navigation }) => {
  const [profileImages] = useState([
    'https://picsum.photos/100/100?random=1',
    'https://picsum.photos/100/100?random=2',
    'https://picsum.photos/100/100?random=3',
  ]);

  const [interests] = useState(INTERESTS_DATA);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePreview = useCallback(() => {
    Alert.alert('Preview', 'Profile preview coming soon!');
  }, []);

  const handleAddPhoto = useCallback(() => {
    Alert.alert('Add Photo', 'Photo upload functionality coming soon!');
  }, []);

  const handleEditPrompt = useCallback((type) => {
    Alert.alert('Edit Prompt', `${type} prompt editing coming soon!`);
  }, []);

  const handleEditField = useCallback((field) => {
    Alert.alert('Edit Field', `${field} editing coming soon!`);
  }, []);

  const handleInterestToggle = useCallback((interestId) => {
    Alert.alert('Interest', 'Interest selection coming soon!');
  }, []);

  const renderImageSlot = useCallback((index) => {
    if (profileImages[index]) {
      return (
        <Image 
          source={{ uri: profileImages[index] }}
          style={styles.profileImage}
        />
      );
    }
    return (
      <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
        <Ionicons name="add" size={30} color="#999" />
      </TouchableOpacity>
    );
  }, [profileImages, handleAddPhoto]);

  const renderFieldRow = useCallback((label, value, onPress) => (
    <TouchableOpacity style={styles.fieldRow} onPress={onPress}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldRight}>
        <Text style={styles.fieldValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  ), []);

  const renderPromptSection = useCallback((title, subtitle, hasContent = false) => (
    <View style={styles.promptSection}>
      <View style={styles.promptHeader}>
        <View style={styles.promptInfo}>
          <Text style={styles.promptTitle}>{title}</Text>
          <Text style={styles.promptSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity 
          style={styles.promptButton}
          onPress={() => handleEditPrompt(title)}
        >
          <Ionicons 
            name={hasContent ? "create-outline" : "add"} 
            size={20} 
            color="#1B5EBD" 
          />
        </TouchableOpacity>
      </View>
    </View>
  ), [handleEditPrompt]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
          <Ionicons name="eye-outline" size={20} color="#1B5EBD" />
          <Text style={styles.previewText}>Preview</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Let's start with the basics. This helps others know who you are at a glance.
        </Text>

        {/* Pictures Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pictures</Text>
          <View style={styles.picturesGrid}>
            {[0, 1, 2].map((index) => (
              <View key={index} style={styles.imageSlot}>
                {renderImageSlot(index)}
              </View>
            ))}
            {[3, 4, 5].map((index) => (
              <View key={index} style={styles.imageSlot}>
                {renderImageSlot(index)}
              </View>
            ))}
          </View>
        </View>

        {/* Written Prompt */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Written Prompt</Text>
          {renderPromptSection(
            "The way to my heart is...",
            "Let your personality shine through your response",
            true
          )}
          {renderPromptSection(
            "Edited a Prompt",
            "Something that sets you apart"
          )}
        </View>

        {/* Voice Prompt */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Prompt</Text>
          {renderPromptSection(
            "Select a Prompt",
            "Send a voice note to your matches"
          )}
          {renderPromptSection(
            "Select a Prompt",
            "Add another voice note"
          )}
        </View>

        {/* Prompt Poll */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prompt Poll</Text>
          {renderPromptSection(
            "Select a Prompt",
            "Add some poll about your attitude"
          )}
        </View>

        {/* Identity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identity</Text>
          {renderFieldRow("Pronouns", "He / Him", () => handleEditField("Pronouns"))}
          {renderFieldRow("Gender", "Male", () => handleEditField("Gender"))}
          {renderFieldRow("Sexuality", "Add", () => handleEditField("Sexuality"))}
          {renderFieldRow("I'm interested in", "Women", () => handleEditField("I'm interested in"))}
        </View>

        {/* My Virtues */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Virtues</Text>
          {renderFieldRow("Work", "Regular Carpenter", () => handleEditField("Work"))}
          {renderFieldRow("Job Title", "Add", () => handleEditField("Job Title"))}
          {renderFieldRow("College or University", "Add", () => handleEditField("College or University"))}
          {renderFieldRow("Education Level", "Add", () => handleEditField("Education Level"))}
          {renderFieldRow("Religious Beliefs", "Add", () => handleEditField("Religious Beliefs"))}
          {renderFieldRow("Hometown", "Add", () => handleEditField("Hometown"))}
          {renderFieldRow("Politics", "Add", () => handleEditField("Politics"))}
          {renderFieldRow("Languages Spoken", "Add", () => handleEditField("Languages Spoken"))}
          {renderFieldRow("Dating Intentions", "Add", () => handleEditField("Dating Intentions"))}
          {renderFieldRow("Relationship Type", "Add", () => handleEditField("Relationship Type"))}
        </View>

        {/* My Vitals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Vitals</Text>
          {renderFieldRow("Name", "Smith", () => handleEditField("Name"))}
          {renderFieldRow("Age", "31", () => handleEditField("Age"))}
          {renderFieldRow("Height", "180 cm", () => handleEditField("Height"))}
          {renderFieldRow("Location", "Add", () => handleEditField("Location"))}
          {renderFieldRow("Ethnicity", "Add", () => handleEditField("Ethnicity"))}
          {renderFieldRow("Children", "No", () => handleEditField("Children"))}
          {renderFieldRow("Family Plans", "Add", () => handleEditField("Family Plans"))}
        </View>

        {/* Lifestyle/Habits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle/Habits</Text>
          {renderFieldRow("Drinking", "Occasionally", () => handleEditField("Drinking"))}
          {renderFieldRow("Smoking", "No", () => handleEditField("Smoking"))}
          {renderFieldRow("Weed", "No", () => handleEditField("Weed"))}
        </View>

        {/* Interest and Hobbies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interest and Hobbies</Text>
          <View style={styles.interestsGrid}>
            {interests.slice(0, 6).map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestItem,
                  interest.selected && styles.selectedInterest
                ]}
                onPress={() => handleInterestToggle(interest.id)}
              >
                <Ionicons 
                  name={interest.icon} 
                  size={24} 
                  color="#666"
                />
                <Text style={[
                  styles.interestText,
                  interest.selected && styles.selectedInterestText
                ]}>
                  {interest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Padding for Navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discovery')}>
          <Ionicons name="home" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
          <Ionicons name="compass" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Matches')}>
          <Ionicons name="heart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChatList')}>
          <View style={styles.notificationBadge}>
            <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserAccount')}>
          <Ionicons name="person" size={24} color="#1B5EBD" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  previewText: {
    fontSize: 16,
    color: '#1B5EBD',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  picturesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageSlot: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  addPhotoButton: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  promptSection: {
    marginBottom: 12,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  promptInfo: {
    flex: 1,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  promptSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  promptButton: {
    padding: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  fieldRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedInterest: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  interestText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  selectedInterestText: {
    color: '#666',
  },
  bottomPadding: {
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;