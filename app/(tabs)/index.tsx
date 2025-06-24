import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, Users } from 'lucide-react-native';

const programData = [
  {
    time: '2:00 PM',
    title: 'Guest Arrival',
    description: 'Welcome drinks and mingling',
    icon: Users,
  },
  {
    time: '2:30 PM',
    title: 'Ceremony Begins',
    description: 'Exchange of vows and rings',
    icon: Calendar,
  },
  {
    time: '3:00 PM',
    title: 'Photography Session',
    description: 'Couple and family photos',
    icon: 'camera',
  },
  {
    time: '4:00 PM',
    title: 'Cocktail Hour',
    description: 'Drinks and appetizers',
    icon: 'glass',
  },
  {
    time: '5:30 PM',
    title: 'Reception Dinner',
    description: 'Three-course meal with speeches',
    icon: 'utensils',
  },
  {
    time: '8:00 PM',
    title: 'Dancing & Celebration',
    description: 'First dance and party time',
    icon: 'music',
  },
];

export default function WeddingProgram() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ECFDF5', '#F0FDF4']} // Natural green gradient
        style={styles.header}
      >
        <Text style={styles.headerSubtitle}>Our Special Day Schedule</Text>
        
        <View style={styles.dateCard}>
          <View style={styles.dateInfo}>
            <Calendar color="#059669" size={24} />
            <Text style={styles.dateText}>Saturday, July 19th, 2025</Text>
          </View>
          <View style={styles.dateInfo}>
            <MapPin color="#059669" size={24} />
            <Text style={styles.dateText}>Claymore Ballroom, Pan Pacific Orchard</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.timeline}>
          {programData.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={styles.timelineDot} />
                {index < programData.length - 1 && <View style={styles.timelineLine} />}
              </View>
              
              <View style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View style={styles.timeContainer}>
                    <Clock color="#059669" size={16} />
                    <Text style={styles.eventTime}>{item.time}</Text>
                  </View>
                </View>
                
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>Important Notes</Text>
            <Text style={styles.footerText}>
              • Ceremony will be held indoors with elegant ballroom setting
            </Text>
            <Text style={styles.footerText}>
              • Cocktail attire recommended
            </Text>
            <Text style={styles.footerText}>
              • Valet parking available at Pan Pacific Orchard
            </Text>
          </View>
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
  dateCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  timeline: {
    padding: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineMarker: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#059669', // Natural green
    marginTop: 8,
  },
  timelineLine: {
    width: 2,
    height: 60,
    backgroundColor: '#F3F4F6',
    marginTop: 8,
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  eventHeader: {
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5', // Light green background
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  eventTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857', // Darker green for text
    marginLeft: 6,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    paddingTop: 0,
  },
  footerCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
});