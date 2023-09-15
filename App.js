import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const videoUri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  const pauseVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expo AV Video Example</Text>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: videoUri }}
        useNativeControls // Enables native playback controls (play, pause, etc.)
        resizeMode="contain" // Adjust this based on your video's aspect ratio
        onPlaybackStatusUpdate={(newStatus) => setStatus(() => newStatus)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Play" onPress={playVideo} />
        <Button title="Pause" onPress={pauseVideo} />
      </View>
      <Text style={styles.status}>
        Status: {status.isPlaying ? 'Playing' : 'Paused'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  status: {
    marginTop: 10,
  },
});
