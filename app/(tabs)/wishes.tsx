import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Send, User, MessageCircle } from 'lucide-react-native';

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const initialWishes: Wish[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    message: 'Wishing you both a lifetime of love and happiness! Your love story is truly inspiring. 💕',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    message: 'Congratulations on your special day! May your marriage be filled with endless joy and laughter.',
    date: '3 days ago',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    message: 'So excited to celebrate with you! Here\'s to a beautiful future together. ✨',
    date: '1 week ago',
  },
];

export default function WellWishes() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      Alert.alert('Missing Information', 'Please fill in both your name and message.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newWish: Wish = {
        id: wishes.length + 1,
        name: name.trim(),
        message: message.trim(),
        date: 'Just now',
      };

      setWishes([newWish, ...wishes]);
      setName('');
      setMessage('');
      setIsSubmitting(false);
      Alert.alert('Thank You!', 'Your well wishes have been submitted successfully.');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ECFDF5', '#F0FDF4']} // Natural green gradient
        style={styles.header}
      >
        <Text style={styles.headerSubtitle}>Share your love and blessings</Text>
        
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <MessageCircle color="#059669" size={20} />
            <Text style={styles.statNumber}>{wishes.length}</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Heart color="#059669" size={20} fill="#059669" />
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Love</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Submission Form */}
        <View style={styles.formContainer}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Send Your Wishes</Text>
            <Text style={styles.formSubtitle}>
              Leave a message for the happy couple
            </Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <User color="#9CA3AF" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Write your message here..."
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <LinearGradient
                colors={['#059669', '#047857']} // Natural green gradient
                style={styles.buttonGradient}
              >
                <Send color="#FFFFFF" size={16} />
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Sending...' : 'Send Wishes'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Wishes List */}
        <View style={styles.wishesContainer}>
          <Text style={styles.wishesTitle}>Messages from Loved Ones</Text>
          
          {wishes.map((wish) => (
            <View key={wish.id} style={styles.wishCard}>
              <View style={styles.wishHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {wish.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.wishMeta}>
                  <Text style={styles.wishName}>{wish.name}</Text>
                  <Text style={styles.wishDate}>{wish.date}</Text>
                </View>
              </View>
              <Text style={styles.wishMessage}>{wish.message}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for sharing in our joy! 💕
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 20,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontWeight: '400',
    color: '#1F2937',
    marginLeft: 12,
  },
  messageInput: {
    height: 120,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginLeft: 0,
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  wishesContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  wishesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  wishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  wishHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669', // Natural green
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  wishMeta: {
    flex: 1,
  },
  wishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  wishDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
    marginTop: 2,
  },
  wishMessage: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4B5563',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});