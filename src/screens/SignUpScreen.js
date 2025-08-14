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

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleGoogleSignUp = () => {
    // Mock Google sign up
    console.log('Google sign up');
    navigation.navigate('PhotoUpload');
  };

  const handleAppleSignUp = () => {
    // Mock Apple sign up
    console.log('Apple sign up');
    navigation.navigate('PhotoUpload');
  };

  const handlePhoneSignUp = () => {
    navigation.navigate('PhoneNumber');
  };

  const handleEmailSignUp = () => {
    setShowEmailForm(true);
  };

  const handleContinueWithEmail = () => {
    // Mock email sign up validation
    if (name && email && password) {
      console.log('Email sign up:', { name, email, password });
      // Navigate to photo upload for profile setup
      navigation.navigate('PhotoUpload');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logo iconOnly={true} />
        <Text style={styles.title}>Join us with</Text>
        
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign Up with Google"
            onPress={handleGoogleSignUp}
            variant="social"
            style={styles.socialButton}
            icon={<Ionicons name="logo-google" size={20} color="#4285F4" />}
          />
          
          <CustomButton
            title="Sign Up with Apple"
            onPress={handleAppleSignUp}
            variant="social"
            style={styles.socialButton}
            icon={<Ionicons name="logo-apple" size={20} color="#000" />}
          />
          
          <CustomButton
            title="Sign Up with Phone Number"
            onPress={handlePhoneSignUp}
            variant="secondary"
            style={styles.phoneButton}
          />
          
          {!showEmailForm ? (
            <TouchableOpacity onPress={handleEmailSignUp} style={styles.emailLinkContainer}>
              <Text style={styles.emailLink}>Join Us with Email</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.emailForm}>
              <Text style={styles.emailFormTitle}>Join us with Email</Text>
              
              <CustomInput
                placeholder="Enter Your Name"
                value={name}
                onChangeText={setName}
              />
              
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
              
              <CustomButton
                title="Continue"
                onPress={handleContinueWithEmail}
                variant="primary"
                style={styles.continueButton}
              />
              
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>
                  Already have an Account?{' '}
                  <Text style={styles.signInLink} onPress={handleSignIn}>
                    Sign In
                  </Text>
                </Text>
              </View>
            </View>
          )}
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
  buttonContainer: {
    marginBottom: 30,
  },
  socialButton: {
    marginBottom: 15,
  },
  phoneButton: {
    marginBottom: 20,
  },
  emailLinkContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  emailLink: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  emailFormTitle: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  emailForm: {
    marginTop: 20,
  },
  continueButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInText: {
    color: '#666666',
    fontSize: 16,
  },
  signInLink: {
    color: '#1B5EBD',
    fontWeight: '600',
  },
});

export default SignUpScreen;