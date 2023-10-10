import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-simple-toast';
import * as Permissions from 'expo-permissions';

function LocalScreen() {
  const videoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Request the CAMERA_ROLL permission when the component mounts
    requestCameraRollPermission();
  }, []);

  const requestCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.error('Permission to access CAMERA_ROLL was denied');
    }
  };

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
      if (result.type === 'success') {
        setSelectedVideo(result);
        Toast.show('Video loaded successfully', Toast.LONG);
      }
    } catch (error) {
      console.error('Error picking a video:', error);
    }
  };

  const playSelectedVideo = async () => {
    if (videoRef.current && selectedVideo) {
      const fileUri = `file://${selectedVideo.uri}`;
      await videoRef.current.loadAsync({ uri: fileUri });
      await videoRef.current.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expo AV Video Example</Text>
      <Video
        ref={videoRef}
        style={styles.video}
        useNativeControls
      />
      {selectedVideo ? (
        <Text>Selected Video: {selectedVideo.name}</Text>
      ) : (
        <Text>No video selected</Text>
      )}
      <Button title="Pick a Video" onPress={pickVideo} />
      <Button title="Play Selected Video" onPress={playSelectedVideo} />
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
});

export default LocalScreen;
