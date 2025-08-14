import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  TextInput 
} from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      // Mock sending OTP
      console.log('Sending OTP to:', countryCode + phoneNumber);
      navigation.navigate('OTPVerification', { 
        phoneNumber: countryCode + phoneNumber 
      });
    } else {
      alert('Please enter a valid phone number');
    }
  };

  const handleCountryPress = () => {
    // Mock country picker - in real app, would show country picker modal
    alert('Country picker (mock implementation)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Logo iconOnly={true} />
        
        <Text style={styles.title}>What's your mobile number?</Text>
        
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity 
            style={styles.countryCodeContainer}
            onPress={handleCountryPress}
          >
            <Text style={styles.flagText}>🇺🇸</Text>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
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
  dropdownIcon: {
    fontSize: 12,
    color: '#666666',
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
});

export default PhoneNumberScreen;