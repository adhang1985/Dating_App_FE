import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BoostPremiumScreen = ({ navigation }) => {
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

  const handleBoostNow = () => {
    const selected = plans.find(plan => plan.id === selectedPlan);
    Alert.alert(
      'Boost Activated!', 
      `You've selected the ${selected.duration} plan for ${selected.price}${selected.priceUnit || ''}. Payment integration coming soon!`
    );
  };

  const handleNotNow = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Turn Up the Heat{'\n'}on Your Profile</Text>
          <View style={styles.lightningContainer}>
            <View style={styles.lightningIcon}>
              <Ionicons name="flash" size={32} color="#D4A574" />
            </View>
          </View>
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
        <TouchableOpacity style={styles.boostButton} onPress={handleBoostNow}>
          <Text style={styles.boostButtonText}>
            Boost Now - {plans.find(p => p.id === selectedPlan)?.price}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
          <Text style={styles.notNowButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 50
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    backgroundColor: '#D4A574',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    marginTop: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 30,
  },
  lightningContainer: {
    marginBottom: 20,
  },
  lightningIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    lineHeight: 22,
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
    borderColor: '#1B5EBD',
    backgroundColor: '#F0F8FF',
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
    marginBottom: 10
  },
  popularBadge: {
    backgroundColor: '#D1FFC3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#000',
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
  },
  boostButton: {
    backgroundColor: '#D4A574',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  boostButtonText: {
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

export default BoostPremiumScreen;