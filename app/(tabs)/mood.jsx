import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Mood = () => {
  // Default mood set to 'neutral'
  const [mood, setMood] = useState('neutral');
  // Hide factor selection display by default
  const [factors, setFactors] = useState(false);
  
  const [selectedFactors, setSelectedFactors] = useState([]);

  /**
   * Toggle display from mood selection to factor selection
   * @param selectedMood - current mood selected
   * If at mood selection display, setFactors = true and toggle to factor selection
   * If at factor selection, toggle back to mood selection and reset any selected factors
   */
  const toggleDisplay = (selectedMood) => {
    !factors ? (setMood(selectedMood), setFactors(true)) : (setFactors(false), setSelectedFactors([]))
  }
  const toggleFactor = (factor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((item) => item !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  }
  // Placeholder function, to be replaced with data storing statements
  const storeData = () => {
    console.log("Mood data saved");
  }

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

  // Factors data, name and icon
  const factorsList = [
    { name: 'Work', icon: 'briefcase' },
    { name: 'School', icon: 'book' },
    { name: 'Love', icon: 'heart' },
    { name: 'Friends', icon: 'user-group' },
    { name: 'Family', icon: 'house-chimney' },
    { name: 'Money', icon: 'money-bill' },
    { name: 'Health', icon: 'heart-pulse' },
    { name: 'Life', icon: 'user-large' },
    { name: 'None', icon: 'times-circle' },
  ];

  return (
    // Background set to selected mood colour
    <SafeAreaView className={`flex-1 ${moods[mood].color} justify-center items-center`}>
      <View className="flex-1 justify-evenly">
        {/* Default: display mood selection */}
        {!factors ? (
          // Mood selection display
          <>
            {/* Main header display*/}
            <View className="items-center">
              <Text className="text-white text-4xl font-bold text-center">How are you feeling today?</Text>
            </View>
            {/* Current selected mood icon and text display*/}
            <View className="items-center">
              <FontAwesome6 name={moods[mood].icon} size={150} color="white" />
              <Text className="text-white text-2xl mt-4">I'm Feeling {moods[mood].text}</Text>
            </View>
            {/* Mood selection and buttons display */}
            <View className="items-center">
              {/* Mood selection */}
              <View className="flex-row">
                {Object.keys(moods).map((key) => (
                  // User interaction component 
                  <TouchableOpacity
                    key={key}
                    // Set mood as current mood
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
              {/* Set Mood button */}
              <TouchableOpacity 
                className="bg-white py-4 px-8 mt-8 rounded-full w-full"
                // Switch to factor selection display
                onPress={()=> toggleDisplay(mood)}
              >
                <Text className="text-black text-lg font-bold text-center">Set Mood</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // Factor selection display
          <>
            {/* Main header display */}
            <View className="items-center">
              <Text className="text-white text-4xl font-bold text-center">What are the factors affecting your mood?</Text>
            </View>
            {/* Factor selection and buttons display */}
            <View className="items-center">
              {/* Factors selection */}
              <View className="flex-row flex-wrap justify-around w-full">
                {factorsList.map((factor, index) => (
                  <TouchableOpacity
                    key={index}
                    // Change background colour when selected
                    className={`p-4 m-2 rounded-lg w-24 items-center ${selectedFactors.includes(factor.name) ? 'bg-orange-300' : 'bg-white'}`}
                    // Toggle factor selection
                    onPress={() => toggleFactor(factor.name)}
                  >
                    <FontAwesome6 name={factor.icon} color='black' size={30}
                    />
                    <Text className="text-black mt-2 text-center">{factor.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Save Factors button */}
              <TouchableOpacity
                className="bg-white py-4 px-8 mt-8 rounded-full w-[90%]"
                onPress={storeData}
              >
                <Text className="text-black text-lg font-bold text-center">Save Factors</Text>
              </TouchableOpacity>
              {/* Back button - to mood selection */}
              <TouchableOpacity
                className="bg-black py-4 px-8 mt-8 rounded-full w-[90%]"
                onPress={()=> toggleDisplay(mood)}
              >
                <Text className="text-white text-lg font-bold text-center">Back</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Mood