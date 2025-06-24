import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Download } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const photoWidth = (width - 48) / 2;

const couplePhotos = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Engagement Session',
    date: 'March 2024',
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Sunset Portrait',
    date: 'March 2024',
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Candid Moment',
    date: 'February 2024',
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Romantic Walk',
    date: 'February 2024',
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Beach Day',
    date: 'January 2024',
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1444443/pexels-photo-1444443.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'City Adventure',
    date: 'January 2024',
  },
];

export default function CouplePhotos() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ECFDF5', '#F0FDF4']} // Natural green gradient
        style={styles.header}
      >
        <Text style={styles.headerSubtitle}>Memories we've created together</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Heart color="#059669" size={20} fill="#059669" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Years Together</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Engaged Years</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Love Forever</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.photosContainer}>
          <View style={styles.photosGrid}>
            {couplePhotos.map((photo, index) => (
              <TouchableOpacity
                key={photo.id}
                style={[
                  styles.photoItem,
                  index % 2 === 0 ? styles.photoLeft : styles.photoRight,
                ]}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: photo.url }}
                  style={styles.photoImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.photoOverlay}
                >
                  <View style={styles.photoInfo}>
                    <Text style={styles.photoTitle}>{photo.title}</Text>
                    <Text style={styles.photoDate}>{photo.date}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>More Photos Coming Soon!</Text>
            <Text style={styles.footerText}>
              We'll be adding wedding day photos after the ceremony. 
              Check back here to see all the beautiful moments from our special day.
            </Text>
            <TouchableOpacity style={styles.downloadButton}>
              <Download color="#059669" size={16} />
              <Text style={styles.downloadText}>Download All Photos</Text>
            </TouchableOpacity>
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
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
  photosContainer: {
    padding: 16,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoItem: {
    width: photoWidth,
    height: 240,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  photoLeft: {
    marginRight: 8,
  },
  photoRight: {
    marginLeft: 8,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  photoInfo: {
    padding: 16,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  photoDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#E5E7EB',
  },
  footer: {
    padding: 24,
    paddingTop: 8,
  },
  footerCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5', // Light green background
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1FAE5', // Light green border
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#047857', // Darker green text
    marginLeft: 8,
  },
});