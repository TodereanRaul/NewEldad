import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface VideoModalProps {
  visible: boolean;
  onClose: () => void;
  video: {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
    uploadDate: string;
    type: string;
    isFavorite?: boolean;
  } | null;
  onFavoriteToggle?: (videoId: string) => void;
}

export default function VideoModal({ 
  visible, 
  onClose, 
  video, 
  onFavoriteToggle 
}: VideoModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (visible && video) {
      setIsFavorite(video.isFavorite || false);
    }
  }, [visible, video]);

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onFavoriteToggle && video) {
      onFavoriteToggle(video.id);
    }
  };

  if (!video) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1}>
              {video.title}
            </Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
              <FontAwesome
                name={isFavorite ? "heart" : "heart-o"}
                size={20}
                color={isFavorite ? "#ff6b6b" : "#ffffff"}
              />
            </TouchableOpacity>
          </View>

          {/* Video Placeholder */}
          <View style={styles.videoPlaceholder}>
            <FontAwesome name="play-circle" size={60} color="#ffffff" />
            <Text style={styles.placeholderText}>Video Player</Text>
          </View>

          {/* Video Info */}
          <View style={styles.videoInfo}>
            <Text style={styles.artistText}>{video.artist}</Text>
            <Text style={styles.uploadDateText}>
              Uploaded on {video.uploadDate}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#242632',
    borderRadius: 16,
    width: width * 0.9,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 12,
  },
  videoInfo: {
    padding: 16,
  },
  artistText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  uploadDateText: {
    fontSize: 14,
    color: '#888888',
  },
});
