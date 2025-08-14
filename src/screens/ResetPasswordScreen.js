import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in both password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // Mock password reset
    console.log('Password reset successful');
    alert('Password reset successfully!');
    navigation.navigate('SignIn');
  };

  const handleBackToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Logo iconOnly={true} />
        
        <Text style={styles.title}>Reset Password</Text>
        
        <Text style={styles.description}>
          Create a new password for your account.{'\n'}
          Make sure it's strong and something you'll remember.
        </Text>
        
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          
          <CustomInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <CustomButton
            title="Save"
            onPress={handleSave}
            variant="primary"
            style={styles.saveButton}
          />
        </View>
        
        <TouchableOpacity onPress={handleBackToSignIn}>
          <Text style={styles.backToSignInText}>Back to Sign In</Text>
        </TouchableOpacity>
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
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 40,
  },
  saveButton: {
    marginTop: 20,
  },
  backToSignInText: {
    color: '#1B5EBD',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;