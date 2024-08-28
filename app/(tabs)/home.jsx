import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import moment from 'moment';
import CustomButton from '../../components/customButton';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [activityData, setActivityData] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    // Set dynamic greeting based on the time of day
    const hour = moment().hour();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Simulate fetching data
    fetchData();

    // Set up notifications
    setupNotifications();
  }, []);

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
    Alert.alert(`You've selected: ${mood}`);

    if (mood === 'very dissatisfied') {
      Alert.alert('We are here to help', 'Consider talking to someone or trying a calming activity.');
      // Navigate to a support page or resource
    }
  };

  const fetchData = async () => {
    try {
      // Simulate an API call
      const response = await fetch('https://api.example.com/activity');
      const data = await response.json();
      setActivityData(data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupNotifications = () => {
    // Logic for setting up push notifications
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        {/* Header Section */}
        <View className='flex-row justify-between items-center px-5 py-3'>
          <Text className='text-2xl mt-10 font-semibold text-black'>{greeting}</Text>
          <TouchableOpacity onPress={() => router.push('../notifications')}>
            <MaterialIcons name="notifications" size={30} color="orange" />
          </TouchableOpacity>
        </View>

        {/* Inspirational Quote Section */}
        <View className='px-5 py-3'>
          <Text className='text-lg italic text-gray-600'>
            "Every day may not be good, but there's something good in every day."
          </Text>
        </View>

        {/* Self-Assessment Tool Navigation */}
        <View className='p-5'>
          <CustomButton
            title="Take Self-Assessment"
            handlePress={() => router.push('/quiz')}
            color="#FF8C00"
          />
        </View>

        {/* Quick Access Buttons */}
        <View className='px-5 py-5'>
          <Text className='text-xl font-semibold text-black mb-3'>Quick Access</Text>
          <View className='flex-row justify-center'>
            <CustomButton
              title="Meditation"
              handlePress={() => router.push('/meditation')}
              color="#FF8C00"
              containerStyles='mt-6 w-1/2 mr-2'
            />
            <CustomButton
              title="Breathing"
              handlePress={() => router.push('/breathing')}
              color="#FF8C00"
              containerStyles='mt-6 w-1/2 ml-2'
            />
          </View>
        </View>

        {/* Activity Tracker Section */}
        {/* <View className='px-5 py-5'>
          <Text className='text-xl font-semibold text-black mb-3'>Today's Activity</Text>
          <View className='bg-white rounded-lg p-4 shadow'>
            {activityData ? (
              <>
                <Text className='text-base font-medium text-gray-800 mb-2'>Mindfulness Minutes</Text>
                <View className='h-2 bg-gray-300 rounded-full mb-3'>
                  <View className={`h-full bg-orange-400 rounded-full`} style={{ width: `${activityData.mindfulnessProgress}%` }} />
                </View>
                <Text className='text-sm text-gray-600'>{activityData.mindfulnessMinutes}/100 minutes</Text>

                <Text className='text-base font-medium text-gray-800 mt-4 mb-2'>Steps Taken</Text>
                <View className='h-2 bg-gray-300 rounded-full mb-3'>
                  <View className={`h-full bg-orange-400 rounded-full`} style={{ width: `${activityData.stepsProgress}%` }} />
                </View>
                <Text className='text-sm text-gray-600'>{activityData.steps}/10,000 steps</Text>
              </>
            ) : (
              <Text className='text-gray-600'>No activity data available.</Text>
            )}
          </View>
        </View> */}

        {/* Activity Tracker Section */}
        <View className='px-5 py-5'>
          <Text className='text-xl font-semibold text-black mb-3'>Today's Activity</Text>
          <View className='bg-white rounded-lg p-4 shadow'>
            <Text className='text-base font-medium text-gray-800 mb-2'>Mindfulness Minutes</Text>
            <View className='h-2 bg-gray-300 rounded-full mb-3'>
              <View className='h-full bg-orange-400 rounded-full w-1/2' />
            </View>
            <Text className='text-sm text-gray-600'>50/100 minutes</Text>

            <Text className='text-base font-medium text-gray-800 mt-4 mb-2'>Steps Taken</Text>
            <View className='h-2 bg-gray-300 rounded-full mb-3'>
              <View className='h-full bg-orange-400 rounded-full w-3/4' />
            </View>
            <Text className='text-sm text-gray-600'>7,500/10,000 steps</Text>
          </View>
        </View>



        {/* Daily Check-In Section */}
        <View className='px-5 py-5'>
          <Text className='text-xl font-semibold text-black mb-3'>How are you feeling today?</Text>
          <View className='flex-row justify-around'>
            <TouchableOpacity
              className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'very satisfied' ? 'bg-green-500' : 'bg-secondary'}`}
              onPress={() => handleMoodSelection('very satisfied')}
            >
              <MaterialIcons name="sentiment-very-satisfied" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'satisfied' ? 'bg-green-400' : 'bg-secondary'}`}
              onPress={() => handleMoodSelection('satisfied')}
            >
              <MaterialIcons name="sentiment-satisfied" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'neutral' ? 'bg-yellow-500' : 'bg-secondary'}`}
              onPress={() => handleMoodSelection('neutral')}
            >
              <MaterialIcons name="sentiment-neutral" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'dissatisfied' ? 'bg-orange-500' : 'bg-secondary'}`}
              onPress={() => handleMoodSelection('dissatisfied')}
            >
              <MaterialIcons name="sentiment-dissatisfied" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'very dissatisfied' ? 'bg-red-500' : 'bg-secondary'}`}
              onPress={() => handleMoodSelection('very dissatisfied')}
            >
              <MaterialIcons name="sentiment-very-dissatisfied" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

       {/* Journal Section */}
        <View className='px-5 py-5'>
          <Text className='text-xl font-semibold text-black mb-3'>Journal</Text>
          <TouchableOpacity 
            className='bg-white rounded-lg p-4 shadow'
            onPress={() => router.push('../journal')}
          >
            <Text className='text-base text-gray-800'>Reflect on your day...</Text>
            <Text className='text-sm text-gray-500'>Click here to start writing</Text>
          </TouchableOpacity>
        </View>

        {/* Resources Section */}
        <View className='px-5 py-5'>
          <Text className='text-xl font-semibold text-black mb-3'>Resources</Text>
          <View className='flex-row justify-center'>
            <CustomButton
              title="Articles"
              onPress={() => router.push('../articles')}
              color="#FF8C00"
              containerStyles='mt-6 w-1/2 mr-2'
            />
            <CustomButton
              title="Podcasts"
              onPress={() => router.push('../podcasts')}
              color="#FF8C00"
              containerStyles='mt-6 w-1/2 ml-2'
            />
          </View>
        </View>

        {/* Footer Section */}
        <View className='flex-1 justify-end px-5 pb-10'>
          <Text className='text-center text-gray-600'>Take a deep breath and remember, it's okay to take things one step at a time.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
