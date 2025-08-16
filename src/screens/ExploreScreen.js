import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ExploreScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Location');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTabPress = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const locationPoints = [
    { 
      id: 1, 
      distance: '1.7 Km', 
      coordinate: { latitude: 26.9124, longitude: 75.7873 },
      title: 'Location 1'
    },
    { 
      id: 2, 
      distance: '1.2 Km', 
      coordinate: { latitude: 26.9324, longitude: 75.8073 },
      title: 'Location 2'
    },
    { 
      id: 3, 
      distance: '1.6 Km', 
      coordinate: { latitude: 26.8924, longitude: 75.7673 },
      title: 'Location 3'
    },
    { 
      id: 4, 
      distance: '1.8 Km', 
      coordinate: { latitude: 26.9524, longitude: 75.8273 },
      title: 'Location 4'
    },
  ];

  const goalDrivenData = [
    { id: 1, title: 'Goal-driven dating', icon: 'flag-outline', color: '#FF4458', users: 192 },
    { id: 2, title: 'Long-term Partner', icon: 'people-outline', color: '#4F9CF9', users: 192 },
    { id: 3, title: 'Serious Daters', icon: 'diamond-outline', color: '#9B59B6', users: 192 },
    { id: 4, title: 'Free Night', icon: 'moon-outline', color: '#2C3E50', users: 192 },
    { id: 5, title: 'Short-term fun', icon: 'bicycle-outline', color: '#27AE60', users: 192 },
  ];

  const hobbyData = [
    { id: 1, title: 'Travel', icon: 'airplane-outline', color: '#FF9500', users: 192 },
    { id: 2, title: 'Binge Watchers', icon: 'eye-outline', color: '#5856D6', users: 192 },
    { id: 3, title: 'Coffee Date', icon: 'cafe-outline', color: '#FF4458', users: 192 },
    { id: 4, title: 'Sporty', icon: 'football-outline', color: '#34C759', users: 192 },
    { id: 5, title: 'Date Night', icon: 'wine-outline', color: '#FF2D92', users: 192 },
    { id: 6, title: 'Thrill Seekers', icon: 'car-sport-outline', color: '#30D158', users: 192 },
    { id: 7, title: 'Music Lovers', icon: 'musical-notes-outline', color: '#8E8E93', users: 192 },
    { id: 8, title: 'Gamers', icon: 'game-controller-outline', color: '#FF9F0A', users: 192 },
  ];

  const placeData = [
    { id: 1, name: 'Cafe Coffee Day', location: 'Vaishali Nagar, Jaipur', users: 120 },
    { id: 2, name: 'Cafe Coffee Day', location: 'C-Scheme, Jaipur', users: 90 },
    { id: 3, name: 'Cafe Coffee Day', location: 'Raja Park, Jaipur', users: 87 },
    { id: 4, name: 'Cafe Coffee Day', location: 'Vidhydhar Nagar, Jaipur', users: 80 },
    { id: 5, name: 'Cafe Coffee Day', location: 'Lalkothi, Jaipur', users: 80 },
  ];

  const eventsData = [
    { id: 1, name: 'Club Moscow', location: 'Calcutta Farm House Shyamnagar, Jaipur', users: 120 },
    { id: 2, name: 'Jokers The Club', location: 'C-Scheme, Jaipur', users: 90 },
    { id: 3, name: 'Elite Cafe Lounge & Bar', location: 'Raja Park, Jaipur', users: 87 },
    { id: 4, name: 'Ten 11 Lounge Disc & Bar', location: 'Vidhydhar Nagar, Jaipur', users: 80 },
    { id: 5, name: '999 Restro Lounge', location: 'Lalkothi, Jaipur', users: 80 },
  ];

  const renderLocationMap = () => (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 26.9124,
          longitude: 75.7873,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
      >
        {locationPoints.map((point) => (
          <Marker
            key={point.id}
            coordinate={point.coordinate}
            title={`${point.title} - ${point.distance}`}
            description={point.distance}
            pinColor="#1B5EBD"
          />
        ))}
      </MapView>
      {/* Distance Labels Overlay */}
      <View style={styles.mapOverlay}>
        {locationPoints.map((point, index) => (
          <View 
            key={`label-${point.id}`} 
            style={[
              styles.distanceLabel,
              {
                left: `${20 + (index % 2) * 50}%`,
                top: `${30 + Math.floor(index / 2) * 40}%`,
              }
            ]}
          >
            <Text style={styles.distanceLabelText}>{point.distance}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPlaceItem = (item) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
        <Text style={styles.listItemLocation}>{item.location}</Text>
      </View>
      <View style={styles.listItemBadge}>
        <Ionicons name="people-outline" size={12} color="#1B5EBD" />
        <Text style={styles.listItemCount}>{item.users}</Text>
      </View>
    </View>
  );

  const renderEventItem = (item) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
        <Text style={styles.listItemLocation}>{item.location}</Text>
      </View>
      <View style={styles.listItemBadge}>
        <Ionicons name="people-outline" size={12} color="#1B5EBD" />
        <Text style={styles.listItemCount}>{item.users}</Text>
      </View>
    </View>
  );

  const renderDatingGoalCard = (item, index) => (
    <TouchableOpacity 
      key={item.id} 
      style={[
        styles.goalCard,
        index === 0 ? styles.largeGoalCard : styles.smallGoalCard,
        { backgroundColor: item.color }
      ]}
    >
      <View style={styles.goalContent}>
        <View style={styles.goalIconContainer}>
          <Ionicons name={item.icon} size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.goalTitle}>{item.title}</Text>
        <View style={styles.userBadge}>
          <Ionicons name="people-outline" size={10} color="#FFFFFF" />
          <Text style={styles.userCount}>{item.users}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHobbyCard = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={[styles.hobbyCard, { backgroundColor: item.color }]}
    >
      <View style={styles.hobbyContent}>
        <View style={styles.hobbyIconContainer}>
          <Ionicons name={item.icon} size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.hobbyTitle}>{item.title}</Text>
        <View style={styles.hobbyUserBadge}>
          <Ionicons name="people-outline" size={8} color="#FFFFFF" />
          <Text style={styles.hobbyUserCount}>{item.users}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['Location', 'Place', 'Events'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Location / Tab Content Title */}
        <View style={styles.locationSection}>
          <Text style={styles.locationTitle}>
            {activeTab === 'Location' ? 'Jaipur' : 
             activeTab === 'Place' ? 'Cafe Coffee Day' : 'Christmas'}
          </Text>
        </View>

        {/* Tab-specific Content (only top section changes) */}
        {activeTab === 'Location' && (
          <>
            {/* Map View */}
            {renderLocationMap()}
          </>
        )}

        {activeTab === 'Place' && (
          <View style={styles.listSection}>
            {placeData.map((item) => renderPlaceItem(item))}
          </View>
        )}

        {activeTab === 'Events' && (
          <View style={styles.listSection}>
            {eventsData.map((item) => renderEventItem(item))}
          </View>
        )}

        {/* Shared Content - Goal-driven dating section (appears on ALL tabs) */}
        <View style={styles.goalSection}>
          <View style={styles.goalGrid}>
            {goalDrivenData.map((item, index) => 
              renderDatingGoalCard(item, index)
            )}
          </View>
        </View>

        {/* Shared Content - Shared interests section (appears on ALL tabs) */}
        <View style={styles.hobbySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shared interest and hobbies</Text>
            <Text style={styles.sectionSubtitle}>Find people with similar interests and hobbies</Text>
          </View>
          
          <View style={styles.hobbyGrid}>
            {hobbyData.map((item) => renderHobbyCard(item))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discovery')}>
          <Ionicons name="home" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
          <Ionicons name="compass" size={24} color="#1B5EBD" />
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
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 36,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 3,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#1B5EBD',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingBottom: 120,
  },
  locationSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'left',
  },
  mapContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  map: {
    flex: 1,
    borderRadius: 16,
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  distanceLabel: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1B5EBD',
    textAlign: 'center',
  },
  listSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  listItemLocation: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  listItemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listItemCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1B5EBD',
    marginLeft: 4,
  },
  goalSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  largeGoalCard: {
    width: '100%',
    height: 100,
  },
  smallGoalCard: {
    width: (width - 60) / 2,
    height: 90,
  },
  goalContent: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  goalIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 8,
    lineHeight: 18,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  userCount: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 2,
  },
  hobbySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'left',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'left',
    lineHeight: 18,
  },
  hobbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hobbyCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    marginBottom: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  hobbyContent: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 75,
    position: 'relative',
  },
  hobbyIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  hobbyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 6,
    lineHeight: 16,
  },
  hobbyUserBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  hobbyUserCount: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 2,
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
    top: -2,
    right: -2,
    backgroundColor: '#FF4458',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default ExploreScreen;