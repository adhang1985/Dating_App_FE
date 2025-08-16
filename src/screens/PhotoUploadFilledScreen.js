import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PhotoUploadFilledScreen = ({ navigation, route }) => {
  const { mainPhoto, photos = [], prompt, location, caption } = route.params || {};
  
  // Initialize with photos from previous screen or mock data as fallback
  const [filledPhotos, setFilledPhotos] = useState(() => {
    const initialPhotos = [null, null, null, null, null];
    photos.forEach((photo, index) => {
      if (index < 5) initialPhotos[index] = photo;
    });
    // Add some mock photos if none provided
    if (!photos.length) {
      initialPhotos[0] = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
      initialPhotos[1] = 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face';
    }
    return initialPhotos;
  });

  const [mainPhotoState, setMainPhotoState] = useState(
    mainPhoto || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
  );

  // Request permissions for camera and media library
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        Alert.alert(
          'Permissions Required',
          'Please grant camera and photo library permissions to upload photos.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const handlePhotoPress = async (index, isMain = false) => {
    if (isMain || filledPhotos[index]) {
      Alert.alert(
        'Edit Photo',
        'What would you like to do?',
        [
          { text: 'Replace with Camera', onPress: () => takePhoto(index, isMain) },
          { text: 'Replace with Gallery', onPress: () => pickImage(index, isMain) },
          { text: 'Remove', onPress: () => removePhoto(index, isMain), style: 'destructive' },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } else {
      addPhoto(index);
    }
  };

  const addPhoto = async (index) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    Alert.alert(
      'Add Photo',
      'Choose photo source',
      [
        { text: 'Camera', onPress: () => takePhoto(index, false) },
        { text: 'Gallery', onPress: () => pickImage(index, false) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const takePhoto = async (index, isMain = false) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photoUri = result.assets[0].uri;
        setPhoto(index, isMain, photoUri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const pickImage = async (index, isMain = false) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photoUri = result.assets[0].uri;
        setPhoto(index, isMain, photoUri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    }
  };

  const setPhoto = (index, isMain, photoUri) => {
    if (isMain) {
      setMainPhotoState(photoUri);
      console.log('Main photo set:', photoUri);
    } else {
      const newPhotos = [...filledPhotos];
      newPhotos[index] = photoUri;
      setFilledPhotos(newPhotos);
      console.log(`Photo ${index} set:`, photoUri);
    }
  };

  const removePhoto = (index, isMain = false) => {
    if (isMain) {
      Alert.alert('Error', 'Main photo is required');
      return;
    }
    const newPhotos = [...filledPhotos];
    newPhotos[index] = null;
    setFilledPhotos(newPhotos);
  };

  const handleNext = () => {
    const profileData = {
      mainPhoto: mainPhotoState,
      photos: filledPhotos.filter(p => p),
      prompt,
      location,
      caption
    };
    
    console.log('Profile created:', profileData);
    console.log('Photos uploaded, proceeding to face verification');
    navigation.navigate('FaceVerification', profileData);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const PhotoPlaceholder = ({ onPress, photo, size = 'small', showEdit = false }) => (
    <TouchableOpacity 
      style={[styles.photoPlaceholder, size === 'large' ? styles.largePhoto : styles.smallPhoto]}
      onPress={onPress}
    >
      {photo ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.photo} />
          {showEdit && (
            <View style={styles.editButton}>
              <Ionicons name="create-outline" size={16} color="#FFFFFF" />
            </View>
          )}
        </View>
      ) : (
        <Ionicons name="add" size={30} color="#666666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar - Fixed at top */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '60%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upload Your Best Look</Text>
        <Text style={styles.subtitle}>Pick a clear photo. First impressions matter!</Text>

        {/* Photo Section - Redesigned Layout */}
        <View style={styles.photoSection}>
          {/* Main Photo Container */}
          <View style={styles.mainPhotoWrapper}>
            <PhotoPlaceholder 
              onPress={() => handlePhotoPress(0, true)}
              photo={mainPhotoState}
              size="large"
              showEdit={true}
            />
          </View>

          {/* Side Photos Grid */}
          <View style={styles.sidePhotosGrid}>
            <PhotoPlaceholder 
              onPress={() => handlePhotoPress(0)}
              photo={filledPhotos[0]}
              size="small"
            />
            <PhotoPlaceholder 
              onPress={() => handlePhotoPress(1)}
              photo={filledPhotos[1]}
              size="small"
            />
          </View>
        </View>

        {/* Bottom Photos Row */}
        <View style={styles.bottomPhotosRow}>
          <PhotoPlaceholder 
            onPress={() => handlePhotoPress(2)}
            photo={filledPhotos[2]}
            size="small"
          />
          <PhotoPlaceholder 
            onPress={() => handlePhotoPress(3)}
            photo={filledPhotos[3]}
            size="small"
          />
          <PhotoPlaceholder 
            onPress={() => handlePhotoPress(4)}
            photo={filledPhotos[4]}
            size="small"
          />
        </View>

        {/* Guidelines */}
        <View style={styles.guidelinesContainer}>
          <Text style={styles.guidelineItem}>• Use a clear photo of your face</Text>
          <Text style={styles.guidelineItem}>• Smile or look natural — no sunglasses or heavy filters</Text>
          <Text style={styles.guidelineItem}>• Make sure you're the only one in the picture</Text>
          <Text style={styles.guidelineItem}>• Good lighting = great first impression</Text>
          <Text style={styles.guidelineItem}>• Avoid blurry, dark, or group photos</Text>
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
    marginBottom: 20,
  },
  photoSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  mainPhotoWrapper: {
    flex: 1,
    marginRight: 15,
  },
  sidePhotosGrid: {
    justifyContent: 'space-between',
    width: 100,
  },
  bottomPhotosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  photoPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  largePhoto: {
    width: '100%',
    height: 270,
  },
  smallPhoto: {
    width: 100,
    height: 130,
  },
  photoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  editButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelinesContainer: {
    marginBottom: 40,
  },
  guidelineItem: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
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

export default PhotoUploadFilledScreen;