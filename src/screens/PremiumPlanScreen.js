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

const PremiumPlanScreen = ({ navigation }) => {
  const [selectedTier, setSelectedTier] = useState('Plus');
  const [selectedPlan, setSelectedPlan] = useState('1month');

  const tiers = [
    { id: 'Basic', title: 'Basic', background: require('../../assets/prem_basic_bg.png') },
    { id: 'Plus', title: 'Plus', background: require('../../assets/prem_plus_bg.png') },
    { id: 'Pro', title: 'Pro', background: require('../../assets/prem_pro_bg.png') },
  ];

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
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleGetPremium = () => {
    const selected = plans.find(plan => plan.id === selectedPlan);
    Alert.alert(
      'Premium Plan Activated!', 
      `You've selected ${selectedTier} ${selected.duration} plan for ${selected.price}${selected.priceUnit || ''}. Payment integration coming soon!`
    );
  };

  const handleNotNow = () => {
    navigation.goBack();
  };

  const getCurrentBackground = () => {
    const tier = tiers.find(t => t.id === selectedTier);
    return tier ? tier.background : tiers[1].background;
  };

  return (
    <ImageBackground 
      source={require('../../assets/get_prem_bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <ImageBackground 
            source={require('../../assets/get_prem_hd.png')}
            style={styles.heroSection}
            imageStyle={styles.heroBackgroundImage}
            resizeMode="cover"
          >
            <Text style={styles.heroTitle}>Find the one who{'\n'}truly gets you</Text>
            <View style={styles.diamondContainer}>
              <View style={styles.diamondIcon}>
                <Image 
                  source={require('../../assets/get_prem_logo.png')}
                  style={styles.diamondImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ImageBackground>

          {/* Tier Selection */}
          <View style={styles.tierSection}>
            {tiers.map((tier) => (
              <TouchableOpacity
                key={tier.id}
                style={[
                  styles.tierTab,
                  selectedTier === tier.id && styles.selectedTierTab
                ]}
                onPress={() => setSelectedTier(tier.id)}
              >
                <Text style={[
                  styles.tierText,
                  selectedTier === tier.id && styles.selectedTierText
                ]}>
                  {tier.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
          <TouchableOpacity style={styles.premiumButton} onPress={handleGetPremium}>
            <Text style={styles.premiumButtonText}>
              Get {selectedTier} - {plans.find(p => p.id === selectedPlan)?.price}
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
    flex: 1,
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
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  diamondContainer: {
    marginBottom: 0,
    marginTop: 20,
  },
  diamondIcon: {
    width: 90,
    height: 90,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  diamondImage: {
    width: 70,
    height: 70,
  },
  tierSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    marginTop: 20,
    marginBottom: 20,
  },
  tierTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedTierTab: {
    backgroundColor: '#1B5EBD',
  },
  tierText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedTierText: {
    color: '#FFFFFF',
  },
  heroDescriptionContainer: {
    paddingHorizontal: 20,
  },
  heroDescription: {
    fontSize: 16,
    color: '#151515',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 0,
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
  premiumButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  premiumButtonText: {
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

export default PremiumPlanScreen;