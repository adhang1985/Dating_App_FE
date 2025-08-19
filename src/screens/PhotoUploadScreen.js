import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// Removed gesture handler imports - using simple touch interactions instead

const PhotoUploadScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([null, null, null, null, null]);
  const [mainPhoto, setMainPhoto] = useState(null);
  
    // Simplified drag and drop state
  const [selectedForSwap, setSelectedForSwap] = useState(null); // { index: number, isMain: boolean }
  const [isSwapMode, setIsSwapMode] = useState(false);

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
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    Alert.alert(
      'Add Photo',
      'Choose photo source',
      [
        { text: 'Camera', onPress: () => takePhoto(index, isMain) },
        { text: 'Gallery', onPress: () => pickImage(index, isMain) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const takePhoto = async (index, isMain = false) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
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
        mediaTypes: ['images'],
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
      setMainPhoto(photoUri);
      console.log('Main photo set:', photoUri);
    } else {
      const newPhotos = [...photos];
      newPhotos[index] = photoUri;
      setPhotos(newPhotos);
      console.log(`Photo ${index} set:`, photoUri);
    }
  };

  const handleEditPhoto = async (index, isMain = false) => {
    Alert.alert(
      'Edit Photo',
      'What would you like to do?',
      [
        { text: 'Replace with Camera', onPress: () => takePhoto(index, isMain) },
        { text: 'Replace with Gallery', onPress: () => pickImage(index, isMain) },
        { text: 'Remove Photo', onPress: () => removePhoto(index, isMain), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const removePhoto = (index, isMain = false) => {
    if (isMain) {
      setMainPhoto(null);
    } else {
      const newPhotos = [...photos];
      newPhotos[index] = null;
      setPhotos(newPhotos);
    }
  };

  // Simplified swap handlers
  const handleLongPress = (index, isMain = false) => {
    const photo = isMain ? mainPhoto : photos[index];
    if (!photo) return;
    
    console.log(`Long press detected for ${isMain ? 'main' : 'photo'} ${index}`);
    setSelectedForSwap({ index, isMain });
    setIsSwapMode(true);
  };

  const handleSwapTap = (targetIndex, targetIsMain) => {
    if (!isSwapMode || !selectedForSwap) return;
    
    console.log(`Swapping ${selectedForSwap.isMain ? 'main' : 'photo'} ${selectedForSwap.index} with ${targetIsMain ? 'main' : 'photo'} ${targetIndex}`);
    
    // Don't swap with itself
    if (selectedForSwap.index === targetIndex && selectedForSwap.isMain === targetIsMain) {
      setIsSwapMode(false);
      setSelectedForSwap(null);
      return;
    }
    
    // Get photos to swap
    let sourcePhoto, targetPhoto;
    
    if (selectedForSwap.isMain) {
      sourcePhoto = mainPhoto;
    } else {
      sourcePhoto = photos[selectedForSwap.index];
    }
    
    if (targetIsMain) {
      targetPhoto = mainPhoto;
    } else {
      targetPhoto = photos[targetIndex];
    }
    
    // Perform the swap
    if (selectedForSwap.isMain && targetIsMain) {
      // Both are main - no swap needed
    } else if (selectedForSwap.isMain && !targetIsMain) {
      // Main to photo slot
      setMainPhoto(targetPhoto);
      const newPhotos = [...photos];
      newPhotos[targetIndex] = sourcePhoto;
      setPhotos(newPhotos);
    } else if (!selectedForSwap.isMain && targetIsMain) {
      // Photo slot to main
      const newPhotos = [...photos];
      newPhotos[selectedForSwap.index] = targetPhoto;
      setPhotos(newPhotos);
      setMainPhoto(sourcePhoto);
    } else {
      // Photo slot to photo slot
      const newPhotos = [...photos];
      newPhotos[selectedForSwap.index] = targetPhoto;
      newPhotos[targetIndex] = sourcePhoto;
      setPhotos(newPhotos);
    }
    
    // Reset swap mode
    setIsSwapMode(false);
    setSelectedForSwap(null);
  };

  const cancelSwapMode = () => {
    setIsSwapMode(false);
    setSelectedForSwap(null);
  };

  // Long press instruction for users
  const showLongPressHint = () => {
    console.log('Hold any photo for 1 second to enter swap mode');
  };

  const handleNext = () => {
    if (!mainPhoto) {
      Alert.alert('Photo Required', 'Please add at least your main photo to continue.');
      return;
    }

    const validPhotos = photos.filter(p => p);
    console.log('Proceeding to next screen with:');
    console.log('Main photo:', mainPhoto);
    console.log('Additional photos:', validPhotos);
    console.log('Total photos:', validPhotos.length + 1);

    navigation.navigate('AddPrompt', { 
      mainPhoto, 
      photos: validPhotos,
      totalPhotos: validPhotos.length + 1
    });
  };



  const PhotoPlaceholder = ({ 
    onPress, 
    photo, 
    size = 'small', 
    showEdit = false, 
    index, 
    isMain = false 
  }) => {
    const isSelected = selectedForSwap && selectedForSwap.index === index && selectedForSwap.isMain === isMain;
    const canSwap = isSwapMode && !isSelected && (photo || selectedForSwap);
    
    const handlePress = () => {
      if (isSwapMode) {
        handleSwapTap(index, isMain);
      } else {
        onPress();
      }
    };

    const handleLongPressPhoto = () => {
      if (photo && !isSwapMode) {
        handleLongPress(index, isMain);
      }
    };
    
    return (
      <View
        style={[
          styles.photoPlaceholder,
          size === 'large' ? styles.largePhoto : styles.smallPhoto,
          isSelected && styles.selectedForSwap,
          canSwap && styles.canSwap,
        ]}
      >
        <TouchableOpacity
          style={styles.photoContent}
          onPress={handlePress}
          onLongPress={handleLongPressPhoto}
          delayLongPress={500}
          activeOpacity={0.8}
        >
          {photo ? (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              {showEdit && !isSwapMode && (
                <View style={styles.editButton}>
                  <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                </View>
              )}
              {isSelected && (
                <View style={styles.selectedIndicator}>
                  <Ionicons name="checkmark-circle" size={30} color="#1B5EBD" />
                </View>
              )}
              {canSwap && (
                <View style={styles.swapIndicator}>
                  <Ionicons name="swap-horizontal" size={20} color="#1B5EBD" />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              {size === 'large' ? (
                <Ionicons name="camera-outline" size={50} color="#666666" />
              ) : (
                <Ionicons name="add" size={30} color="#666666" />
              )}
              {canSwap && (
                <View style={styles.dropIndicator}>
                  <Ionicons name="arrow-down" size={24} color="#1B5EBD" />
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar - Fixed at top */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '20%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upload Your Best Look</Text>
        <Text style={styles.subtitle}>Pick a clear photo. First impressions matter!</Text>
        
        {isSwapMode && (
          <View style={styles.swapInstructions}>
            <Text style={styles.swapInstructionsText}>
              💡 Tap any photo or empty slot to swap positions
            </Text>
            <TouchableOpacity style={styles.cancelSwapButton} onPress={cancelSwapMode}>
              <Text style={styles.cancelSwapText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Photo Section - Redesigned Layout */}
        <View style={styles.photoSection}>
          {/* Main Photo Container */}
          <View style={styles.mainPhotoWrapper}>
            <PhotoPlaceholder 
              onPress={() => mainPhoto ? handleEditPhoto(0, true) : handlePhotoPress(0, true)}
              photo={mainPhoto}
              size="large"
              showEdit={!!mainPhoto}
              index={0}
              isMain={true}
            />
          </View>

          {/* Side Photos Grid */}
          <View style={styles.sidePhotosGrid}>
            <PhotoPlaceholder 
              onPress={() => photos[0] ? handleEditPhoto(0) : handlePhotoPress(0)}
              photo={photos[0]}
              size="small"
              index={0}
              isMain={false}
            />
            <PhotoPlaceholder 
              onPress={() => photos[1] ? handleEditPhoto(1) : handlePhotoPress(1)}
              photo={photos[1]}
              size="small"
              index={1}
              isMain={false}
            />
          </View>
        </View>

        {/* Bottom Photos Row */}
        <View style={styles.bottomPhotosRow}>
          <PhotoPlaceholder 
            onPress={() => photos[2] ? handleEditPhoto(2) : handlePhotoPress(2)}
            photo={photos[2]}
            size="small"
            index={2}
            isMain={false}
          />
          <PhotoPlaceholder 
            onPress={() => photos[3] ? handleEditPhoto(3) : handlePhotoPress(3)}
            photo={photos[3]}
            size="small"
            index={3}
            isMain={false}
          />
          <PhotoPlaceholder 
            onPress={() => photos[4] ? handleEditPhoto(4) : handlePhotoPress(4)}
            photo={photos[4]}
            size="small"
            index={4}
            isMain={false}
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
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#1B5EBD',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  swapInstructions: {
    backgroundColor: 'rgba(27, 94, 189, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(27, 94, 189, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swapInstructionsText: {
    fontSize: 14,
    color: '#1B5EBD',
    fontWeight: '500',
    flex: 1,
  },
  cancelSwapButton: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelSwapText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  photoSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  mainPhotoWrapper: {
    flex: 1,
    marginRight: 10,
  },
  sidePhotosGrid: {
    justifyContent: 'space-between',
    width: 120,
  },
  bottomPhotosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    height: 250,
  },
  smallPhoto: {
    width: 120,
    height: 120,
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
    justifyContent: 'flex-end',
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
  // Drag and Drop Styles
  photoTouchable: {
    width: '100%',
    height: '100%',
  },
  photoContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedForSwap: {
    borderColor: '#1B5EBD',
    borderWidth: 3,
    borderStyle: 'solid',
    backgroundColor: 'rgba(27, 94, 189, 0.1)',
  },
  canSwap: {
    borderColor: '#1B5EBD',
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(27, 94, 189, 0.05)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(27, 94, 189, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
});

export default PhotoUploadScreen;