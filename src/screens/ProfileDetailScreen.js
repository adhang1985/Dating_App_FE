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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ProfileDetailScreen = ({ navigation, route }) => {
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  const profile = route?.params?.profile || {
    name: "Amara",
    age: 26,
    image: "https://picsum.photos/400/600?random=1",
    membershipType: "signature",
    isNew: true,
    description: "I am determined and I love to explore new places and meet new people."
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSuperLike = useCallback(() => {
    console.log('Super like pressed');
  }, []);

  const handleLike = useCallback(() => {
    console.log('Like pressed');
  }, []);

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

  const membershipColor = profile.membershipType === 'signature' ? '#1B5EBD' : '#F0B90B';
  const membershipText = profile.membershipType === 'signature' ? 'SIGNATURE' : 'EXECUTIVE';

  return (
    <SafeAreaView style={styles.container}>
      {/* Membership Header Banner */}
      {profile.membershipType && (
        <View style={[styles.membershipHeader, { backgroundColor: membershipColor }]}>
          <Text style={styles.membershipText}>{membershipText}</Text>
        </View>
      )}

      {/* Profile Image Container */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: profile?.image }} 
          style={styles.profileImage}
          onError={(error) => console.log('Profile detail image loading error:', error)}
          onLoad={() => console.log('Profile detail image loaded successfully')}
          resizeMode="cover"
        />
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Profile Info Overlay */}
        <View style={styles.profileOverlay}>
          <View style={styles.profileHeader}>
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
            <Text style={styles.profileSubtitle}>She</Text>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
              <Ionicons name="chatbubble" size={24} color="#1B5EBD" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.superLikeButton} onPress={handleSuperLike}>
              <Ionicons name="star" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
              <Ionicons name="heart" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Description Box */}
      <View style={styles.descriptionContainer}>
        <ScrollView style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {profile?.description || "No description available."}
          </Text>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.notificationBadge}>
            <Ionicons name="chatbubbles" size={24} color="#999" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Profile Actions Modal */}
      <Modal
        visible={showProfileActions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProfileActions(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowProfileActions(false)}
        >
          <View style={styles.actionsModal}>
            <TouchableOpacity style={styles.actionItem}>
              <Ionicons name="share-outline" size={20} color="#333" />
              <Text style={styles.actionText}>Share this Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <Ionicons name="ban-outline" size={20} color="#333" />
              <Text style={styles.actionText}>Block</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => {
                setShowProfileActions(false);
                setShowReportModal(true);
              }}
            >
              <Ionicons name="flag-outline" size={20} color="#333" />
              <Text style={styles.actionText}>Report</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Report User Modal */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reportModal}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowReportModal(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.reportTitle}>Report User</Text>
            <Text style={styles.reportSubtitle}>
              Is this person bothering you? Tell us what they did.
            </Text>
            
            <View style={styles.reportOptions}>
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => handleReport('Inappropriate Photos')}
              >
                <View style={styles.radioButton} />
                <Text style={styles.reportOptionText}>Inappropriate Photos</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => handleReport('Feels like Spam')}
              >
                <View style={styles.radioButton} />
                <Text style={styles.reportOptionText}>Feels like Spam</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => handleReport('User is underage')}
              >
                <View style={styles.radioButton} />
                <Text style={styles.reportOptionText}>User is underage</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => handleReport('Others')}
              >
                <View style={styles.radioButton} />
                <Text style={styles.reportOptionText}>Others</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => handleReport('General')}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
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
  },
  membershipHeader: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  membershipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
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
  },
  profileOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileHeader: {
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
    marginBottom: 5,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  profileSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  superLikeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  descriptionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    maxHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
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
    justifyContent: 'flex-end',
  },
  actionsModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
  },
  reportModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  reportSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  reportOptions: {
    marginBottom: 25,
  },
  reportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 15,
  },
  reportOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileDetailScreen;