import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ChatDetailScreen = ({ navigation, route }) => {
  const { chat } = route.params;
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimer = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey! How was your day?',
      sent: false,
      timestamp: new Date(Date.now() - 120000),
      delivered: true,
      read: true,
    },
    {
      id: 2,
      text: 'It was great! Just finished work. How about yours?',
      sent: true,
      timestamp: new Date(Date.now() - 60000),
      delivered: true,
      read: true,
    },
    {
      id: 3,
      text: 'Pretty good! I went for a nice walk in the park 🌳',
      sent: false,
      timestamp: new Date(Date.now() - 30000),
      delivered: true,
      read: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendMessage = useCallback(() => {
    if (message.trim().length === 0) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sent: true,
      timestamp: new Date(),
      delivered: false,
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, delivered: true }
            : msg
        )
      );
    }, 1000);

    // Simulate auto-response after 2 seconds
    setTimeout(() => {
      const autoResponse = {
        id: Date.now() + 1,
        text: 'That sounds lovely! 😊',
        sent: false,
        timestamp: new Date(),
        delivered: true,
        read: false,
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 2000);
  }, [message]);

  const startRecording = useCallback(() => {
    console.log('Starting voice recording...');
    setIsRecording(true);
    setRecordingDuration(0);
    
    // Clear any existing timer
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }
    
    // Start recording timer
    recordingTimer.current = setInterval(() => {
      setRecordingDuration(prev => {
        const newDuration = prev + 1;
        if (newDuration >= 60) { // Max 60 seconds
          // Auto-stop recording - clear timer first
          if (recordingTimer.current) {
            clearInterval(recordingTimer.current);
            recordingTimer.current = null;
          }
          setIsRecording(false);
          
          // Send voice message with full duration
          const voiceMessage = {
            id: Date.now(),
            text: '',
            sent: true,
            timestamp: new Date(),
            delivered: false,
            read: false,
            isVoiceMessage: true,
            duration: 60,
          };
          setMessages(prev => [...prev, voiceMessage]);
          
          // Reset duration after sending
          setTimeout(() => setRecordingDuration(0), 100);
          return 60;
        }
        return newDuration;
      });
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    console.log('Stopping voice recording...');
    
    // Clear timer
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
      recordingTimer.current = null;
    }
    
    // Use state updater to get current duration
    setRecordingDuration(currentDuration => {
      const finalDuration = currentDuration || 5;
      
      // Send voice message
      const voiceMessage = {
        id: Date.now(),
        text: '', // No text for voice messages
        sent: true,
        timestamp: new Date(),
        delivered: false,
        read: false,
        isVoiceMessage: true,
        duration: finalDuration,
      };

      setMessages(prev => [...prev, voiceMessage]);

      // Simulate message delivery
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === voiceMessage.id 
              ? { ...msg, delivered: true }
              : msg
          )
        );
      }, 1000);

      // Simulate auto-response after 2 seconds
      setTimeout(() => {
        const autoResponse = {
          id: Date.now() + 1,
          text: 'Nice voice message! 👍',
          sent: false,
          timestamp: new Date(),
          delivered: true,
          read: false,
        };
        setMessages(prev => [...prev, autoResponse]);
      }, 2000);
      
      return 0; // Reset duration
    });
    
    setIsRecording(false);
  }, []);

  const handleVoiceMessage = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const handleVideoCall = useCallback(() => {
    Alert.alert(
      'Video Call',
      `Start video call with ${chat.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Starting video call') },
      ]
    );
  }, [chat.name]);

  const handleVoiceCall = useCallback(() => {
    Alert.alert(
      'Voice Call',
      `Start voice call with ${chat.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Starting voice call') },
      ]
    );
  }, [chat.name]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const msgTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - msgTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const renderMessage = ({ item, index }) => {
    const isLastMessage = index === messages.length - 1;
    const showDeliveryStatus = item.sent && isLastMessage;

    return (
      <View style={[
        styles.messageContainer,
        item.sent ? styles.sentMessage : styles.receivedMessage
      ]}>
        {!item.sent && (
          <Image source={{ uri: chat.image }} style={styles.messageAvatar} />
        )}
        
        <View style={[
          styles.messageBubble,
          item.sent ? styles.sentBubble : styles.receivedBubble
        ]}>
          {item.isVoiceMessage ? (
            <View style={styles.voiceMessageContainer}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons 
                  name="play" 
                  size={16} 
                  color={item.sent ? '#FFFFFF' : '#1B5EBD'} 
                />
              </TouchableOpacity>
              <View style={styles.voiceWaveform}>
                {[...Array(12)].map((_, i) => (
                  <View 
                    key={i} 
                    style={[
                      styles.waveformBar,
                      { 
                        height: Math.random() * 20 + 8,
                        backgroundColor: item.sent ? '#FFFFFF' : '#1B5EBD',
                        opacity: 0.7
                      }
                    ]} 
                  />
                ))}
              </View>
              <Text style={[
                styles.voiceDuration,
                item.sent ? styles.sentText : styles.receivedText
              ]}>
                0:{item.duration < 10 ? '0' : ''}{item.duration || 5}
              </Text>
            </View>
          ) : (
            <Text style={[
              styles.messageText,
              item.sent ? styles.sentText : styles.receivedText
            ]}>
              {item.text}
            </Text>
          )}
          
          <View style={styles.messageFooter}>
            <Text style={[
              styles.messageTime,
              item.sent ? styles.sentTime : styles.receivedTime
            ]}>
              {formatTime(item.timestamp)}
            </Text>
            
            {showDeliveryStatus && (
              <View style={styles.deliveryStatus}>
                {item.delivered ? (
                  <Ionicons 
                    name="checkmark-done" 
                    size={14} 
                    color={item.read ? '#1B5EBD' : '#999'} 
                  />
                ) : (
                  <Ionicons name="checkmark" size={14} color="#999" />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
        recordingTimer.current = null;
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileSection}>
            <Image source={{ uri: chat.image }} style={styles.headerAvatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>{chat.name}</Text>
              <Text style={styles.headerStatus}>
                {chat.isOnline ? 'Active now' : 'Last seen recently'}
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction} onPress={handleVoiceCall}>
              <Ionicons name="call" size={20} color="#1B5EBD" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction} onPress={handleVideoCall}>
              <Ionicons name="videocam" size={20} color="#1B5EBD" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Image source={{ uri: chat.image }} style={styles.typingAvatar} />
            <View style={styles.typingBubble}>
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, styles.dot1]} />
                <View style={[styles.typingDot, styles.dot2]} />
                <View style={[styles.typingDot, styles.dot3]} />
              </View>
            </View>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          {isRecording ? (
            // Recording UI
            <View style={styles.recordingContainer}>
              <TouchableOpacity 
                style={styles.cancelRecordingButton}
                onPress={() => {
                  console.log('Cancelling recording...');
                  if (recordingTimer.current) {
                    clearInterval(recordingTimer.current);
                    recordingTimer.current = null;
                  }
                  setIsRecording(false);
                  setRecordingDuration(0);
                }}
              >
                <Ionicons name="close" size={20} color="#FF4458" />
              </TouchableOpacity>
              
              <View style={styles.recordingInfo}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>
                  Recording... {recordingDuration}s
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.stopRecordingButton}
                onPress={handleVoiceMessage}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            // Normal input UI
            <>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type a message..."
                  placeholderTextColor="#999999"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity 
                  style={styles.voiceButtonInside}
                  onPress={handleVoiceMessage}
                >
                  <Ionicons name="mic" size={20} color="#1B5EBD" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.sendButton, 
                  message.trim().length > 0 ? styles.sendButtonActive : null
                ]}
                onPress={handleSendMessage}
                disabled={message.trim().length === 0}
              >
                <Ionicons 
                  name="send" 
                  size={20} 
                  color={message.trim().length > 0 ? "#FFFFFF" : "#999999"} 
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 21
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerStatus: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAction: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  sentBubble: {
    backgroundColor: '#1B5EBD',
    borderBottomRightRadius: 6,
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#1A1A1A',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
  },
  sentTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  receivedTime: {
    color: '#999999',
  },
  deliveryStatus: {
    marginLeft: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  typingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1B5EBD',
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 6,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
    paddingBottom: 46
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 20,
    maxHeight: 80,
    paddingRight: 8,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 10,
  },
  voiceButtonInside: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1E8ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sendButtonActive: {
    backgroundColor: '#1B5EBD',
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
  },
  cancelRecordingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4458',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    color: '#FF4458',
    fontWeight: '500',
  },
  stopRecordingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5EBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  voiceMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    minWidth: 120,
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  voiceWaveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    marginHorizontal: 8,
  },
  waveformBar: {
    width: 2,
    borderRadius: 1,
    marginHorizontal: 1,
  },
  voiceDuration: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default ChatDetailScreen;