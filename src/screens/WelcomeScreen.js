import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
      <Image 
        source={require('../../assets/Splash.png')}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  splashImage: {
    width: '100%',
    height: '100%'
  },
});

export default WelcomeScreen;