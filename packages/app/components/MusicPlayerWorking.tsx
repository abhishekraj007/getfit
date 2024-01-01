import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { Button, YStack, Text } from '@t4/ui/src';

const songs = [
  {
    title: 'Smack it',
    uri: 'https://cdn.uppbeat.io/audio-files/1eaed6f18d69074e114db529f2bd7e46/be9090df76bd1923af2250eebeb65d50/f324270fc518db09f3ac5fbb30e4b18e/STREAMING-smack-it-soundroll-main-version-1708-02-21.mp3',
  },
  {
    title: 'I m gone',
    uri: 'https://cdn.uppbeat.io/audio-output/228/506/main-version/streaming-previews/STREAMING-im-gone-barry-dallas-main-version-03-00-1915.mp3',
  },
];

export function MusicPlayer() {
  const [sound] = useState(new Audio.Sound());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playSong = async () => {
    const song = songs[currentSongIndex];

    if (song) {
      await sound.unloadAsync();
      await sound.loadAsync({ uri: song.uri });
      await sound.playAsync();
    }
  };

  const stopSong = async () => {
    await sound.unloadAsync();
  };

  const nextSong = async () => {
    await sound.unloadAsync();
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    await playSong();
  };

  //   useEffect(() => {
  //     const subscription = sound.addListener('ended', nextSong);
  //     return () => {
  //       subscription.remove();
  //     };
  //    }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const status = await sound.getStatusAsync();

      console.log({ status });
      //   if (status.didJustFinish) {
      //     nextSong();
      //   }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <YStack space={4}>
      <Text>{songs[currentSongIndex]?.title}</Text>
      <Button onPress={() => playSong()}>Play</Button>
      <Button onPress={stopSong}>Stop</Button>
      <YStack space={2}>
        {songs.map((song, index) => (
          <Button
            key={index}
            onPress={() => {
              setCurrentSongIndex(index);
              playSong();
            }}
          >
            {song.title}
          </Button>
        ))}
      </YStack>
    </YStack>
  );
}
