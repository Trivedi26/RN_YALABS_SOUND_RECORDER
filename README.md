🎙️ YALABS Audio Recorder

## A React Native audio recording app built with Expo, allowing users to record, pause/resume, stop, and play multiple recordings with live visual feedback. This project demonstrates a production-ready mobile recording experience with background support and interruption handling.

## Demo

[Watch the demo video](assets/demo.mp4)

## Features

Record audio with high-quality settings

Pause and resume recording at any time

Stop recording and save files

Play saved recordings

Live recording timer

Audio level meter for visual feedback

Maintain recordings in the background

Handle interruptions such as phone calls or other apps

Save multiple recordings with a scrollable list

Clean dark-themed UI


Recording screen with timer & meter

List of saved recordings

## Installation

## Clone the repository

git clone https://github.com/yourusername/yallabs-audio-recorder.git
cd yallabs-audio-recorder


## Install dependencies

npm install
# or
yarn install


## Run the app

expo start


Use Expo Go on your iOS or Android device, or an emulator.

# Usage

Open the app.

Press Record to start recording.

Use Pause/Resume to temporarily stop and continue recording.

Press Stop to finish the recording.

Saved recordings appear in a list; tap Play to listen.

Recordings continue if the app goes to the background.

Dependencies

React Native

Expo SDK

expo-av – for audio recording and playback

@expo/vector-icons – for UI icons

Technical Details

Background recording: Enabled using staysActiveInBackground in Audio.setAudioModeAsync.

Interruption handling: Uses InterruptionModeIOS.DoNotMix and InterruptionModeAndroid.DuckOthers.

Metering: Live audio levels captured via recording.setOnRecordingStatusUpdate.

Timer: Tracks recording duration with a live timer.

Multiple recordings: Saved in a list with unique names (Recording 1, Recording 2, etc.) and played independently.

Folder Structure
/assets
  └─ icons/
App.tsx
package.json
tsconfig.json
README.md


## License

This project is for demonstration purposes for YALABS assignment. No license restrictions.# RN_YALABS_SOUND_RECORDER
