import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react';
import MEDITATION_IMAGES from '../../constants/meditation-image'
import { AntDesign} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/customButton";
import { Audio } from 'expo-av';
import { TimerContext } from '../../context/time';
import {MEDITATION_DATA, AUDIO_FILES} from "../../constants/meditation-data"

const Sound = () => {
  const { id, image } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } =
        useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState(null);
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  const stopSound = useCallback(async () => {
    if (audioSound) {
      await audioSound.stopAsync();
      setPlayingAudio(false);
    }
  }, [audioSound]);

  useEffect(() => {
    let timerId;

    if (secondsRemaining === 0){
      setMeditating(false);
      stopSound();
      router.push('../mood-logging');
      return;
    }
    if (isMeditating) {
      timerId = setTimeout(() => {
          setDuration(prev => prev - 1);
      },1000);
    }

    return () => {
        clearTimeout(timerId);
    };
  },[secondsRemaining, isMeditating, stopSound]);

  useEffect(()=>{
    return () => {
      if (audioSound) {
        audioSound.unloadAsync();
      }
    }
  }, [audioSound])

  const toggleMeditationSessionStatus = async() => {
    if (secondsRemaining === 0) setDuration(10);

    setMeditating(prev => !prev);

    await toggleSound();
  }

  const toggleSound = async () => {
    try {
      if (!audioSound) {
        const sound = await startSound();
        await sound.playAsync();
        setPlayingAudio(true);
      } else {
        if (isPlayingAudio) {
          await audioSound.pauseAsync();
          setPlayingAudio(false);
        } else {
          await audioSound.playAsync();
          setPlayingAudio(true);
        }
      }
    } catch (error) {
      console.error("Error toggling sound:", error);
    }
  };

  const startSound = async() => {
    try {
      const audioFileName = MEDITATION_DATA[Number(id)-1].audio;
      const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
      setSound(sound);
      return sound;
    } catch (error) {
      console.error("Error starting sound:", error);
    }
  }

  const AdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/adjustTimer");
  };

  const getImage = useCallback(() => {
    const meditationItem = MEDITATION_DATA.find(item => item.id === Number(id));
    if (!meditationItem) {
      console.log("Meditation item not found for id:", id);
      return MEDITATION_IMAGES.mountainOne; // fallback image
    }
    const imageKey = meditationItem.image;
    const selectedImage = MEDITATION_IMAGES[imageKey];
    return selectedImage || MEDITATION_IMAGES.mountainOne;
  }, [id]);

  return (
    <View className="flex-1">
      <ImageBackground
          source={getImage()}
          resizeMode="cover"
          className="flex-1"
      >
        <Pressable
           onPress={() => router.back()}
           className="absolute top-14 left-8 z-10">
            <AntDesign name="leftcircle" size={34} color="black" />
        </Pressable>
        <View className="flex-1 justify-center">
          <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
            <Text className="text-4xl text-black-800 font-rmono">
            {Math.floor(secondsRemaining / 60).toString().padStart(2, '0')}:{(secondsRemaining % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        </View>
        <View className="mb-2">
          <CustomButton
            title={isMeditating ? "Stop Meditating" : "Start Meditating"}
            handlePress={toggleMeditationSessionStatus}
          />
        </View>
        <View className="mb-3">
          <CustomButton
            title="Adjust Timer"
            handlePress={AdjustDuration}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

export default Sound
