import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const configureAudio = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true, // keeps recording in background
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert("Permission to access microphone is required!");
        return;
      }

      await configureAudio();

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recording.setOnRecordingStatusUpdate((status) => {
        // Automatically handle interruptions
        if (status.isRecording) {
          // You could add visual metering here
        }
      });

      setRecording(recording);
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const pauseRecording = async () => {
    if (!recording) return;
    await recording.pauseAsync();
    setIsPaused(true);
  };

  const resumeRecording = async () => {
    if (!recording) return;
    await recording.startAsync();
    setIsPaused(false);
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    setIsPaused(false);

    await recording.stopAndUnloadAsync();

    const fileUri = recording.getURI();
    setUri(fileUri || null);
    console.log("Recording saved at:", fileUri);

    const { sound } = await recording.createNewLoadedSoundAsync();
    setSound(sound);
    setRecording(null);
  };

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎙️ YALABS Audio Recorder</Text>

      <View style={styles.controls}>
        {!isRecording ? (
          <TouchableOpacity style={styles.recordBtn} onPress={startRecording}>
            <Ionicons name="mic" size={40} color="white" />
            <Text style={styles.btnText}>Record</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.stopBtn}
              onPress={isPaused ? resumeRecording : pauseRecording}
            >
              <MaterialIcons
                name={isPaused ? "play-arrow" : "pause"}
                size={40}
                color="white"
              />
              <Text style={styles.btnText}>
                {isPaused ? "Resume" : "Pause"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.stopBtn} onPress={stopRecording}>
              <MaterialIcons name="stop" size={40} color="white" />
              <Text style={styles.btnText}>Stop</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={[styles.playBtn, !sound && { backgroundColor: "#ccc" }]}
          onPress={playSound}
          disabled={!sound}
        >
          <Ionicons name="play" size={40} color="white" />
          <Text style={styles.btnText}>Play</Text>
        </TouchableOpacity>
      </View>

      {uri && <Text style={styles.uri}>Saved at: {uri}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  recordBtn: {
    backgroundColor: "#e53935",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  stopBtn: {
    backgroundColor: "#fbc02d",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    marginHorizontal: 5,
  },
  playBtn: {
    backgroundColor: "#43a047",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  btnText: {
    marginTop: 8,
    color: "white",
    fontWeight: "600",
  },
  uri: {
    marginTop: 20,
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
  },
});
