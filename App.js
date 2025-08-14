import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import PhotoUploadScreen from './src/screens/PhotoUploadScreen';
import AddPromptScreen from './src/screens/AddPromptScreen';
import PhotoUploadFilledScreen from './src/screens/PhotoUploadFilledScreen';
import FaceVerificationScreen from './src/screens/FaceVerificationScreen';
import FaceVerificationProgressScreen from './src/screens/FaceVerificationProgressScreen';
import FaceVerificationSuccessScreen from './src/screens/FaceVerificationSuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
        <Stack.Screen name="AddPrompt" component={AddPromptScreen} />
        <Stack.Screen name="PhotoUploadFilled" component={PhotoUploadFilledScreen} />
        <Stack.Screen name="FaceVerification" component={FaceVerificationScreen} />
        <Stack.Screen name="FaceVerificationProgress" component={FaceVerificationProgressScreen} />
        <Stack.Screen name="FaceVerificationSuccess" component={FaceVerificationSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}