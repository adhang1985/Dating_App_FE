import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const DiscoveryScreen = ({ navigation }) => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showOutOfLikesModal, setShowOutOfLikesModal] = useState(false);
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [selectedMembership, setSelectedMembership] = useState('signature');
  
  // Filter states
  const [filterLocation, setFilterLocation] = useState('Jaipur');
  const [filterGender, setFilterGender] = useState('Female');
  const [filterAgeRange, setFilterAgeRange] = useState([20, 40]);
  const [filterDistance, setFilterDistance] = useState(20);

  const allProfiles = useMemo(() => [
    {
      id: 1,
      name: "Amara",
      age: 26,
      image: "https://picsum.photos/400/600?random=1",
      membershipType: "signature",
      isNew: true,
      description: "I am determined and I love adventure. Looking for someone who shares my passion for travel and new experiences."
    },
    {
      id: 2,
      name: "Sarah",
      age: 24,
      image: "https://picsum.photos/400/600?random=2",
      membershipType: "executive", 
      isNew: false,
      description: "Love hiking and exploring new places. Coffee enthusiast and weekend warrior."
    },
    {
      id: 3,
      name: "Emma",
      age: 28,
      image: "https://picsum.photos/400/600?random=3",
      membershipType: "signature",
      isNew: true,
      description: "Artist and dreamer. Looking for deep conversations and genuine connections."
    },
    {
      id: 4,
      name: "Jessica",
      age: 25,
      image: "https://picsum.photos/400/600?random=4",
      membershipType: "executive",
      isNew: false,
      description: "Entrepreneur and fitness enthusiast. Love building businesses and staying active."
    },
    {
      id: 5,
      name: "Sophie",
      age: 27,
      image: "https://picsum.photos/400/600?random=5",
      membershipType: "signature",
      isNew: true,
      description: "Teacher and book lover. Looking for someone who appreciates quiet moments and good conversation."
    },
    {
      id: 6,
      name: "Rachel",
      age: 29,
      image: "https://picsum.photos/400/600?random=6",
      membershipType: "executive",
      isNew: false,
      description: "Doctor and traveler. Passionate about helping others and exploring the world."
    }
  ], []);

  // Filter profiles based on selected membership
  const profiles = useMemo(() => {
    return allProfiles.filter(profile => profile.membershipType === selectedMembership);
  }, [allProfiles, selectedMembership]);

  const handleRefresh = useCallback(() => {
    console.log('Refreshing profiles');
    setCurrentProfile(0);
  }, []);

  const handleLike = useCallback(() => {
    console.log('Like pressed');
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1);
    } else {
      setCurrentProfile(0);
    }
  }, [currentProfile, profiles.length]);

  const handleSuperLike = useCallback(() => {
    console.log('Super like pressed');
  }, []);

  const handlePass = useCallback(() => {
    console.log('Pass pressed');
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1);
    } else {
      setCurrentProfile(0);
    }
  }, [currentProfile, profiles.length]);

  const handleProfilePress = useCallback(() => {
    if (profile?.membershipType === 'signature') {
      navigation.navigate('SignatureProfile', { profile });
    } else if (profile?.membershipType === 'executive') {
      navigation.navigate('ExecutiveProfile', { profile });
    } else {
      navigation.navigate('ProfileDetail', { profile });
    }
  }, [navigation, profile]);

  // Filter handlers
  const handleGenderSelect = useCallback((gender) => {
    setFilterGender(gender);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilterLocation('Jaipur');
    setFilterGender('Female');
    setFilterAgeRange([20, 40]);
    setFilterDistance(20);
  }, []);

  const handleApplyFilters = useCallback(() => {
    const filters = {
      location: filterLocation,
      gender: filterGender,
      ageRange: filterAgeRange,
      distance: filterDistance
    };
    console.log('Applying filters:', filters);
    setShowFiltersModal(false);
  }, [filterLocation, filterGender, filterAgeRange, filterDistance]);

  const handleAgeRangeChange = useCallback((type, increment = true) => {
    if (type === 'min') {
      const newMin = increment ? 
        Math.min(filterAgeRange[1] - 1, filterAgeRange[0] + 1) : 
        Math.max(18, filterAgeRange[0] - 1);
      setFilterAgeRange([newMin, filterAgeRange[1]]);
    } else {
      const newMax = increment ? 
        Math.min(65, filterAgeRange[1] + 1) : 
        Math.max(filterAgeRange[0] + 1, filterAgeRange[1] - 1);
      setFilterAgeRange([filterAgeRange[0], newMax]);
    }
  }, [filterAgeRange]);

  const handleDistanceChange = useCallback((increment = true) => {
    const newDistance = increment ? 
      Math.min(100, filterDistance + 5) : 
      Math.max(5, filterDistance - 5);
    setFilterDistance(newDistance);
  }, [filterDistance]);

  const handleFiltersPress = useCallback(() => {
    setShowFiltersModal(true);
  }, []);

  const handleMembershipFilter = useCallback((membershipType) => {
    if (membershipType !== selectedMembership) {
      setSelectedMembership(membershipType);
      setCurrentProfile(0);
    }
  }, [selectedMembership]);

  const handleChat = useCallback(() => {
    console.log('Chat pressed');
  }, []);

  const safeCurrentProfile = Math.min(currentProfile, profiles.length - 1);
  const profile = useMemo(() => {
    return profiles[safeCurrentProfile] || profiles[0];
  }, [profiles, safeCurrentProfile]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleRefresh}>
          <Ionicons name="refresh-outline" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outOfLikesButton} onPress={() => setShowOutOfLikesModal(true)}>
          <Text style={styles.outOfLikesText}>Out of Likes for now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton} onPress={handleFiltersPress}>
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Profile Card */}
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.profileCard} onPress={handleProfilePress}>
            {/* Profile Image */}
            <Image 
              source={{ uri: profile?.image }} 
              style={styles.profileImage}
              onError={(error) => console.log('Image loading error:', error)}
              onLoad={() => console.log('Image loaded successfully')}
              resizeMode="cover"
            />
            
            {/* Membership Tabs Overlay on Image */}
            <View style={styles.membershipTabsOverlay}>
              <TouchableOpacity 
                style={[
                  styles.membershipTab, 
                  styles.signatureTab,
                  selectedMembership === 'signature' && styles.activeTab
                ]}
                onPress={() => {
                  handleMembershipFilter('signature');
                  if (profiles.length > 0) {
                    const signatureProfile = profiles.find(p => p.membershipType === 'signature') || profiles[0];
                    navigation.navigate('SignatureProfile', { profile: signatureProfile });
                  }
                }}
              >
                <Text style={styles.membershipTabText}>SIGNATURE</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.membershipTab, 
                  styles.executiveTab,
                  selectedMembership === 'executive' && styles.activeTab
                ]}
                onPress={() => {
                  handleMembershipFilter('executive');
                  if (profiles.length > 0) {
                    const executiveProfile = profiles.find(p => p.membershipType === 'executive') || profiles[0];
                    navigation.navigate('ExecutiveProfile', { profile: executiveProfile });
                  }
                }}
              >
                <Text style={styles.membershipTabText}>EXECUTIVE</Text>
              </TouchableOpacity>
            </View>
            
            {/* Profile Info Overlay */}
            <View style={styles.profileOverlay}>
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  {profile?.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>New Here</Text>
                    </View>
                  )}
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.profileName}>{profile?.name}, {profile?.age}</Text>
                  <Ionicons name="checkmark-circle" size={20} color="#87CEEB" style={styles.verifiedIcon} />
                </View>
              </View>
            </View>
            
            {/* Action Buttons - Positioned at bottom corners */}
            <TouchableOpacity style={styles.chatButtonBottom} onPress={handleChat}>
              <Ionicons name="chatbubble" size={24} color="#1B5EBD" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.starButtonBottom} onPress={handleSuperLike}>
              <Ionicons name="star" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discovery')}>
          <Ionicons name="home" size={24} color="#1B5EBD" />
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
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Out of Likes Modal */}
      <Modal
        visible={showOutOfLikesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOutOfLikesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.outOfLikesModalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowOutOfLikesModal(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            <View style={styles.heartIcon}>
              <Ionicons name="heart" size={32} color="#87CEEB" />
            </View>
            
            <Text style={styles.modalTitle}>You're Out of Likes for Now</Text>
            <Text style={styles.modalSubtitle}>
              You've hit your daily limit.{'\n'}Come back later or upgrade for unlimited likes.
            </Text>
            
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade Now.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filters Modal */}
      <Modal
        visible={showFiltersModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFiltersModal(false)}
      >
        <View style={styles.filtersModalOverlay}>
          <View style={styles.filtersModal}>
            <View style={styles.filtersHeader}>
              <TouchableOpacity onPress={() => setShowFiltersModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.filtersTitle}>Filters</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <ScrollView 
              style={styles.filtersContent}
              contentContainerStyle={styles.filtersScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Location</Text>
                <View style={styles.locationInput}>
                  <TextInput
                    style={styles.locationText}
                    value={filterLocation}
                    onChangeText={setFilterLocation}
                    placeholder="Enter location"
                    placeholderTextColor="#999"
                  />
                  <Ionicons name="location-outline" size={20} color="#666" />
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Gender</Text>
                <View style={styles.genderOptions}>
                  <TouchableOpacity 
                    style={[styles.genderOption, filterGender === 'Female' && styles.selectedGender]}
                    onPress={() => handleGenderSelect('Female')}
                  >
                    <Text style={[styles.genderText, filterGender === 'Female' && styles.selectedGenderText]}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.genderOption, filterGender === 'Male' && styles.selectedGender]}
                    onPress={() => handleGenderSelect('Male')}
                  >
                    <Text style={[styles.genderText, filterGender === 'Male' && styles.selectedGenderText]}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.genderOption, filterGender === 'Others' && styles.selectedGender]}
                    onPress={() => handleGenderSelect('Others')}
                  >
                    <Text style={[styles.genderText, filterGender === 'Others' && styles.selectedGenderText]}>Others</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <View style={styles.filterHeaderRow}>
                  <Text style={styles.filterLabel}>Age</Text>
                  <Text style={styles.rangeValue}>{filterAgeRange[0]}-{filterAgeRange[1]}</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>Min Age: {filterAgeRange[0]}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={18}
                    maximumValue={filterAgeRange[1] - 1}
                    value={filterAgeRange[0]}
                    onValueChange={(value) => setFilterAgeRange([Math.round(value), filterAgeRange[1]])}
                    minimumTrackTintColor="#1B5EBD"
                    maximumTrackTintColor="#E0E0E0"
                    thumbStyle={styles.sliderThumb}
                    trackStyle={styles.sliderTrack}
                  />
                  <Text style={styles.sliderLabel}>Max Age: {filterAgeRange[1]}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={filterAgeRange[0] + 1}
                    maximumValue={65}
                    value={filterAgeRange[1]}
                    onValueChange={(value) => setFilterAgeRange([filterAgeRange[0], Math.round(value)])}
                    minimumTrackTintColor="#1B5EBD"
                    maximumTrackTintColor="#E0E0E0"
                    thumbStyle={styles.sliderThumb}
                    trackStyle={styles.sliderTrack}
                  />
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <View style={styles.filterHeaderRow}>
                  <Text style={styles.filterLabel}>Distance</Text>
                  <Text style={styles.rangeValue}>{filterDistance}km</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={5}
                    maximumValue={100}
                    value={filterDistance}
                    onValueChange={(value) => setFilterDistance(Math.round(value))}
                    minimumTrackTintColor="#1B5EBD"
                    maximumTrackTintColor="#E0E0E0"
                    thumbStyle={styles.sliderThumb}
                    trackStyle={styles.sliderTrack}
                  />
                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabelText}>5km</Text>
                    <Text style={styles.sliderLabelText}>100km</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.filterBottomActions}>
                <TouchableOpacity style={styles.resetFilterButton} onPress={handleResetFilters}>
                  <Text style={styles.resetFilterText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyFilterButton} onPress={handleApplyFilters}>
                  <Text style={styles.applyFilterText}>Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  outOfLikesButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  outOfLikesText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  signatureTab: {
    backgroundColor: '#1B5EBD',
  },
  executiveTab: {
    backgroundColor: '#F0B90B',
  },
  membershipTabsOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  membershipTab: {
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    opacity: 0.7,
  },
  activeTab: {
    opacity: 1,
  },
  membershipTabText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 120
  },
  profileCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileInfo: {
    marginBottom: 15,
  },
  nameRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  newBadge: {
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chatButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonBottom: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
  },
  starButtonBottom: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4458',
    justifyContent: 'center',
    alignItems: 'center',
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
    top: -5,
    right: -5,
    backgroundColor: '#FF4458',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  outOfLikesModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  heartIcon: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  upgradeButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Filters Modal Styles
  filtersModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxHeight: height * 0.8,
    minHeight: height * 0.6,
    width: width * 0.9,
    paddingTop: 5,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5EBD',
  },
  filtersContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  filtersScrollContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  filterSection: {
    marginVertical: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  filterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rangeValue: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  selectedGender: {
    backgroundColor: '#1B5EBD',
    borderColor: '#1B5EBD',
  },
  genderText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  selectedGenderText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  customSlider: {
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#1B5EBD',
    borderRadius: 2,
    position: 'absolute',
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#1B5EBD',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  filterBottomActions: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    gap: 15,
  },
  resetFilterButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  resetFilterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  applyFilterButton: {
    flex: 1,
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyFilterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sliderContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#1B5EBD',
    width: 20,
    height: 20,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 5,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default DiscoveryScreen;