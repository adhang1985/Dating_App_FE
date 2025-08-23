import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const FaceVerificationProgressScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [animatedProgress] = useState(new Animated.Value(0));
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [verificationStage, setVerificationStage] = useState('detecting'); // detecting, ready, captured, verifying, complete
  const [countdown, setCountdown] = useState(0);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Start face detection simulation after camera loads
    if (permission?.granted && verificationStage === 'detecting') {
      const timer = setTimeout(() => {
        setVerificationStage('ready');
        startCountdown();
      }, 2000); // 2 seconds to "detect" face
      
      return () => clearTimeout(timer);
    }
  }, [permission?.granted, verificationStage]);

  const startCountdown = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startVerificationProcess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startVerificationProcess = async () => {
    setIsCapturing(true);
    setVerificationStage('captured');
    
    // Capture photo
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false, // Don't need base64 for display
        });
        setCapturedPhoto(photo);
        setVerificationStage('verifying');
        
        // Start verification progress
        startProgressAnimation();
      } catch (error) {
        console.error('Failed to capture photo:', error);
        setIsCapturing(false);
        setVerificationStage('detecting');
      }
    }
  };

  const startProgressAnimation = () => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2; // Complete in 5 seconds
        if (newProgress >= 100) {
          clearInterval(interval);
          setVerificationStage('complete');
          // Navigate to success screen after completion
          setTimeout(() => {
            navigation.navigate('FaceVerificationSuccess', { 
              capturedPhoto: capturedPhoto 
            });
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  };

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

  if (!permission) {
    return <View style={styles.container}><Text style={styles.permissionText}>Requesting camera permission...</Text></View>;
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>We need camera permission to verify your face</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera View with Face Overlay */}
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="front"
        />
        
        {/* Face Detection Frame */}
        <View style={[
          styles.faceFrame, 
          { borderColor: verificationStage === 'ready' || verificationStage === 'captured' ? '#4CAF50' : '#FFFFFF' }
        ]}>
          <View style={[styles.frameCorner, styles.topLeft, { borderColor: verificationStage === 'ready' || verificationStage === 'captured' ? '#4CAF50' : '#FFFFFF' }]} />
          <View style={[styles.frameCorner, styles.topRight, { borderColor: verificationStage === 'ready' || verificationStage === 'captured' ? '#4CAF50' : '#FFFFFF' }]} />
          <View style={[styles.frameCorner, styles.bottomLeft, { borderColor: verificationStage === 'ready' || verificationStage === 'captured' ? '#4CAF50' : '#FFFFFF' }]} />
          <View style={[styles.frameCorner, styles.bottomRight, { borderColor: verificationStage === 'ready' || verificationStage === 'captured' ? '#4CAF50' : '#FFFFFF' }]} />
        </View>

        {/* Countdown Display */}
        {countdown > 0 && (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}

        {/* Show captured photo overlay during verification */}
        {capturedPhoto && verificationStage !== 'detecting' && verificationStage !== 'ready' && (
          <Image
            source={{ uri: capturedPhoto.uri }}
            style={styles.capturedImage}
            resizeMode="cover"
          />
        )}

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
          {verificationStage === 'detecting' ? '"Detecting your face..."' :
           verificationStage === 'ready' && countdown > 0 ? `"Taking photo in ${countdown}..."` :
           verificationStage === 'captured' ? '"Photo captured! Processing..."' :
           verificationStage === 'verifying' && progress < 50 ? '"Analyzing your face..."' :
           verificationStage === 'verifying' && progress < 90 ? '"Almost complete..."' : 
           '"Verification successful!"'}
        </Text>

        <Text style={styles.instructionText}>
          {verificationStage === 'detecting' ? 
            'Look directly at the camera and position your face within the frame.' :
            verificationStage === 'ready' && countdown > 0 ? 
            'Face detected! Stay still while we take your photo.' :
            verificationStage === 'captured' ? 
            'Photo captured successfully. Please wait while we verify your identity.' :
            'Processing your face verification. This will only take a moment.'
          }
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
  camera: {
    width: '100%',
    height: '100%',
  },
  capturedImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  countdownContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
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