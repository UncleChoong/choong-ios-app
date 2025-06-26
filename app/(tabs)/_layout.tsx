import React from 'react';
import { Tabs } from 'expo-router';
import { Heart, Camera, MessageCircle, Gamepad2, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function TabLayout() {
  const handleBackToLanding = () => {
    Alert.alert(
      'Return to Landing',
      'Are you sure you want to go back to the landing page?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Go Back',
          style: 'destructive',
          onPress: () => {
            // Navigate back to the login screen
            router.dismissAll();
            router.replace('/');
          },
        },
      ]
    );
  };

  const BackButton = () => (
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={handleBackToLanding}
      activeOpacity={0.7}
    >
      <View style={styles.backButtonContainer}>
        <ArrowLeft size={20} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: '#1F2937',
        },
        headerRight: () => <BackButton />,
        tabBarActiveTintColor: '#059669', // Natural emerald green
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wedding Program',
          tabBarLabel: 'Program',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="photos"
        options={{
          title: 'Our Journey',
          tabBarLabel: 'Photos',
          tabBarIcon: ({ size, color }) => (
            <Camera size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishes"
        options={{
          title: 'Well Wishes',
          tabBarLabel: 'Wishes',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Mini Game',
          tabBarLabel: 'Game',
          tabBarIcon: ({ size, color }) => (
            <Gamepad2 size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  backButtonContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});