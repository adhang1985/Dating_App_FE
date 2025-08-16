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

// Profile Setup screens
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import PetsScreen from './src/screens/PetsScreen';
import InterestsScreen from './src/screens/InterestsScreen';
import PronounsScreen from './src/screens/PronounsScreen';
import GenderIdentityScreen from './src/screens/GenderIdentityScreen';
import SexualOrientationScreen from './src/screens/SexualOrientationScreen';
import FamilyScreen from './src/screens/FamilyScreen';
import EducationScreen from './src/screens/EducationScreen';
import LocationScreen from './src/screens/LocationScreen';
import ProfessionScreen from './src/screens/ProfessionScreen';
import EducationLevelScreen from './src/screens/EducationLevelScreen';
import EthnicityScreen from './src/screens/EthnicityScreen';
import LookingToMeetScreen from './src/screens/LookingToMeetScreen';
import ReligiousAffiliationScreen from './src/screens/ReligiousAffiliationScreen';
import WhereDidYouGrowUpScreen from './src/screens/WhereDidYouGrowUpScreen';
import PoliticalAffiliationScreen from './src/screens/PoliticalAffiliationScreen';
import LanguagesSpokenScreen from './src/screens/LanguagesSpokenScreen';
import DatingIntentionsScreen from './src/screens/DatingIntentionsScreen';
import LifestyleHabitsScreen from './src/screens/LifestyleHabitsScreen';
import IdealRelationshipScreen from './src/screens/IdealRelationshipScreen';
import WrittenPromptsScreen from './src/screens/WrittenPromptsScreen';
import VoicePromptScreen from './src/screens/VoicePromptScreen';
import VideoPromptScreen from './src/screens/VideoPromptScreen';
import PromptPollScreen from './src/screens/PromptPollScreen';
import DiscoveryScreen from './src/screens/DiscoveryScreen';
import ProfileDetailScreen from './src/screens/ProfileDetailScreen';
import FiltersScreen from './src/screens/FiltersScreen';
import SignatureProfileScreen from './src/screens/SignatureProfileScreen';
import ExecutiveProfileScreen from './src/screens/ExecutiveProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';

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
        
        {/* Profile Setup Flow */}
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Pets" component={PetsScreen} />
        <Stack.Screen name="Interests" component={InterestsScreen} />
        <Stack.Screen name="Pronouns" component={PronounsScreen} />
        <Stack.Screen name="GenderIdentity" component={GenderIdentityScreen} />
        <Stack.Screen name="SexualOrientation" component={SexualOrientationScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="Education" component={EducationScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Profession" component={ProfessionScreen} />
        <Stack.Screen name="EducationLevel" component={EducationLevelScreen} />
        <Stack.Screen name="Ethnicity" component={EthnicityScreen} />
        
        {/* Additional Profile Setup Screens */}
        <Stack.Screen name="LookingToMeet" component={LookingToMeetScreen} />
        <Stack.Screen name="ReligiousAffiliation" component={ReligiousAffiliationScreen} />
        <Stack.Screen name="WhereDidYouGrowUp" component={WhereDidYouGrowUpScreen} />
        <Stack.Screen name="PoliticalAffiliation" component={PoliticalAffiliationScreen} />
        <Stack.Screen name="LanguagesSpoken" component={LanguagesSpokenScreen} />
        <Stack.Screen name="DatingIntentions" component={DatingIntentionsScreen} />
        <Stack.Screen name="LifestyleHabits" component={LifestyleHabitsScreen} />
        <Stack.Screen name="IdealRelationship" component={IdealRelationshipScreen} />
        <Stack.Screen name="WrittenPrompts" component={WrittenPromptsScreen} />
        <Stack.Screen name="VoicePrompt" component={VoicePromptScreen} />
        <Stack.Screen name="VideoPrompt" component={VideoPromptScreen} />
        <Stack.Screen name="PromptPoll" component={PromptPollScreen} />
        <Stack.Screen name="Discovery" component={DiscoveryScreen} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
        <Stack.Screen name="SignatureProfile" component={SignatureProfileScreen} />
        <Stack.Screen name="ExecutiveProfile" component={ExecutiveProfileScreen} />
        <Stack.Screen name="Filters" component={FiltersScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Matches" component={MatchesScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}