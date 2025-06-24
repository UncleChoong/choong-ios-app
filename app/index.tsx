import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Lock } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AuthScreen() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter the access code');
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (password.trim() === 'Rocher') {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Access Denied', 'Incorrect access code. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1750525880320-e5ad4300cff1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Heart color="#059669" size={20} fill="#059669" />
              </View>
              <Text style={styles.title}>Welcome to Our Wedding</Text>
              <Text style={styles.subtitle}>
                Join us in celebrating our special day
              </Text>
            </View>

            {/* Auth Card - Smaller and Ultra Translucent */}
            <View style={styles.authCard}>
              <View style={styles.lockIcon}>
                <Lock color="#6B7280" size={16} />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Access Code"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  onSubmitEditing={handleLogin}
                />
              </View>

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#059669', '#047857']} // Natural green gradient
                  style={styles.buttonGradient}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'Accessing...' : 'Access Wedding'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Made with ❤️ for our special day
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.02)', // Even lighter overlay
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#F3F4F6',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  authCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Even more translucent - 25% opacity
    borderRadius: 16,
    padding: 20, // Reduced padding for smaller size
    width: '75%', // Smaller width
    maxWidth: 280, // Smaller max width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08, // Very light shadow
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Very subtle border
    backdropFilter: 'blur(20px)', // Strong blur for glass effect
  },
  lockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(243, 244, 246, 0.4)', // Very translucent
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 44, // Slightly smaller height
    backgroundColor: 'rgba(249, 250, 251, 0.5)', // More translucent input
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '400',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.3)', // Very translucent border
  },
  loginButton: {
    width: '100%',
    height: 44, // Smaller button height
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#059669', // Green shadow to match button
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    marginTop: 40,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#F3F4F6',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});