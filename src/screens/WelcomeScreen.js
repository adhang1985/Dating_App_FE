import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  SafeAreaView,
  Dimensions 
} from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

const { height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleJoinUs = () => {
    navigation.navigate('SignUp');
  };

  const handleTermsPress = () => {
    // Navigate to terms - mock for now
    console.log('Terms pressed');
  };

  const handlePrivacyPress = () => {
    // Navigate to privacy policy - mock for now
    console.log('Privacy policy pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Logo size="large" />
      </View>
      
      <View style={styles.bottomSection}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80' }}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.contentContainer}>
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Join Us"
                  onPress={handleJoinUs}
                  variant="social"
                  style={styles.joinButton}
                  textStyle={styles.joinButtonText}
                />
              </View>
              
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By tapping "Register", you agree our{' '}
                  <Text style={styles.linkText} onPress={handleTermsPress}>
                    Terms
                  </Text>
                  .{'\n'}
                  Learn how we process your data in our{' '}
                  <Text style={styles.linkText} onPress={handlePrivacyPress}>
                    privacy policy
                  </Text>{' '}
                  and{' '}
                  <Text style={styles.linkText}>
                    cookies policy
                  </Text>
                  .
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  bottomSection: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
  },
  joinButtonText: {
    color: '#333333',
    fontWeight: '600',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default WelcomeScreen;