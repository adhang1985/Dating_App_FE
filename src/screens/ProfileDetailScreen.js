import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  StatusBar,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ProfileDetailScreen = ({ navigation, route }) => {
  const { profile, membershipType = 'common' } = route?.params || {};
  
  // Sample profile data based on the image - memoized to prevent recreation
  const profileData = useMemo(() => profile || {
    id: 1,
    name: "Amara",
    age: 26,
    image: "https://picsum.photos/400/600?random=1",
    membershipType: "signature",
    isVerified: true,
    isNew: true,
    description: "I am disciplined and I have strong values which help me to think on sensible way.",
    philosophy: "The hallmark of a good relationship is Communication on comprehension, mutual respect, openness and room of freedom.",
    interests: ["MBOU", "Joyful", "Interior Designer", "Life Partner", "Monogamy"],
    profession: "Interior Designer",
    education: "MBOU",
    relationshipGoal: "Life Partner",
    music: ["Music"],
    games: ["Games"],
    books: ["Books"],
    photography: ["Photography"],
    location: "2 km away"
  }, [profile]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const modalScaleAnim = useRef(new Animated.Value(0)).current;
  const optionsModalAnim = useRef(new Animated.Value(0)).current;
  const reportModalAnim = useRef(new Animated.Value(0)).current;

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Stop all animations when component unmounts
      scaleAnim.stopAnimation();
      modalScaleAnim.stopAnimation();
      optionsModalAnim.stopAnimation();
      reportModalAnim.stopAnimation();
    };
  }, [scaleAnim, modalScaleAnim, optionsModalAnim, reportModalAnim]);

  const membershipColors = useMemo(() => ({
    common: {
      primary: '#6C757D',
      secondary: '#ADB5BD',
      badge: '#28A745'
    },
    signature: {
      primary: '#1B5EBD',
      secondary: '#4A90E2',
      badge: '#FD7E14'
    },
    executive: {
      primary: '#6F42C1',
      secondary: '#8A63D2',
      badge: '#DC3545'
    }
  }), []);

  const currentMembershipColors = useMemo(() => 
    membershipColors[membershipType] || membershipColors.common,
    [membershipColors, membershipType]
  );

  const handleLike = useCallback(() => {
    // Simplified animation to prevent performance issues
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
    
    // Show match modal with simplified animation
    setShowMatchModal(true);
    Animated.timing(modalScaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, modalScaleAnim]);

  const handleDislike = useCallback(() => {
    // Handle dislike logic
  }, []);

  const handleSuperLike = useCallback(() => {
    // Handle super like logic
  }, []);

  const handleMessage = useCallback(() => {
    // Handle message logic
  }, []);

  const handleSendMessage = useCallback(() => {
    setShowMatchModal(false);
    // Reset modal animation
    modalScaleAnim.setValue(0);
    
    // Create chat object compatible with ChatDetailScreen
    const chatData = {
      id: profileData.id || Date.now(),
      name: profileData.name,
      lastMessage: '',
      time: 'now',
      unreadCount: 0,
      image: profileData.image,
      isOnline: true,
      isTyping: false,
    };
    
    // Navigate to chat
    navigation.navigate('ChatDetail', { chat: chatData });
  }, [modalScaleAnim, navigation, profileData]);

  const closeModal = useCallback(() => {
    Animated.timing(modalScaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowMatchModal(false);
    });
  }, [modalScaleAnim]);

  const handleOptionsPress = useCallback(() => {
    setShowOptionsModal(true);
    Animated.timing(optionsModalAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [optionsModalAnim]);

  const closeOptionsModal = useCallback(() => {
    Animated.timing(optionsModalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowOptionsModal(false);
    });
  }, [optionsModalAnim]);

  const handleReportPress = useCallback(() => {
    // Close options modal first
    Animated.timing(optionsModalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowOptionsModal(false);
    });
    
    // Open report modal after delay
    setTimeout(() => {
      setShowReportModal(true);
      Animated.timing(reportModalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 300);
  }, [optionsModalAnim, reportModalAnim]);

  const closeReportModal = useCallback(() => {
    Animated.timing(reportModalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowReportModal(false);
      setSelectedReportReason('');
    });
  }, [reportModalAnim]);

  const handleReportSubmit = useCallback(() => {
    // Handle report submission
    console.log('Report submitted:', selectedReportReason);
    
    // Close report modal
    Animated.timing(reportModalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowReportModal(false);
      setSelectedReportReason('');
    });
  }, [selectedReportReason, reportModalAnim]);

  const handleShareProfile = useCallback(() => {
    // Handle share profile
    console.log('Share profile');
    
    // Close options modal
    Animated.timing(optionsModalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowOptionsModal(false);
    });
  }, [optionsModalAnim]);

  const handleBlockUser = useCallback(() => {
    // Handle block user
    console.log('Block user');
    
    // Close options modal
    Animated.timing(optionsModalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowOptionsModal(false);
    });
  }, [optionsModalAnim]);

  const handleProfile = useCallback(() => {
    // Handle profile action
  }, []);

  // Navigation callbacks
  const navigateToDiscovery = useCallback(() => navigation.navigate('Discovery'), [navigation]);
  const navigateToExplore = useCallback(() => navigation.navigate('Explore'), [navigation]);
  const navigateToMatches = useCallback(() => navigation.navigate('Matches'), [navigation]);
  const navigateToChatList = useCallback(() => navigation.navigate('ChatList'), [navigation]);
  const navigateBack = useCallback(() => navigation.goBack(), [navigation]);

  const membershipBadge = useMemo(() => {
    if (!profileData.membershipType || profileData.membershipType === 'common') return null;
    
    return (
      <View style={[styles.membershipBadge, { backgroundColor: currentMembershipColors.badge }]}>
        <Text style={styles.membershipBadgeText}>
          {profileData.membershipType.toUpperCase()}
        </Text>
      </View>
    );
  }, [profileData.membershipType, currentMembershipColors]);

  const verificationBadge = useMemo(() => {
    if (!profileData.isVerified) return null;
    
    return (
      <View style={styles.verificationBadge}>
        <Ionicons name="checkmark-circle" size={20} color="#28A745" />
      </View>
    );
  }, [profileData.isVerified]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleOptionsPress}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Main Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: profileData.image }} style={styles.profileImage} />
          
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            style={styles.gradientOverlay}
          />
          
          {/* Top Gradient for Name */}
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
            style={styles.topGradientOverlay}
          />
          
          {/* Membership Type Header */}
          <View style={styles.membershipHeaderContainer}>
            <Text style={styles.membershipHeaderText}>
              {profileData.membershipType ? profileData.membershipType.toUpperCase() : ''}
            </Text>
          </View>
          
          {/* User Name at Top */}
          <View style={styles.topNameOverlay}>
            <Text style={styles.topNameText}>{profileData.name}, {profileData.age}</Text>
            <View style={styles.topBadgeContainer}>
              {verificationBadge}
              {profileData.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons - Centered at Bottom */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.messageButton]} 
              onPress={handleMessage}
            >
              <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.superLikeButton]} 
                onPress={handleSuperLike}
              >
                <Ionicons name="star" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.likeButton]} 
              onPress={handleLike}
            >
              <Ionicons name="heart" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{profileData.description}</Text>
        </View>

        {/* Small Cards Section */}
        <View style={styles.smallCardsContainer}>
          <View style={styles.smallCardsRow}>
            <View style={styles.smallCard}>
              <Ionicons name="briefcase" size={20} color="#666" />
              <Text style={styles.smallCardText}>MBOU</Text>
            </View>
            <View style={styles.smallCard}>
              <Ionicons name="happy" size={20} color="#666" />
              <Text style={styles.smallCardText}>Joyful</Text>
            </View>
            <View style={styles.smallCard}>
              <Ionicons name="home" size={20} color="#666" />
              <Text style={styles.smallCardText}>Interior Designer</Text>
            </View>
            <View style={styles.smallCard}>
              <Ionicons name="search" size={20} color="#666" />
              <Text style={styles.smallCardText}>Life Partner</Text>
            </View>
          </View>
          <View style={styles.smallCardsRow}>
            <View style={styles.smallCard}>
              <Ionicons name="people" size={20} color="#666" />
              <Text style={styles.smallCardText}>Monogamy</Text>
            </View>
            <View style={styles.smallCard}>
              <Ionicons name="musical-notes" size={20} color="#666" />
              <Text style={styles.smallCardText}>Music</Text>
            </View>
            <View style={styles.smallCard}>
              <Ionicons name="game-controller" size={20} color="#666" />
              <Text style={styles.smallCardText}>Games</Text>
            </View>
            <View style={styles.smallCard}>
              <Ionicons name="library" size={20} color="#666" />
              <Text style={styles.smallCardText}>Books</Text>
            </View>
          </View>
        </View>



        {/* Secondary Profile Card */}
        <View style={styles.secondaryCard}>
          <Image 
            source={{ uri: "https://picsum.photos/400/600?random=2" }} 
            style={styles.secondaryCardImage} 
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.secondaryCardGradient}
          />
          <View style={styles.secondaryCardContent}>
            <Text style={styles.secondaryCardTitle}>Get Someone who looks at you like</Text>
          </View>
        </View>

        {/* Interest Tags */}
        <View style={styles.interestSection}>
          <View style={styles.interestRow}>
            <View style={styles.interestCategory}>
              <Ionicons name="briefcase" size={16} color="#666" />
              <Text style={styles.interestCategoryLabel}>MBOU</Text>
            </View>
            <View style={styles.interestCategory}>
              <Ionicons name="happy" size={16} color="#666" />
              <Text style={styles.interestCategoryLabel}>Joyful</Text>
            </View>
          </View>
          
          <View style={styles.interestRow}>
            <View style={styles.interestCategory}>
              <Ionicons name="home" size={16} color="#666" />
              <Text style={styles.interestCategoryLabel}>Interior Designer</Text>
            </View>
          </View>
          
          <View style={styles.interestRow}>
            <View style={styles.interestCategory}>
              <Ionicons name="search" size={16} color="#666" />
              <Text style={styles.interestCategoryLabel}>Life Partner</Text>
            </View>
          </View>
          
          <View style={styles.interestRow}>
            <View style={styles.interestCategory}>
              <Ionicons name="people" size={16} color="#666" />
              <Text style={styles.interestCategoryLabel}>Monogamy</Text>
            </View>
          </View>
        </View>

        {/* Philosophy Quote */}
        <View style={styles.philosophyContainer}>
          <Text style={styles.philosophyText}>{profileData.philosophy}</Text>
        </View>

        {/* Third Profile Card */}
        <View style={styles.thirdCard}>
          <Image 
            source={{ uri: "https://picsum.photos/400/600?random=3" }} 
            style={styles.thirdCardImage} 
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.thirdCardGradient}
          />
          <View style={styles.thirdCardContent}>
            <Text style={styles.thirdCardSubtitle}>Lorem Ipsum has been the industry's standard dummy.</Text>
            <Text style={styles.thirdCardTitle}>Get Someone who looks at you like</Text>
          </View>
        </View>

        {/* Additional Interest Categories */}
        <View style={styles.additionalInterests}>
          <View style={styles.interestCategoryRow}>
            <View style={styles.interestCategoryItem}>
              <Ionicons name="musical-notes" size={20} color="#666" />
              <Text style={styles.interestCategoryItemText}>Music</Text>
            </View>
            <View style={styles.interestCategoryItem}>
              <Ionicons name="game-controller" size={20} color="#666" />
              <Text style={styles.interestCategoryItemText}>Games</Text>
            </View>
          </View>
          
          <View style={styles.interestCategoryRow}>
            <View style={styles.interestCategoryItem}>
              <Ionicons name="library" size={20} color="#666" />
              <Text style={styles.interestCategoryItemText}>Books</Text>
            </View>
            <View style={styles.interestCategoryItem}>
              <Ionicons name="camera" size={20} color="#666" />
              <Text style={styles.interestCategoryItemText}>Photography</Text>
            </View>
          </View>
        </View>

        {/* Bottom Padding for fixed navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToDiscovery}>
          <Ionicons name="home" size={24} color="#1B5EBD" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToExplore}>
          <Ionicons name="compass" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToMatches}>
          <Ionicons name="heart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToChatList}>
          <View style={styles.notificationBadge}>
            <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserAccount')}>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Match Modal */}
      <Modal
        visible={showMatchModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: modalScaleAnim }]
              }
            ]}
          >
            <Text style={styles.modalTitle}>You and {profileData.name} Liked{'\n'}each other!</Text>
            
            {/* Profile Images */}
            <View style={styles.profileImagesContainer}>
              <View style={styles.leftImageContainer}>
                <Image 
                  source={{ uri: "https://picsum.photos/200/200?random=user" }} 
                  style={styles.modalProfileImage} 
                />
              </View>
              
              <View style={styles.heartIconContainer}>
                <View style={styles.heartIconBackground}>
                  <Ionicons name="heart" size={24} color="#FFFFFF" />
                </View>
              </View>
              
              <View style={styles.rightImageContainer}>
                <Image 
                  source={{ uri: profileData.image }} 
                  style={styles.modalProfileImage} 
                />
              </View>
            </View>
            
            <Text style={styles.matchTitle}>It's a Match</Text>
            <Text style={styles.matchSubtitle}>Start Conversation now to each other.</Text>
            
            <TouchableOpacity 
              style={styles.sendMessageButton}
              onPress={handleSendMessage}
            >
              <View style={styles.sendMessageButtonContent}>
                <Ionicons name="send" size={20} color="#FFFFFF" style={styles.sendIcon} />
                <Text style={styles.sendMessageText}>Send Message</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Options Modal */}
      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeOptionsModal}
      >
        <TouchableOpacity 
          style={styles.optionsModalOverlay}
          activeOpacity={1}
          onPress={closeOptionsModal}
        >
          <Animated.View 
            style={[
              styles.optionsModalContainer,
              {
                transform: [{ translateY: optionsModalAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0]
                }) }]
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleShareProfile}
            >
              <Ionicons name="share-outline" size={24} color="#333333" />
              <Text style={styles.optionText}>Share this Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleBlockUser}
            >
              <Ionicons name="ban-outline" size={24} color="#333333" />
              <Text style={styles.optionText}>Block</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleReportPress}
            >
              <Ionicons name="flag-outline" size={24} color="#333333" />
              <Text style={styles.optionText}>Report</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Report User Modal */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeReportModal}
      >
        <View style={styles.reportModalOverlay}>
          <Animated.View 
            style={[
              styles.reportModalContainer,
              {
                transform: [{ scale: reportModalAnim }]
              }
            ]}
          >
            <View style={styles.reportModalHeader}>
              <Text style={styles.reportModalTitle}>Report User</Text>
              <TouchableOpacity onPress={closeReportModal}>
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.reportModalSubtitle}>
              Is this person bothering you? Tell us what they did.
            </Text>
            
            <View style={styles.reportOptionsContainer}>
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => setSelectedReportReason('inappropriate_photos')}
              >
                <View style={[
                  styles.radioButton,
                  selectedReportReason === 'inappropriate_photos' && styles.radioButtonSelected
                ]}>
                  {selectedReportReason === 'inappropriate_photos' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.reportOptionText}>Inappropriate Photos</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => setSelectedReportReason('feels_like_spam')}
              >
                <View style={[
                  styles.radioButton,
                  selectedReportReason === 'feels_like_spam' && styles.radioButtonSelected
                ]}>
                  {selectedReportReason === 'feels_like_spam' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.reportOptionText}>Feels like Spam</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => setSelectedReportReason('user_underage')}
              >
                <View style={[
                  styles.radioButton,
                  selectedReportReason === 'user_underage' && styles.radioButtonSelected
                ]}>
                  {selectedReportReason === 'user_underage' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.reportOptionText}>User is underage</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reportOption}
                onPress={() => setSelectedReportReason('others')}
              >
                <View style={[
                  styles.radioButton,
                  selectedReportReason === 'others' && styles.radioButtonSelected
                ]}>
                  {selectedReportReason === 'others' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.reportOptionText}>Others</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.reportSubmitButton,
                !selectedReportReason && styles.reportSubmitButtonDisabled
              ]}
              onPress={handleReportSubmit}
              disabled={!selectedReportReason}
            >
              <Text style={[
                styles.reportSubmitText,
                !selectedReportReason && styles.reportSubmitTextDisabled
              ]}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  profileCard: {
    width: width,
    height: height * 0.75,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  topGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  membershipHeaderContainer: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  membershipHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  topNameOverlay: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topBadgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  membershipBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membershipBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verificationBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  newBadge: {
    backgroundColor: '#28A745',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  superLikeButton: {
    backgroundColor: '#28A745',
    bottom: 80,
  },
  messageButton: {
    backgroundColor: '#4A90E2',
  },
  likeButton: {
    backgroundColor: '#FF4458',
  },
  dislikeButton: {
    backgroundColor: '#DC3545',
  },
  profileButton: {
    backgroundColor: '#FFFFFF',
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'center',
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
    fontWeight: 'bold',
  },
  secondaryCard: {
    width: width - 40,
    height: 200,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  secondaryCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  secondaryCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  secondaryCardContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  secondaryCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  interestSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  interestRow: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 15,
  },
  interestCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    gap: 8,
  },
  interestCategoryLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  philosophyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  philosophyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  thirdCard: {
    width: width - 40,
    height: 250,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  thirdCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thirdCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  thirdCardContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  thirdCardSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  thirdCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  additionalInterests: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  interestCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  interestCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    gap: 10,
  },
  interestCategoryItemText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  interestTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  interestTagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
  smallCardsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  smallCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  smallCard: {
    width: (width - 80) / 4,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  smallCardText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  // Match Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#E8F4FD',
    borderRadius: 20,
    padding: 30,
    width: width - 60,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  profileImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  leftImageContainer: {
    position: 'relative',
    zIndex: 1,
  },
  rightImageContainer: {
    position: 'relative',
    zIndex: 1,
  },
  modalProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  heartIconContainer: {
    position: 'absolute',
    zIndex: 2,
    left: '50%',
    marginLeft: -20,
  },
  heartIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  matchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  matchSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  sendMessageButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
  },
  sendMessageButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    marginRight: 10,
  },
  sendMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Options Modal Styles
  optionsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  optionsModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
    fontWeight: '500',
  },
  // Report Modal Styles
  reportModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  reportModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 350,
  },
  reportModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reportModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  reportModalSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 25,
    lineHeight: 20,
  },
  reportOptionsContainer: {
    marginBottom: 30,
  },
  reportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4A90E2',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
  },
  reportOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  reportSubmitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  reportSubmitButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  reportSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  reportSubmitTextDisabled: {
    color: '#999999',
  },
});

export default React.memo(ProfileDetailScreen);