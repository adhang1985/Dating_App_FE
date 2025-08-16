import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const ExecutiveProfileScreen = ({ navigation, route }) => {
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  
  // Filter states
  const [filterLocation, setFilterLocation] = useState('Jaipur');
  const [filterGender, setFilterGender] = useState('Female');
  const [filterAgeRange, setFilterAgeRange] = useState([20, 40]);
  const [filterDistance, setFilterDistance] = useState(20);
  
  const profile = route?.params?.profile || {
    name: "Amara",
    age: 26,
    image: "https://picsum.photos/400/600?random=1",
    membershipType: "executive",
    isNew: true,
    description: "Marketing professional who loves art galleries and weekend hiking. Looking for genuine connections and meaningful conversations."
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLike = useCallback(() => {
    console.log('Like pressed');
  }, []);

  const handleSuperLike = useCallback(() => {
    console.log('Super like pressed');
  }, []);

  const handleFiltersPress = useCallback(() => {
    setShowFiltersModal(true);
  }, []);

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

  const handleChat = useCallback(() => {
    console.log('Chat pressed');
  }, []);

  const handleMenuPress = useCallback(() => {
    setShowProfileActions(true);
  }, []);

  const handleReport = useCallback((reason) => {
    console.log('Report submitted:', reason);
    setShowReportModal(false);
    setShowProfileActions(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outOfLikesButton}>
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
          <View style={styles.profileCard}>
            {/* Executive Header Banner */}
            <View style={styles.executiveHeader}>
              <Text style={styles.executiveText}>EXECUTIVE</Text>
            </View>

            {/* Profile Image */}
            <Image 
              source={{ uri: profile?.image }} 
              style={styles.profileImage}
              onError={(error) => console.log('Executive profile image loading error:', error)}
              onLoad={() => console.log('Executive profile image loaded successfully')}
              resizeMode="cover"
            />
            
            {/* Profile Info Overlay */}
            <View style={styles.profileOverlay}>
              <View style={styles.profileHeader}>
                {profile?.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New Here</Text>
                  </View>
                )}
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
          </View>
        </View>
      </View>



      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
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
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Actions Modal */}
      <Modal
        visible={showProfileActions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProfileActions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileActionsModal}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => {
                setShowProfileActions(false);
                console.log('Share profile');
              }}
            >
              <Ionicons name="share-outline" size={24} color="#333" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => {
                setShowProfileActions(false);
                console.log('Block user');
              }}
            >
              <Ionicons name="ban-outline" size={24} color="#FF4458" />
              <Text style={[styles.actionText, { color: '#FF4458' }]}>Block</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => {
                setShowProfileActions(false);
                setShowReportModal(true);
              }}
            >
              <Ionicons name="flag-outline" size={24} color="#FF4458" />
              <Text style={[styles.actionText, { color: '#FF4458' }]}>Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionItem, styles.cancelAction]}
              onPress={() => setShowProfileActions(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reportModal}>
            <Text style={styles.reportTitle}>Report User</Text>
            <Text style={styles.reportSubtitle}>Why are you reporting this user?</Text>
            
            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleReport('Inappropriate Photos')}
            >
              <Text style={styles.reportOptionText}>Inappropriate Photos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleReport('Fake Profile')}
            >
              <Text style={styles.reportOptionText}>Fake Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleReport('Harassment')}
            >
              <Text style={styles.reportOptionText}>Harassment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleReport('User is underage')}
            >
              <Text style={styles.reportOptionText}>User is underage</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.reportOption, styles.cancelReportOption]}
              onPress={() => setShowReportModal(false)}
            >
              <Text style={styles.cancelReportText}>Cancel</Text>
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
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 120,
  },
  profileCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  executiveHeader: {
    backgroundColor: '#F0B90B',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  executiveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  newBadge: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  profileHeader: {
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  profileDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.9,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 50,
    height: 50,
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
  heartButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4458',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileActionsModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  actionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  cancelAction: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    width: '100%',
  },
  reportModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: width * 0.85,
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  reportSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  reportOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reportOptionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelReportOption: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  cancelReportText: {
    fontSize: 16,
    color: '#666',
  },
  // Filters Modal Styles
  filtersModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
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

export default ExecutiveProfileScreen;