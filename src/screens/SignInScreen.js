import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    // Mock sign in validation
    if (email && password) {
      console.log('Sign in:', { email, password });
      // Navigate to photo upload for profile setup
      navigation.navigate('PhotoUpload');
    } else {
      alert('Please enter email and password');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleGoogleSignIn = () => {
    // Mock Google sign in
    console.log('Google sign in');
    navigation.navigate('PhotoUpload');
  };

  const handleAppleSignIn = () => {
    // Mock Apple sign in
    console.log('Apple sign in');
    navigation.navigate('PhotoUpload');
  };

  const handlePhoneSignIn = () => {
    navigation.navigate('PhoneNumber');
  };

  const handleJoinUs = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logo iconOnly={true} />
        <Text style={styles.title}>Sign In</Text>
        
        <View style={styles.formContainer}>
          <CustomInput
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <CustomInput
            placeholder="••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            style={styles.continueButton}
          />
        </View>
        
        <Text style={styles.signInWithText}>Sign In with</Text>
        
        <View style={styles.socialButtonContainer}>
          <CustomButton
            title="Sign In with Google"
            onPress={handleGoogleSignIn}
            variant="social"
            style={styles.socialButton}
            icon={<Ionicons name="logo-google" size={20} color="#4285F4" />}
          />
          
          <CustomButton
            title="Sign In with Apple"
            onPress={handleAppleSignIn}
            variant="social"
            style={styles.socialButton}
            icon={<Ionicons name="logo-apple" size={20} color="#000" />}
          />
          
          <CustomButton
            title="Sign In with Phone Number"
            onPress={handlePhoneSignIn}
            variant="secondary"
            style={styles.phoneButton}
          />
          
          <View style={styles.joinUsContainer}>
            <Text style={styles.joinUsText}>
              Don't have an Account?{' '}
              <Text style={styles.joinUsLink} onPress={handleJoinUs}>
                Join Us
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
  },
  continueButton: {
    marginTop: 10,
  },
  signInWithText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtonContainer: {
    marginBottom: 30,
  },
  socialButton: {
    marginBottom: 15,
  },
  phoneButton: {
    marginBottom: 15,
  },
  joinUsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  joinUsText: {
    color: '#666666',
    fontSize: 16,
  },
  joinUsLink: {
    color: '#1B5EBD',
    fontWeight: '600',
  },
});

export default SignInScreen;