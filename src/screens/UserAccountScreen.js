import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserAccountScreen = ({ navigation }) => {
  const [boosts, setBoosts] = useState(0);
  const [superLikes, setSuperLikes] = useState(0);

  const handleGetMoreBoosts = () => {
    navigation.navigate('BoostPremium');
  };

  const handleGetMoreSuperLikes = () => {
    Alert.alert('Get More Super Likes', 'Feature coming soon!');
  };

  const handlePremiumPlan = () => {
    Alert.alert('Premium Plan', 'Upgrade to Premium coming soon!');
  };

  const handleVIPBadge = () => {
    Alert.alert('VIP Badge', 'Get VIP status coming soon!');
  };

  const handleProfileCheckmark = () => {
    navigation.navigate('ProfileVerification');
  };

  const handleYourProfile = () => {
    Alert.alert('Your Profile', 'Profile settings coming soon!');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment settings coming soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'App settings coming soon!');
  };

  const handleHelpCenter = () => {
    Alert.alert('Help Center', 'Help & Support coming soon!');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy coming soon!');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/120/120?random=profile' }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Boosts and Super Likes Row */}
        <View style={styles.statsRow}>
          {/* My Boosts */}
          <TouchableOpacity style={styles.boostsContainer} onPress={handleGetMoreBoosts} activeOpacity={0.8}>
            <View style={styles.statsContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="flash" size={24} color="#FFA500" />
              </View>
              <View style={styles.statsTextContainer}>
                <Text style={styles.statsTitle}>My Boosts</Text>
                <View style={styles.getMoreButton}>
                  <Text style={styles.getMoreText}>GET MORE</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Super Likes */}
          <TouchableOpacity style={styles.superLikesContainer} onPress={handleGetMoreSuperLikes} activeOpacity={0.8}>
            <View style={styles.statsContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="star" size={24} color="#4CAF50" />
              </View>
              <View style={styles.statsTextContainer}>
                <Text style={styles.statsTitle}>{superLikes} Super Likes</Text>
                <View style={styles.getMoreButton}>
                  <Text style={styles.getMoreText}>GET MORE</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Checkmark */}
        <TouchableOpacity style={styles.checkmarkContainer} onPress={handleProfileCheckmark}>
          <View style={styles.checkmarkContent}>
            <View style={styles.checkmarkIcon}>
              <Ionicons name="checkmark-circle" size={32} color="#1B5EBD" />
            </View>
            <View style={styles.checkmarkTextContainer}>
              <Text style={styles.checkmarkTitle}>Profile Checkmark</Text>
              <Text style={styles.checkmarkSubtitle}>Stand out with a trusted badge</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </View>
        </TouchableOpacity>

        {/* Get Premium Plan */}
        <TouchableOpacity style={styles.premiumContainer} onPress={handlePremiumPlan}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumIcon}>
              <Ionicons name="diamond" size={28} color="#FFFFFF" />
            </View>
            <View style={styles.premiumTextContainer}>
              <Text style={styles.premiumTitle}>Get Premium Plan</Text>
              <Text style={styles.premiumSubtitle}>Lorem ipsum es simplemente el</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Get VIP Badge */}
        <TouchableOpacity style={styles.vipContainer} onPress={handleVIPBadge}>
          <View style={styles.vipContent}>
            <View style={styles.vipIcon}>
              <Ionicons name="ribbon" size={28} color="#FFFFFF" />
            </View>
            <View style={styles.vipTextContainer}>
              <Text style={styles.vipTitle}>Get VIP Badge</Text>
              <Text style={styles.vipSubtitle}>Lorem ipsum es simplemente el</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleYourProfile}>
            <View style={styles.menuItemContent}>
              <Ionicons name="person-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Your Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethods}>
            <View style={styles.menuItemContent}>
              <Ionicons name="card-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <View style={styles.menuItemContent}>
              <Ionicons name="settings-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleHelpCenter}>
            <View style={styles.menuItemContent}>
              <Ionicons name="help-circle-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPolicy}>
            <View style={styles.menuItemContent}>
              <Ionicons name="shield-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discovery')}>
          <Ionicons name="home" size={24} color="#FFFFFF" />
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
          <Ionicons name="person" size={24} color="#1B5EBD" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  backButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    left: 20,
    top: 0
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  boostsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
  },
  superLikesContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#73F139',
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#D2FFBD'
  },
  statsTextContainer: {
    flex: 1,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  getMoreButton: {
    alignSelf: 'flex-start',
  },
  getMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  checkmarkContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  checkmarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkIcon: {
    marginRight: 16,
  },
  checkmarkTextContainer: {
    flex: 1,
  },
  checkmarkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  checkmarkSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  premiumContainer: {
    backgroundColor: '#0146AB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumIcon: {
    marginRight: 16,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  vipContainer: {
    backgroundColor: '#FDCB50',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  vipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vipIcon: {
    marginRight: 16,
  },
  vipTextContainer: {
    flex: 1,
  },
  vipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  vipSubtitle: {
    fontSize: 14,
    color: '#000',
    opacity: 0.8,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
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
    top: -8,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default UserAccountScreen;