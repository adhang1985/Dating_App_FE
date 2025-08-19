import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileVerificationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('username@example.com');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(50);
  const [canResend, setCanResend] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  
  // Create refs for OTP inputs
  const codeInputRefs = useRef([]);
  codeInputRefs.current = codeInputRefs.current.slice(0, 5);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSendOTP = () => {
    setIsOTPSent(true);
    setTimer(50);
    setCanResend(false);
    Alert.alert('OTP Sent', `A 5 digit code has been sent to ${email}`);
  };

  const handleChangeEmail = () => {
    Alert.alert('Change Email', 'Email change functionality coming soon!');
  };

  const handleResend = () => {
    setTimer(50);
    setCanResend(false);
    Alert.alert('OTP Resent', 'Verification code has been resent!');
  };

  const handleNext = () => {
    const codeString = verificationCode.join('');
    if (codeString.length === 5) {
      // For demo purposes, accept any 5-digit code
      setIsEmailVerified(true);
      setIsOTPSent(false); // Hide OTP section after verification
      Alert.alert('Success', 'Email verification completed!');
    } else {
      Alert.alert('Error', 'Please enter the 5-digit verification code');
    }
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);
    
    // Auto-focus next input if current input is filled
    if (text && index < 4) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (event, index) => {
    // Handle backspace to go to previous input
    if (event.nativeEvent.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleProfilePhotoVerification = () => {
    Alert.alert('Profile Photo Verification', 'Photo verification coming soon!');
  };

  const handleStartFaceVerification = () => {
    navigation.navigate('FaceVerificationProgress');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Profile Verification</Text>
          <Text style={styles.subtitle}>For a safer, more authentic dating experience</Text>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.benefitText}>Confirm you're a real person.</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.benefitText}>Get a verification tick on your profile</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.benefitText}>Increase trust and visibility with matches.</Text>
          </View>
        </View>

        {/* Mobile Number Verification */}
        <View style={styles.verificationSection}>
          <View style={styles.verificationHeader}>
            <Text style={styles.verificationTitle}>Mobile Number Verification</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Email Verification */}
        <View style={styles.verificationSection}>
          <View style={styles.verificationHeader}>
            <Text style={styles.verificationTitle}>Email Verification</Text>
            {isEmailVerified ? (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            ) : (
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Required</Text>
              </View>
            )}
          </View>

          {/* Email Input Section */}
          {!isEmailVerified && (
            <View style={styles.emailSection}>
              <View style={styles.emailRow}>
                <TextInput
                  style={styles.emailInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.sendOTPButton} onPress={handleSendOTP}>
                  <Text style={styles.sendOTPText}>Send OTP</Text>
                </TouchableOpacity>
              </View>

            {isOTPSent && (
              <>
                <View style={styles.otpSentInfo}>
                  <Text style={styles.otpSentText}>
                    A 5 digit code has been sent to : {' '}
                    <Text style={styles.emailHighlight}>{email}</Text>
                  </Text>
                  <TouchableOpacity onPress={handleChangeEmail}>
                    <Text style={styles.changeText}>Change</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.codeLabel}>Enter Verification Code</Text>
                <View style={styles.codeInputContainer}>
                  {verificationCode.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (codeInputRefs.current[index] = ref)}
                      style={styles.codeInput}
                      value={digit}
                      onChangeText={(text) => handleCodeChange(text, index)}
                      onKeyPress={(event) => handleCodeKeyPress(event, index)}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                    />
                  ))}
                </View>

                <View style={styles.resendSection}>
                  <View style={styles.resendRow}>
                    <Text style={styles.timerText}>{formatTime(timer)} </Text>
                    {canResend ? (
                      <TouchableOpacity onPress={handleResend}>
                        <Text style={styles.resendText}>Resend</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.resendDisabled}>Resend</Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </>
            )}
            </View>
          )}
        </View>

        {/* Profile Photo Verification */}
        <TouchableOpacity 
          style={styles.verificationSection} 
          onPress={handleProfilePhotoVerification}
        >
          <View style={styles.verificationHeader}>
            <Text style={styles.verificationTitle}>Profile Photo Verification</Text>
            <View style={styles.requiredBadge}>
              <Text style={styles.requiredText}>Required</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* How it Works Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it Works?</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletText}>•</Text>
            <Text style={styles.bulletContent}>Follow the on-screen pose or expression (e.g., blink, smile).</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletText}>•</Text>
            <Text style={styles.bulletContent}>We'll compare it with your profile photos using secure AI.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletText}>•</Text>
            <Text style={styles.bulletContent}>Get verified in seconds — no retakes needed unless there's an error.</Text>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Your Privacy Matters</Text>
          <Text style={styles.privacyText}>Your video is never shared and is only used for one-time verification.</Text>
        </View>

        {/* Start Face Verification Button */}
        <TouchableOpacity style={styles.faceVerificationButton} onPress={handleStartFaceVerification}>
          <View style={styles.faceVerificationContent}>
            <View style={styles.faceIcon}>
              <Ionicons name="happy-outline" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.faceVerificationTextContainer}>
              <Text style={styles.faceVerificationTitle}>Start Face Verification</Text>
              <Text style={styles.faceVerificationSubtitle}>It takes less than 30 seconds!</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 8
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  benefitsSection: {
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  verificationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  verificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  requiredBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emailSection: {
    marginTop: 8,
  },
  emailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    marginRight: 12,
  },
  sendOTPButton: {
    backgroundColor: '#1B5EBD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendOTPText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  otpSentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  otpSentText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  emailHighlight: {
    color: '#333',
    fontWeight: '600',
  },
  changeText: {
    color: '#1B5EBD',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  codeLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    fontWeight: '500',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: '#F9F9F9',
    textAlign: 'center',
    fontWeight: '600',
  },
  resendSection: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#666',
  },
  resendText: {
    color: '#1B5EBD',
    fontSize: 14,
    fontWeight: '600',
  },
  resendDisabled: {
    color: '#CCC',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#1B5EBD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 50,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
    lineHeight: 22,
  },
  bulletContent: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  privacyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  faceVerificationButton: {
    backgroundColor: '#1B5EBD',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  faceVerificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  faceVerificationTextContainer: {
    flex: 1,
  },
  faceVerificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  faceVerificationSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

export default ProfileVerificationScreen;