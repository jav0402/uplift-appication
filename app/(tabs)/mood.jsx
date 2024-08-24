import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Mood = () => {
  // Default mood set to 'neutral'
  const [mood, setMood] = useState('neutral');

  // Moods data including colors, text, and icons
  const moods = {
    great: {
      color: 'bg-green-300',
      text: "Great",
      icon: 'face-grin-beam',
    },
    happy: {
      color: 'bg-yellow-300',
      text: "Happy",
      icon: 'face-smile',
    },
    neutral: {
      color: 'bg-gray-300',
      text: "Neutral",
      icon: 'face-meh',
    },
    sad: {
      color: 'bg-blue-300',
      text: "Sad",
      icon: 'face-frown',
    },
    terrible: {
      color: 'bg-yellow-700',
      text: "Terrible",
      icon: 'face-dizzy',
    },
  };

  return (
    // Background set to selected mood colour
    <SafeAreaView className={`flex-1 ${moods[mood].color} justify-center items-center`}>
      <View className="flex-1 justify-evenly">
        <View className="items-center">
          <Text className="text-white text-4xl font-bold text-center">How are you feeling today?</Text>
        </View>

        <View className="items-center">
          {/* Icon displaying current selected mood */}
          <FontAwesome6 name={moods[mood].icon} size={150} color="white" />
          {/* Text displaying current selected mood */}
          <Text className="text-white text-2xl mt-4">I'm Feeling {moods[mood].text}</Text>
        </View>

        <View className="items-center">
          {/* Mood selection */}
          <View className="flex-row">
            {Object.keys(moods).map((key) => (
              // User interaction component 
              <TouchableOpacity
                key={key}
                onPress={() => setMood(key)}
                className="mx-2"
                >
                {/* Display icons for user interaction */}
                <FontAwesome6
                  name={moods[key].icon}
                  size={40}
                  // Change colour when active
                  color={mood === key ? 'white' : 'black'}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Set mood button */}
          <TouchableOpacity className="bg-white py-4 px-8 mt-8 rounded-full w-full">
            <Text className="text-black text-lg font-bold text-center">Set Mood</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Mood