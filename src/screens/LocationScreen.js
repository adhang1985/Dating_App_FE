import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
// Removed react-native-maps import
import CustomInput from '../components/CustomInput';

const MarkerImage = ({ match }) => {
  return (
    <View style={styles.markerContent}>
      <View style={styles.simpleMarker}>
        <Text style={styles.markerText}>{match.name[0]}</Text>
      </View>
    </View>
  );
};

const LocationScreen = ({ navigation }) => {
  const mapRef = React.useRef(null);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [locationPermission, setLocationPermission] = useState(false);
  const [nearbyMatches, setNearbyMatches] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.3, // Much wider zoom level
    longitudeDelta: 0.3,
  });

  // Mock nearby matches data (coordinates will be calculated dynamically)
  const mockMatches = [
    {
      id: 1,
      name: 'Sarah',
      age: 24,
      photo: { uri: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e555?auto=format&fit=crop&w=200&q=80' },
      fallbackPhoto: require('../../assets/Frame.png'),
      distance: 0.5,
    },
    {
      id: 2,
      name: 'Emma',
      age: 26,
      photo: { uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
      fallbackPhoto: require('../../assets/Frame.png'),
      distance: 1.2,
    },
    {
      id: 3,
      name: 'Jessica',
      age: 23,
      photo: { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
      fallbackPhoto: require('../../assets/Frame.png'),
      distance: 2.1,
    },
  ];

  // Request location permission and get current location
  useEffect(() => {
    // Add a small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      requestLocationPermission();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      
      // Check if location services are available
      const isAvailable = await Location.hasServicesEnabledAsync();
      if (!isAvailable) {
        Alert.alert(
          'Location Services Disabled',
          'Location services disabled. Showing demo matches instead.',
          [{ text: 'OK', style: 'default', onPress: () => {
            // Show demo matches at San Francisco for demo
            const demoLocation = {
              coords: {
                latitude: 37.7749,
                longitude: -122.4194
              }
            };
            console.log('📍 Using demo location for disabled services:', demoLocation.coords);
            setLocation(demoLocation);
            setMapRegion({
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            });
            findNearbyMatches(demoLocation);
          }}]
        );
        setIsLoadingLocation(false);
        return;
      }
      
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Location permission denied. Showing demo matches instead.',
          [
            { text: 'OK', style: 'default', onPress: () => {
                          // Show demo matches at San Francisco for demo
            const demoLocation = {
              coords: {
                latitude: 37.7749,
                longitude: -122.4194
              }
            };
            console.log('📍 Using demo location for permission denied:', demoLocation.coords);
            setLocation(demoLocation);
            setMapRegion({
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            });
            findNearbyMatches(demoLocation);
            }}
          ]
        );
        setIsLoadingLocation(false);
        return;
      }

      setLocationPermission(true);
      
      // Get current location with timeout and error handling
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 15000, // 15 second timeout
        maximumAge: 10000, // Accept cached location up to 10 seconds old
      });
      
      console.log('📍 User location found:', currentLocation.coords);
      setLocation(currentLocation);
      
      // Calculate optimal region to show all matches
      const calculateOptimalRegion = (location) => {
        const PADDING = 1.5; // 50% padding around the markers
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05 * PADDING,
          longitudeDelta: 0.05 * PADDING,
        };
      };

      // Update map region to user's location with optimal zoom
      const newRegion = calculateOptimalRegion(currentLocation);
      setMapRegion(newRegion);
      console.log('📍 Map region updated:', newRegion);
      
      // Clear any existing matches before setting new ones
      setNearbyMatches([]);
      
      // Find matches around user's actual location
      findNearbyMatches(currentLocation);
      
    } catch (error) {
      console.error('Error getting location:', error);
      let errorMessage = 'Unable to get your location. Please try again.';
      
      if (error.code === 'E_LOCATION_TIMEOUT') {
        errorMessage = 'Location request timed out. Please check your GPS signal and try again.';
      } else if (error.code === 'E_LOCATION_UNAVAILABLE') {
        errorMessage = 'Location services are unavailable. Please enable GPS and try again.';
      }
      
      Alert.alert('Location Error', errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const findNearbyMatches = (userLocation) => {
    console.log('🔍 Finding nearby matches for location:', userLocation?.coords);
    
    setTimeout(() => {
      // Use user's actual location as center point
      const centerLat = userLocation?.coords?.latitude || 37.78825; // Fallback to SF
      const centerLng = userLocation?.coords?.longitude || -122.4324;
      
      console.log(`📍 Creating matches around user location: [${centerLat}, ${centerLng}]`);
      
      // Extended mock data with more realistic attributes
      const extendedMatches = [
        ...mockMatches,
        {
          id: 4,
          name: 'Rachel',
          age: 25,
          photo: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200' },
          fallbackPhoto: require('../../assets/Frame.png'),
          distance: 1.8,
          interests: ['photography', 'travel', 'music'],
          compatibility: 89
        },
        {
          id: 5,
          name: 'Sophie',
          age: 27,
          photo: { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
          fallbackPhoto: require('../../assets/Frame.png'),
          distance: 2.4,
          interests: ['hiking', 'yoga', 'cooking'],
          compatibility: 92
        }
      ];
      
      // Create a more dynamic distribution of matches
      const matches = extendedMatches.map((match, index) => {
        // Create a circular pattern with larger radius for better visibility
        const angle = (index * (360 / extendedMatches.length)) * (Math.PI / 180);
        const radius = 0.02 * (index + 1); // Much larger radius for better visibility
        
        const matchLocation = {
          ...match,
          latitude: centerLat + (radius * Math.cos(angle)),
          longitude: centerLng + (radius * Math.sin(angle)),
        };
        
        // Calculate real distance
        const distance = calculateDistance(
          centerLat, centerLng,
          matchLocation.latitude, matchLocation.longitude
        );
        
        // Add match quality score based on multiple factors
        const distanceScore = Math.max(0, 100 - (distance * 10)); // Distance penalty
        const ageScore = 100 - Math.abs(25 - match.age) * 5; // Age similarity score
        const randomFactor = Math.random() * 20; // Add some randomness
        
        matchLocation.distance = Math.round(distance * 10) / 10; // Round to 1 decimal
        matchLocation.matchScore = Math.round((distanceScore + ageScore + randomFactor) / 3);
        
        console.log(`✅ ${match.name} positioned at [${matchLocation.latitude}, ${matchLocation.longitude}] - ${matchLocation.distance}km away (Match Score: ${matchLocation.matchScore}%)`);
        return matchLocation;
      });
      
      // Sort matches by match score
      const sortedMatches = matches.sort((a, b) => b.matchScore - a.matchScore);
      
      console.log('🎯 Setting matches on map:', sortedMatches.length);
      console.log('🎯 Matches data:', sortedMatches);
      setNearbyMatches(sortedMatches);
      
      Alert.alert(
        '💕 Matches Found!',
        `Found ${sortedMatches.length} potential matches near you!\nTop match: ${sortedMatches[0].name} (${sortedMatches[0].matchScore}% match)`,
        [{ text: 'Great!', style: 'default' }]
      );
    }, 1500);
  };

  // Calculate distance between two coordinates (in km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCurrentLocationPress = () => {
    if (!locationPermission) {
      requestLocationPermission();
    } else {
      // Force reload matches for testing
      console.log('Reloading matches...');
      if (location) {
        findNearbyMatches(location);
      } else {
        // Try to get location first if not available
        requestLocationPermission();
      }
    }
  };

  const handleNext = () => {
    navigation.navigate('Profession');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `20%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Location</Text>
        <Text style={styles.subtitle}>
          Turn on location to find nearby matches.
          {nearbyMatches.length > 0 && (
            <Text style={styles.matchesFound}> {nearbyMatches.length} matches found!</Text>
          )}
        </Text>
        
        

        <View style={styles.formContainer}>
          {/* Real Map */}
          <View style={styles.mapContainer}>
            <View style={styles.mapCanvas}>
              {/* User Location Marker */}
              <View style={[styles.userMarker]}>
                <View style={styles.userDot} />
                <Text style={styles.markerLabel}>You are here</Text>
              </View>

              {/* Match Profile Markers */}
              {nearbyMatches && nearbyMatches.map((match, index) => {
                const angleInRadians = (index * (360 / nearbyMatches.length)) * (Math.PI / 180);
                const radius = 140; // Increased distance from center for larger markers
                const x = Math.cos(angleInRadians) * radius + 150; // Center X + offset
                const y = Math.sin(angleInRadians) * radius + 150; // Center Y + offset
                
                return (
                  <TouchableOpacity
                    key={`match-${match.id}`}
                    style={[styles.matchMarker, { left: x, top: y }]}
                    onPress={() => {
                      Alert.alert(
                        '💕 Match Found!',
                        `${match.name}, ${match.age}\n${match.distance}km away\nMatch Score: ${match.matchScore}%`,
                        [{ text: 'View Profile', style: 'default' }]
                      );
                    }}
                  >
                    <View style={styles.simpleMarker}>
                      <Image
                        source={imageLoadErrors[match.id] ? match.fallbackPhoto : match.photo}
                        style={styles.markerImage}
                        onError={() => {
                          console.log(`Failed to load image for ${match.name}`);
                          setImageLoadErrors(prev => ({
                            ...prev,
                            [match.id]: true
                          }));
                        }}
                      />
                    </View>
                    <View style={styles.labelContainer}>
                      <Text style={styles.markerLabel}>{match.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {/* Loading indicator */}
            {isLoadingLocation && (
              <View style={styles.loadingOverlay}>
                <View style={styles.loadingContainer}>
                  <Ionicons name="location" size={24} color="#1B5EBD" />
                  <Text style={styles.loadingText}>Finding nearby matches...</Text>
                </View>
              </View>
            )}


            
            {/* Current Location Button */}
            <View style={styles.mapButtons}>
              <TouchableOpacity 
                style={[
                  styles.currentLocationBtn,
                  locationPermission && styles.currentLocationBtnActive
                ]}
                onPress={handleCurrentLocationPress}
              >
                <Ionicons 
                  name="locate" 
                  size={20} 
                  color={locationPermission ? "#1B5EBD" : "#666"} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.currentLocationBtn, { marginTop: 10 }]}
                onPress={() => {
                  if (location && nearbyMatches.length > 0) {
                    const PADDING = { top: 50, right: 50, bottom: 50, left: 50 };
                    mapRef.current?.fitToCoordinates(
                      [
                        { 
                          latitude: location.coords.latitude, 
                          longitude: location.coords.longitude 
                        },
                        ...nearbyMatches.map(match => ({
                          latitude: match.latitude,
                          longitude: match.longitude
                        }))
                      ],
                      {
                        edgePadding: PADDING,
                        animated: true,
                      }
                    );
                  }
                }}
              >
                <Ionicons name="expand" size={20} color="#1B5EBD" />
              </TouchableOpacity>
            </View>

            {/* Debug: Show match count and map status */}
            <View style={styles.debugInfo}>
              <Text style={styles.debugText}>
                🎯 {nearbyMatches.length} matches found
              </Text>
              <Text style={styles.debugText}>
                📍 Map: Ready • Location: {location ? 'Found' : 'Demo'}
              </Text>
            </View>
          </View>

          <CustomInput
            placeholder="Enter your address, area or postcode"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <Text style={styles.disclaimer}>
            This detail will appear on your public profile.
          </Text>
        </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 22,
  },
  matchesFound: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
  },
  mapContainer: {
    height: 400,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  mapCanvas: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  userMarker: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    alignItems: 'center',
  },
  userDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1B5EBD',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  matchMarker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  markerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  markerContent: {
    alignItems: 'center',
  },
  simpleMarker: {
    width: 50,
    height: 50,
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  labelContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    marginTop: 4,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  matchScoreBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    zIndex: 1,
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  fallbackMarker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 22, // Larger text for bigger markers
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  mapButtons: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  currentLocationBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentLocationBtnActive: {
    backgroundColor: '#E8F2FF',
    borderWidth: 1,
    borderColor: '#1B5EBD',
  },

  markerDebug: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1B5EBD',
  },
  markerDebugText: {
    fontSize: 12,
    color: '#1B5EBD',
    fontWeight: '500',
  },
  input: {
    marginVertical: 8,
  },
  disclaimer: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'left',
    marginTop: 30,
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 40,
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

export default LocationScreen;