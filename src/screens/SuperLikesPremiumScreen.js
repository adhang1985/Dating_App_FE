import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SuperLikesPremiumScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState('1month');

  const plans = [
    {
      id: '1week',
      duration: '1 Week',
      price: 'INR 149',
      isPopular: false,
    },
    {
      id: '1month',
      duration: '1 month',
      price: 'INR 60',
      priceUnit: '/ week',
      isPopular: true,
    },
    {
      id: '3months',
      duration: '3 months',
      price: 'INR 50',
      priceUnit: '/ week',
      isPopular: false,
    },
  ];

  const benefits = [
    {
      title: 'Top Placement in Feeds',
      description: 'Be the first profile users see in Discover, Likes, and Explore.',
    },
    {
      title: '5x More Profile Views',
      description: 'Increased visibility means more swipes and more potential matches.',
    },
    {
      title: 'Priority in Search Results',
      description: 'Appear higher when users filter by interests, age, or location.',
    },
    {
      title: '30 Minutes of Fame',
      description: 'Stay in the spotlight for half an hour — real-time exposure, real results.',
    },
    {
      title: 'Smart Timing Boost (Optional)',
      description: 'Automatically activate Boost when your ideal audience is most active.',
    },
    {
      title: 'Live Match Surge Tracker',
      description: 'Watch your views, likes, and matches roll in — updated in real time.',
    },
    {
      title: 'Boost Streak Bonus',
      description: 'Boost multiple times in a week to unlock Superlike or Visibility bonuses.',
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleGetSuperLikes = () => {
    const selected = plans.find(plan => plan.id === selectedPlan);
    Alert.alert(
      'Super Likes Activated!', 
      `You've selected the ${selected.duration} plan for ${selected.price}${selected.priceUnit || ''}. Payment integration coming soon!`
    );
  };

  const handleNotNow = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground 
      source={require('../../assets/get_like_bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <ImageBackground 
            source={require('../../assets/get_like_hd.png')}
            style={styles.heroSection}
            imageStyle={styles.heroBackgroundImage}
            resizeMode="cover"
          >
            <Text style={styles.heroTitle}>Turn Up the Heat{'\n'}on Your Profile</Text>
            <View style={styles.lightningContainer}>
              <View style={styles.lightningIcon}>
                <Image 
                  source={require('../../assets/get_like_logo.png')}
                  style={styles.lightningImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ImageBackground>
          <View style={styles.heroDescriptionContainer}>
            <Text style={styles.heroDescription}>
              Your profile, center stage. For the next 30{'\n'}minutes, you're the main event.
            </Text>
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansSection}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.selectedPlanCard
                ]}
                onPress={() => setSelectedPlan(plan.id)}
              >
                <Text style={styles.planDuration}>{plan.duration}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  {plan.priceUnit && (
                    <Text style={styles.priceUnit}>{plan.priceUnit}</Text>
                  )}
                </View>
                {plan.isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Benefits Section */}
          <View style={styles.benefitsSection}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.checkmarkContainer}>
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Bottom Padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.superLikesButton} onPress={handleGetSuperLikes}>
            <Text style={styles.superLikesButtonText}>
              Get Super Likes - {plans.find(p => p.id === selectedPlan)?.price}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
            <Text style={styles.notNowButtonText}>Not Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    marginTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    padding: 30,
    marginBottom: 0,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom: 0
  },
  heroBackgroundImage: {
    borderRadius: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F5132',
    textAlign: 'center'
  },
  lightningContainer: {
    marginBottom: 0
  },
  lightningIcon: {
    width: 90,
    height: 90,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  lightningImage: {
    width: 70,
    height: 70,
  },
  heroDescriptionContainer: {
    paddingHorizontal: 20,
  },
  heroDescription: {
    fontSize: 16,
    color: '#151515',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20
  },
  plansSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    position: 'relative',
  },
  selectedPlanCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  planDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  popularBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  benefitsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkmarkContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
  bottomActions: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginBottom: 20
  },
  superLikesButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  superLikesButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  notNowButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  notNowButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SuperLikesPremiumScreen;