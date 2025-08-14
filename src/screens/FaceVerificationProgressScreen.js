import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const FaceVerificationProgressScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [animatedProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Simulate face verification progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Navigate to success screen after completion
          setTimeout(() => {
            navigation.navigate('FaceVerificationSuccess');
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 50); // Complete in 5 seconds (100 steps * 50ms)

    return () => clearInterval(interval);
  }, [navigation]);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (progress >= 100) {
      navigation.navigate('FaceVerificationSuccess');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera View with Face Overlay */}
      <View style={styles.cameraContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Face Detection Frame */}
        <View style={styles.faceFrame}>
          <View style={styles.frameCorner} style={[styles.frameCorner, styles.topLeft]} />
          <View style={styles.frameCorner} style={[styles.frameCorner, styles.topRight]} />
          <View style={styles.frameCorner} style={[styles.frameCorner, styles.bottomLeft]} />
          <View style={styles.frameCorner} style={[styles.frameCorner, styles.bottomRight]} />
        </View>

        {/* Overlay for better text visibility */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.bottomOverlay}
        />
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.progressPercentage}>{progress}%</Text>
        <Text style={styles.progressTitle}>Verifying your face</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBarFill,
              {
                width: animatedProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                })
              }
            ]} 
          />
        </View>

        <Text style={styles.statusMessage}>
          {progress < 30 ? '"Hang tight! Almost there..."' : 
           progress < 60 ? '"Processing your verification..."' :
           progress < 90 ? '"Almost complete..."' : 
           '"Verification successful!"'}
        </Text>

        <Text style={styles.instructionText}>
          Please remain patient while we process your face verification. Look directly at the camera and maintain a natural expression for best results.
        </Text>
      </View>

      {/* Navigation Arrows */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleNext} 
          style={[styles.navButton, progress < 100 && styles.navButtonDisabled]}
          disabled={progress < 100}
        >
          <Ionicons name="chevron-forward" size={24} color={progress < 100 ? "#CCCCCC" : "#666666"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  faceFrame: {
    position: 'absolute',
    top: '20%',
    left: '15%',
    right: '15%',
    bottom: '35%',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 20,
  },
  frameCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
  },
  topLeft: {
    top: -3,
    left: -3,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: -3,
    right: -3,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomRightRadius: 20,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  progressSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 120,
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  statusMessage: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  instructionText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default FaceVerificationProgressScreen;