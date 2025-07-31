import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (visible && video) {
      setIsFavorite(video.isFavorite || false);
      setPlaying(true);
    } else {
      setPlaying(false);
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
      {/* Modal Overlay */}
      <View style={styles.modalOverlay}>
        {/* Touchable overlay to close modal when touching outside */}
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          activeOpacity={1} 
          onPress={onClose}
        >
          {/* Modal Content */}
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()} // Prevent closing when touching inside modal
          >
            {/* Modal Header */}
            {/* <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.modalTitle} numberOfLines={1}>
                {video.title}
              </Text>
              <TouchableOpacity onPress={toggleFavorite}>
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={20}
                  color={isFavorite ? "#ff6b6b" : "#ffffff"}
                />
              </TouchableOpacity>
            </View> */}

            {/* YouTube Player */}
            <YoutubePlayer
              height={(width * 9) / 16}
              width="100%"
              videoId={video.id}
              play={playing}
              onStateChange={(event: any) => {
                if (event === "ended") {
                  setPlaying(false);
                  onClose();
                }
              }}
              onReady={() => console.log("Player ready")}
              onError={(e: any) => console.log(e)}
              initialPlayerParams={{
                preventFullScreen: false,
                cc_lang_pref: "us",
                showClosedCaptions: true
              }}
            />

            {/* <View style={styles.videoInfo}>
              <Text style={styles.artistText}>
                Artist: {video.artist}
              </Text>
              <Text style={styles.uploadDateText}>
                Uploaded on: {video.uploadDate}
              </Text>
            </View> */}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Changed from 0.9 to 0.5 for more transparency
  },
  overlayTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 16,
    width: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "white",
    marginHorizontal: 10,
  },
  videoInfo: {
    marginTop: 16,
  },
  artistText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  uploadDateText: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
  },
});
