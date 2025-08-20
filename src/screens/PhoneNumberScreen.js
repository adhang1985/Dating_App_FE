import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    code: '+1',
    flag: '🇺🇸',
    iso: 'US'
  });
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Popular countries data
  const countries = [
    { name: 'United States', code: '+1', flag: '🇺🇸', iso: 'US' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧', iso: 'GB' },
    { name: 'Canada', code: '+1', flag: '🇨🇦', iso: 'CA' },
    { name: 'Australia', code: '+61', flag: '🇦🇺', iso: 'AU' },
    { name: 'Germany', code: '+49', flag: '🇩🇪', iso: 'DE' },
    { name: 'France', code: '+33', flag: '🇫🇷', iso: 'FR' },
    { name: 'India', code: '+91', flag: '🇮🇳', iso: 'IN' },
    { name: 'China', code: '+86', flag: '🇨🇳', iso: 'CN' },
    { name: 'Japan', code: '+81', flag: '🇯🇵', iso: 'JP' },
    { name: 'South Korea', code: '+82', flag: '🇰🇷', iso: 'KR' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷', iso: 'BR' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽', iso: 'MX' },
    { name: 'Spain', code: '+34', flag: '🇪🇸', iso: 'ES' },
    { name: 'Italy', code: '+39', flag: '🇮🇹', iso: 'IT' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱', iso: 'NL' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪', iso: 'BE' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭', iso: 'CH' },
    { name: 'Austria', code: '+43', flag: '🇦🇹', iso: 'AT' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪', iso: 'SE' },
    { name: 'Norway', code: '+47', flag: '🇳🇴', iso: 'NO' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰', iso: 'DK' },
    { name: 'Finland', code: '+358', flag: '🇫🇮', iso: 'FI' },
    { name: 'Russia', code: '+7', flag: '🇷🇺', iso: 'RU' },
    { name: 'Ukraine', code: '+380', flag: '🇺🇦', iso: 'UA' },
    { name: 'Poland', code: '+48', flag: '🇵🇱', iso: 'PL' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷', iso: 'TR' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬', iso: 'EG' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦', iso: 'ZA' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬', iso: 'NG' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪', iso: 'KE' },
    { name: 'Israel', code: '+972', flag: '🇮🇱', iso: 'IL' },
    { name: 'UAE', code: '+971', flag: '🇦🇪', iso: 'AE' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', iso: 'SA' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭', iso: 'TH' },
    { name: 'Vietnam', code: '+84', flag: '🇻🇳', iso: 'VN' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭', iso: 'PH' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩', iso: 'ID' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾', iso: 'MY' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬', iso: 'SG' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿', iso: 'NZ' },
  ];

  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  );

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      const countryCode = selectedCountry?.code || '+1';
      const fullPhoneNumber = countryCode + phoneNumber;
      console.log('Sending OTP to:', fullPhoneNumber);
      console.log('Selected country:', selectedCountry);
      navigation.navigate('OTPVerification', { 
        phoneNumber: fullPhoneNumber 
      });
    } else {
      alert('Please enter a valid phone number');
    }
  };

  const handleCountryPress = () => {
    setShowCountryModal(true);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryModal(false);
    setSearchQuery('');
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryCodeInList}>{item.code}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/Frame.png')} style={styles.frameIcon} />
        
        <Text style={styles.title}>What's your mobile number?</Text>
        
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity 
            style={styles.countryCodeContainer}
            onPress={handleCountryPress}
          >
            <Text style={styles.flagText}>{selectedCountry?.flag || '🇺🇸'}</Text>
            <Text style={styles.countryCodeText}>{selectedCountry?.code || '+1'}</Text>
            <Ionicons name="chevron-down" size={16} color="#666666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.phoneInput}
            placeholder="(XXX) XXX XXXX"
            placeholderTextColor="#999999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>
        
        <Text style={styles.description}>
          Add your mobile number, we will send you{' '}
          <Text style={styles.highlightText}>5 Digit</Text>
          {'\n'}verification code.
        </Text>
        
        <CustomButton
          title="Send OTP"
          onPress={handleSendOTP}
          variant="primary"
          style={styles.sendButton}
        />
      </View>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCountryModal(false)}
            >
              <Ionicons name="close" size={24} color="#333333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Country</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search country or code..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={false}
            />
          </View>

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.iso}
            showsVerticalScrollIndicator={false}
            style={styles.countryList}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    justifyContent: 'center',
  },
  frameIcon: {
    width: 70,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    minWidth: 100,
  },
  flagText: {
    fontSize: 20,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333333',
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  highlightText: {
    fontWeight: '600',
    color: '#333333',
  },
  sendButton: {
    marginTop: 20,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 10,
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  countryCodeInList: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
});

export default PhoneNumberScreen;