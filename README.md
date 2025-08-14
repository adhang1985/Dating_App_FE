# Quickies - Dating App React Native

A React Native dating app with comprehensive authentication flow built with Expo.

## Features

### Implemented Screens
1. **Welcome Screen** - Landing page with branding and "Join Us" button
2. **Sign Up Screen** - Multiple sign-up options:
   - Google Sign Up
   - Apple Sign Up
   - Phone Number Sign Up
   - Email Sign Up (with form)
3. **Sign In Screen** - Login with email/password and social options
4. **Forgot Password Screen** - Reset password via email/phone
5. **Reset Password Screen** - Create new password
6. **Phone Number Screen** - Enter phone number with country code
7. **OTP Verification Screen** - 5-digit verification code input

### Navigation Flow
- Welcome → Sign Up → Email Form / Phone Number → OTP Verification
- Welcome → Sign In → Forgot Password → Reset Password
- All screens have proper navigation between them

### Mock Functionality
- **Email Sign Up**: Validates required fields
- **Sign In**: Basic validation, mock success message
- **OTP Verification**: Use code "12345" for demo
- **Phone Number**: Mock country picker (shows US flag)
- **Social Logins**: Mock implementation with alerts
- **Password Reset**: Form validation and success flow

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS testing)
- Android Studio/Emulator (for Android testing)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
# or
npx expo start
```

3. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## Project Structure

```
src/
├── components/
│   ├── CustomButton.js    # Reusable button component
│   ├── CustomInput.js     # Reusable input component
│   └── Logo.js           # App logo component
└── screens/
    ├── WelcomeScreen.js
    ├── SignUpScreen.js
    ├── SignInScreen.js
    ├── ForgotPasswordScreen.js
    ├── ResetPasswordScreen.js
    ├── PhoneNumberScreen.js
    └── OTPVerificationScreen.js
```

## Styling

The app follows the provided design specifications with:
- Custom logo with circular design and heart icon
- Blue (#1B5EBD) primary color scheme
- Clean, modern UI with rounded buttons and inputs
- Proper spacing and typography
- Responsive design for mobile devices

## Testing the App

1. **Welcome Flow**: Start at Welcome screen → Tap "Join Us"
2. **Email Sign Up**: Enter name, email, password → Tap "Continue"
3. **Phone Sign Up**: Enter phone number → Tap "Send OTP" → Enter "12345"
4. **Sign In**: Enter email/password → Tap "Continue"
5. **Password Reset**: From Sign In → "Forgot Password" → Enter email → "Send"

## Mock Data Notes

- OTP Verification: Use "12345" as verification code
- Any email/password combination works for demo
- Social logins show mock success alerts
- Country picker shows US flag (mock implementation)

## Next Steps

To make this production-ready:
1. Integrate real authentication services (Firebase Auth, Auth0, etc.)
2. Add proper country picker functionality
3. Implement real OTP service
4. Add form validation and error handling
5. Integrate with backend API
6. Add proper asset management
7. Implement biometric authentication
8. Add loading states and animations

## Dependencies

- **React Native & Expo**: Core framework
- **React Navigation**: Screen navigation
- **Expo Vector Icons**: Icons for social buttons
- **React Native Gesture Handler**: Touch interactions
- **React Native Safe Area Context**: Safe area handling
- **React Native Screens**: Native screen optimization

## License

MIT License