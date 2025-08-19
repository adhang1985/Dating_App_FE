import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VIPBadgeScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [selectedNotability, setSelectedNotability] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [supportingLinks, setSupportingLinks] = useState([
    'https://www.instagram.com/us...',
    'https://www.youtube.com/channel/...',
    'https://www.example.com/article...'
  ]);

  const notabilityOptions = [
    { id: 'influencer', title: 'Influencer' },
    { id: 'artist', title: 'Artist' },
    { id: 'entrepreneur', title: 'Entrepreneur' },
    { id: 'publicFigure', title: 'Public Figure' },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotabilitySelect = (optionId) => {
    if (selectedNotability.includes(optionId)) {
      setSelectedNotability(selectedNotability.filter(id => id !== optionId));
    } else {
      setSelectedNotability([...selectedNotability, optionId]);
    }
  };

  const handleAddLink = () => {
    setSupportingLinks([...supportingLinks, '']);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...supportingLinks];
    newLinks[index] = value;
    setSupportingLinks(newLinks);
  };

  const handleSubmitVerify = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (selectedNotability.length === 0) {
      Alert.alert('Error', 'Please select at least one notability option');
      return;
    }
    
    Alert.alert(
      'VIP Badge Submitted!', 
      'Your VIP badge application has been submitted for verification. You will be notified once the review is complete.'
    );
  };

  const handleNotNow = () => {
    navigation.goBack();
  };

  const getLinkIcon = (index) => {
    if (index === 0) return 'logo-instagram';
    if (index === 1) return 'logo-youtube';
    return 'document-text-outline';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.crownContainer}>
            <Image 
              source={require('../../assets/get_vip_logo.png')}
              style={styles.crownImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Executive</Text>
          </View>
          
          <Text style={styles.subtitle}>Earn Your VIP Badge — Verified via Instagram.</Text>
        </View>

        {/* Confirm Authenticity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confirm Authenticity</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Full Name"
            placeholderTextColor="#fff"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Confirm Notability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confirm Notability</Text>
          <View style={styles.notabilityGrid}>
            {notabilityOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.notabilityOption,
                  selectedNotability.includes(option.id) && styles.selectedNotabilityOption
                ]}
                onPress={() => handleNotabilitySelect(option.id)}
              >
                <View style={[
                  styles.notabilityDot,
                  selectedNotability.includes(option.id) && styles.selectedNotabilityDot
                ]} />
                <Text style={styles.notabilityText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <View style={styles.locationRow}>
            <TouchableOpacity style={styles.locationField}>
              <Text style={styles.locationText}>Country</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.locationRow}>
            <TouchableOpacity style={[styles.locationField, { marginRight: 8 }]}>
              <Text style={styles.locationText}>State</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.locationField, { marginLeft: 8 }]}>
              <Text style={styles.locationText}>City</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Supporting Links */}
        <View style={styles.section}>
          <View style={styles.linkHeader}>
            <Text style={styles.sectionTitle}>Add Supporting Links</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddLink}>
              <Ionicons name="add" size={20} color="#8B4513" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {supportingLinks.map((link, index) => (
            <View key={index} style={styles.linkInputContainer}>
              <TextInput
                style={styles.linkInput}
                value={link}
                onChangeText={(value) => handleLinkChange(index, value)}
                placeholder="Enter URL"
                placeholderTextColor="#B8860B"
              />
              <View style={styles.linkIcon}>
                <Ionicons name={getLinkIcon(index)} size={20} color="#B8860B" />
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitVerify}>
          <Text style={styles.submitButtonText}>Submit & Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
          <Text style={styles.notNowButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDCB50',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  titleSection: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  crownContainer: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 60
  },
  crownImage: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  title: {
    fontSize: 24,
    color: '#8B4513',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'left',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: 'rgba(184, 134, 11, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
  },
  notabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  notabilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 15
  },
  notabilityDot: {
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: 'rgba(184, 134, 11, 0.3)',
    marginRight: 12,
    padding: 10
  },
  selectedNotabilityDot: {
    backgroundColor: '#fff'
  },
  notabilityText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  locationField: {
    flex: 1,
    backgroundColor: 'rgba(184, 134, 11, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  linkInputContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  linkInput: {
    backgroundColor: 'rgba(184, 134, 11, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 50,
    fontSize: 16,
    color: '#8B4513',
  },
  linkIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  bottomPadding: {
    height: 20,
  },
  bottomActions: {
    padding: 20,
    backgroundColor: '#F5C842',
    marginBottom: 30
  },
  submitButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#8B4513',
    fontSize: 18
  },
  notNowButton: {
    backgroundColor: 'rgba(139, 69, 19, 0.3)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  notNowButtonText: {
    color: '#8B4513',
    fontSize: 16
  },
});

export default VIPBadgeScreen;