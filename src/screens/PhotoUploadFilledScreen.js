import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PhotoUploadFilledScreen = ({ navigation, route }) => {
  const { mainPhoto, photos = [], prompt, location, caption } = route.params || {};
  
  // Initialize with some photos filled and some empty
  const [filledPhotos, setFilledPhotos] = useState([
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face',
    null,
    null,
    null
  ]);

  const [mainPhotoState, setMainPhotoState] = useState(
    mainPhoto || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
  );

  // Additional mock photos
  const additionalMockPhotos = [
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face'
  ];

  const handlePhotoPress = (index, isMain = false) => {
    if (isMain || filledPhotos[index]) {
      Alert.alert(
        'Edit Photo',
        'What would you like to do?',
        [
          { text: 'Replace', onPress: () => replacePhoto(index, isMain) },
          { text: 'Remove', onPress: () => removePhoto(index, isMain), style: 'destructive' },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } else {
      addPhoto(index);
    }
  };

  const addPhoto = (index) => {
    const availablePhotos = additionalMockPhotos.filter(photo => 
      photo !== mainPhotoState && !filledPhotos.includes(photo)
    );
    
    if (availablePhotos.length > 0) {
      const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
      const newPhotos = [...filledPhotos];
      newPhotos[index] = randomPhoto;
      setFilledPhotos(newPhotos);
    }
  };

  const replacePhoto = (index, isMain = false) => {
    if (isMain) {
      const availablePhotos = additionalMockPhotos.filter(photo => 
        !filledPhotos.includes(photo)
      );
      if (availablePhotos.length > 0) {
        const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
        setMainPhotoState(randomPhoto);
      }
    } else {
      addPhoto(index);
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
    console.log('Profile setup completed, proceeding to face verification');
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