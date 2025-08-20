import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Svg, { 
  Rect, 
  Circle, 
  Line, 
  Text as SvgText, 
  Image as SvgImage,
  Defs,
  Pattern,
  G,
  ClipPath
} from 'react-native-svg';
import CustomInput from '../components/CustomInput';

function LocationScreen({ navigation }) {
  const mapRef = useRef(null);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [locationPermission, setLocationPermission] = useState(false);
  const [nearbyMatches, setNearbyMatches] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  
  // Canvas map state
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const { width, height } = Dimensions.get('window');
  const mapWidth = width - 50;
  const mapHeight = 400;

  // Simple map style
  const mapStyle = [];

  useEffect(() => {
    const timer = setTimeout(() => {
      requestLocationPermission();
    }, 1000);
    
    // Auto-stop loading after 5 seconds if still loading
    const loadingTimeout = setTimeout(() => {
      if (isLoadingLocation) {
        setIsLoadingLocation(false);
        console.log('🔄 Loading timeout - stopped loading overlay');
      }
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimeout);
    };
  }, []);



  const handleCurrentLocationPress = () => {
    if (!locationPermission) {
      requestLocationPermission();
    } else if (location) {
      findNearbyMatches(location);
    } else {
      requestLocationPermission();
    }
  };

  const handleNext = () => {
    navigation.navigate('Profession');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      
      const isAvailable = await Location.hasServicesEnabledAsync();
      if (!isAvailable) {
        Alert.alert(
          'Location Services Disabled',
          'Location services disabled. Showing demo matches instead.',
          [{ text: 'OK', style: 'default', onPress: () => {
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
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Location permission denied. Showing demo matches instead.',
          [{ text: 'OK', style: 'default', onPress: () => {
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
          }}]
        );
        setIsLoadingLocation(false);
        return;
      }

      setLocationPermission(true);
      
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 15000,
        maximumAge: 10000,
      });
      
      console.log('📍 User location found:', currentLocation.coords);
      setLocation(currentLocation);
      
      const calculateOptimalRegion = (location) => {
        const PADDING = 1.5;
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05 * PADDING,
          longitudeDelta: 0.05 * PADDING,
        };
      };

      const newRegion = calculateOptimalRegion(currentLocation);
      setMapRegion(newRegion);
      console.log('📍 Map region updated:', newRegion);
      
      setNearbyMatches([]);
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

  // Simple location-based matching algorithm
  const findNearbyMatches = (userLocation) => {
    console.log('🔍 Finding matches near your location:', userLocation?.coords);
    
    setTimeout(() => {
      const userLat = userLocation?.coords?.latitude || 37.7749;
      const userLng = userLocation?.coords?.longitude || -122.4194;
      
      console.log(`📍 Searching for matches around: [${userLat}, ${userLng}]`);
      
      // Simple user profiles near the user's location
      const nearbyProfiles = [
        {
          id: 1,
          name: 'Sarah',
          age: 24,
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e555?auto=format&fit=crop&w=200&q=80',
          latitude: userLat + 0.008,
          longitude: userLng + 0.005,
          bio: 'Art lover and coffee enthusiast',
          profession: 'Graphic Designer',
          interests: ['art', 'coffee', 'photography']
        },
        {
          id: 2,
          name: 'Emma',
          age: 26,
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
          latitude: userLat - 0.006,
          longitude: userLng + 0.009,
          bio: 'Fitness enthusiast and foodie',
          profession: 'Marketing Manager',
          interests: ['fitness', 'food', 'travel']
        },
        {
          id: 3,
          name: 'Jessica',
          age: 23,
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
          latitude: userLat + 0.004,
          longitude: userLng - 0.007,
          bio: 'Dancing through life with music',
          profession: 'Dance Instructor',
          interests: ['music', 'dance', 'movies']
        },
        {
          id: 4,
          name: 'Rachel',
          age: 25,
          photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
          latitude: userLat - 0.009,
          longitude: userLng - 0.004,
          bio: 'Capturing moments around the world',
          profession: 'Photographer',
          interests: ['photography', 'travel', 'music']
        },
        {
          id: 5,
          name: 'Sophie',
          age: 27,
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          latitude: userLat + 0.011,
          longitude: userLng + 0.008,
          bio: 'Mindful living and healthy cooking',
          profession: 'Yoga Instructor',
          interests: ['hiking', 'yoga', 'cooking']
        }
      ];
      
      // Calculate distance and compatibility for each profile
      const matches = nearbyProfiles.map(profile => {
        const distance = calculateDistance(userLat, userLng, profile.latitude, profile.longitude);
        
        // Simple compatibility calculation based on age and distance
        const ageCompatibility = Math.max(0, 100 - Math.abs(profile.age - 25) * 5);
        const distanceScore = Math.max(0, 100 - distance * 10);
        const matchScore = Math.round((ageCompatibility + distanceScore) / 2);
        
        return {
          ...profile,
          distance: Math.round(distance * 10) / 10,
          matchScore: Math.max(70, matchScore) // Ensure minimum 70% match
        };
      });
      
      // Sort by distance (closest first)
      const sortedMatches = matches.sort((a, b) => a.distance - b.distance);
      
      console.log(`✅ Found ${sortedMatches.length} matches nearby`);
      setNearbyMatches(sortedMatches);
      setIsLoadingLocation(false);
      
      Alert.alert(
        '💕 Matches Found!',
        `Found ${sortedMatches.length} people near you!\nClosest match: ${sortedMatches[0].name} (${sortedMatches[0].distance}km away)`,
        [{ text: 'View on Map', style: 'default' }]
      );
    }, 2000);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Canvas map utility functions
  const latLngToCanvasXY = (lat, lng) => {
    const centerLat = location?.coords?.latitude || 37.7749;
    const centerLng = location?.coords?.longitude || -122.4194;
    
    // Simplified coordinate conversion for better visibility
    const scale = 8000 * zoomLevel; // Much smaller scale for visible markers
    const x = (lng - centerLng) * scale + mapWidth / 2 + panOffset.x;
    const y = (centerLat - lat) * scale + mapHeight / 2 + panOffset.y;
    
    return { x, y };
  };

  const canvasXYToLatLng = (x, y) => {
    const centerLat = location?.coords?.latitude || 37.7749;
    const centerLng = location?.coords?.longitude || -122.4194;
    
    const scale = 8000 * zoomLevel; // Match the updated scale
    const lng = centerLng + (x - mapWidth / 2 - panOffset.x) / scale;
    const lat = centerLat - (y - mapHeight / 2 - panOffset.y) / scale;
    
    return { lat, lng };
  };

  // Pan responder for map interaction
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        setPanOffset({
          x: panOffset.x + gestureState.dx,
          y: panOffset.y + gestureState.dy,
        });
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  // Custom Canvas Map Component
  const renderCanvasMap = () => {
    const userLocation = location?.coords;
    
    return (
      <View style={styles.canvasMapContainer} {...panResponder.panHandlers}>
        <Svg width={mapWidth} height={mapHeight} style={styles.canvasMap}>
          {/* Map Background - Grid Pattern */}
          <Defs>
            <Pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40">
              <Rect width="40" height="40" fill="#F8F9FA" />
              <Line x1="0" y1="0" x2="40" y2="0" stroke="#E9ECEF" strokeWidth="1" />
              <Line x1="0" y1="0" x2="0" y2="40" stroke="#E9ECEF" strokeWidth="1" />
            </Pattern>
            <Pattern id="streets" patternUnits="userSpaceOnUse" width="80" height="80">
              <Rect width="80" height="80" fill="#F1F3F4" />
              <Line x1="0" y1="40" x2="80" y2="40" stroke="#D1D5DB" strokeWidth="2" />
              <Line x1="40" y1="0" x2="40" y2="80" stroke="#D1D5DB" strokeWidth="2" />
              <Line x1="0" y1="20" x2="80" y2="20" stroke="#E5E7EB" strokeWidth="1" />
              <Line x1="0" y1="60" x2="80" y2="60" stroke="#E5E7EB" strokeWidth="1" />
              <Line x1="20" y1="0" x2="20" y2="80" stroke="#E5E7EB" strokeWidth="1" />
              <Line x1="60" y1="0" x2="60" y2="80" stroke="#E5E7EB" strokeWidth="1" />
            </Pattern>
          </Defs>
          
          {/* Map Background */}
          <Rect width="100%" height="100%" fill="url(#streets)" />
          
          {/* Map Grid Overlay */}
          <Rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />
          
          {/* Area blocks to simulate buildings/regions */}
          <Rect x="50" y="80" width="120" height="80" fill="#E8F5E8" stroke="#C6E6C6" strokeWidth="1" rx="4" />
          <Rect x="200" y="120" width="100" height="60" fill="#FFF2E8" stroke="#FFE0C6" strokeWidth="1" rx="4" />
          <Rect x="80" y="200" width="150" height="90" fill="#E8F2FF" stroke="#C6E0FF" strokeWidth="1" rx="4" />
          <Rect x="250" y="50" width="80" height="100" fill="#F8E8FF" stroke="#E6C6FF" strokeWidth="1" rx="4" />
          
          {/* User Location Marker */}
          {userLocation && (() => {
            // Place user marker at center of canvas
            const x = mapWidth / 2 + panOffset.x;
            const y = mapHeight / 2 + panOffset.y;
            return (
              <G>
                {/* User marker shadow */}
                <Circle cx={x + 2} cy={y + 2} r="25" fill="rgba(0,0,0,0.2)" />
                {/* User marker */}
                <Circle cx={x} cy={y} r="25" fill="#1B5EBD" stroke="#FFFFFF" strokeWidth="3" />
                <Circle cx={x} cy={y} r="18" fill="#1B5EBD" />
                {/* User icon placeholder */}
                <Circle cx={x} cy={y} r="8" fill="#FFFFFF" />
              </G>
            );
          })()}
          
          {/* Nearby Match Markers - Background Circles Only */}
          {nearbyMatches.map((match, index) => {
            // Use a simple distribution pattern to ensure markers are visible
            const centerX = mapWidth / 2;
            const centerY = mapHeight / 2;
            const radius = 80; // Distance from center
            const angle = (index * 360 / nearbyMatches.length) * (Math.PI / 180);
            
            const x = centerX + Math.cos(angle) * radius + panOffset.x;
            const y = centerY + Math.sin(angle) * radius + panOffset.y;
            
            return (
              <G key={match.id}>
                {/* Match marker shadow */}
                <Circle cx={x + 2} cy={y + 2} r="30" fill="rgba(0,0,0,0.2)" />
                {/* Match marker background */}
                <Circle 
                  cx={x} 
                  cy={y} 
                  r="30" 
                  fill="#FFFFFF" 
                  stroke="#E0E0E0" 
                  strokeWidth="3"
                />
              </G>
            );
          })}
          

          
        </Svg>
        
        {/* Interactive Match Marker Overlays with Profile Images */}
        {nearbyMatches.map((match, index) => {
          // Calculate the same position as SVG markers
          const centerX = mapWidth / 2;
          const centerY = mapHeight / 2;
          const radius = 80;
          const angle = (index * 360 / nearbyMatches.length) * (Math.PI / 180);
          
          const x = centerX + Math.cos(angle) * radius + panOffset.x;
          const y = centerY + Math.sin(angle) * radius + panOffset.y;
          
          return (
            <TouchableOpacity
              key={`overlay-${match.id}`}
              style={[
                styles.markerOverlay,
                {
                  left: x - 27, // Center the 54x54 marker
                  top: y - 27,
                }
              ]}
              onPress={() => {
                Alert.alert(
                  `💕 ${match.name}`,
                  `Age: ${match.age}\nDistance: ${match.distance}km\nMatch Score: ${match.matchScore}%\nProfession: ${match.profession}\n\n${match.bio}`,
                  [{ text: 'Close', style: 'cancel' }]
                );
              }}
            >
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: match.photo }}
                  style={styles.profileImage}
                  defaultSource={require('../../assets/Frame.png')}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        
        {/* Loading Overlay */}
        {isLoadingLocation && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <Ionicons name="location" size={24} color="#1B5EBD" />
              <Text style={styles.loadingText}>Finding matches near you...</Text>
            </View>
          </View>
        )}

        {/* Map Controls */}
        <TouchableOpacity 
          style={styles.findMatchesBtn}
          onPress={handleCurrentLocationPress}
        >
          <Ionicons name="search" size={20} color="#FFFFFF" />
          <Text style={styles.findMatchesBtnText}>Find Matches</Text>
        </TouchableOpacity>

        {/* Match Stats */}
        <View style={styles.matchStats}>
          <Text style={styles.matchStatsText}>
            {nearbyMatches.length} matches found nearby
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '20%' }]} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add Location</Text>
          <Text style={styles.subtitle}>
            Turn on location to find nearby matches.
            {nearbyMatches.length > 0 && (
              <Text style={styles.matchesFound}> {nearbyMatches.length} matches found!</Text>
            )}
          </Text>

          {/* Canvas Map Container */}
          {renderCanvasMap()}

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 50
  },
  progressContainer: {
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
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
    paddingTop: 20,
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
  map: {
    flex: 1,
  },
  canvasMapContainer: {
    height: 400,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  canvasMap: {
    borderRadius: 15,
  },
  markerOverlay: {
    position: 'absolute',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  profileImageContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  // User location marker
  userLocationMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1B5EBD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  userLocationInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5EBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Profile markers
  profileMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileMarkerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  matchScoreBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Simple control buttons
  findMatchesBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5EBD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  findMatchesBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  matchStats: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  matchStatsText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    textAlign: 'center',
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
    zIndex: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333333',
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
    paddingBottom: 50,
    backgroundColor: '#F5F5F5',
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
  },

});

export default LocationScreen;
