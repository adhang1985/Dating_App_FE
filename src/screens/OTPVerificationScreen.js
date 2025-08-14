import React, { useState, useRef, useEffect } from 'react';
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

const OTPVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const { phoneNumber } = route.params || { phoneNumber: '+1 (XXX) XXX XXXX' };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = () => {
    const otpString = otp.join('');
    if (otpString.length === 5) {
      // Mock OTP verification
      console.log('Verifying OTP:', otpString);
      if (otpString === '12345') {
        // Navigate to photo upload for profile setup
        navigation.navigate('PhotoUpload');
      } else {
        alert('Invalid OTP. Try 12345 for demo.');
      }
    } else {
      alert('Please enter complete OTP');
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setOtp(['', '', '', '', '']);
      alert('OTP resent successfully!');
    }
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Logo iconOnly={true} />
        
        <Text style={styles.title}>Enter Verification Code</Text>
        
        <Text style={styles.description}>
          A 5 digit code has been sent to :
        </Text>
        
        <View style={styles.phoneNumberContainer}>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          <TouchableOpacity onPress={handleChangeNumber}>
            <Text style={styles.changeNumberText}>Change Number</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
          <TouchableOpacity 
            onPress={handleResend}
            disabled={timer > 0}
          >
            <Text style={[
              styles.resendText, 
              timer === 0 && styles.resendTextActive
            ]}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        
        <CustomButton
          title="Next"
          onPress={handleNext}
          variant="primary"
          style={styles.nextButton}
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
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 10,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    marginRight: 10,
  },
  changeNumberText: {
    fontSize: 14,
    color: '#1B5EBD',
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 16,
    color: '#666666',
    marginRight: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  resendTextActive: {
    color: '#1B5EBD',
    fontWeight: '600',
  },
  nextButton: {
    marginTop: 20,
  },
});

export default OTPVerificationScreen;