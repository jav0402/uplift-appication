import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from 'moment';
import CustomButton from '../../components/customButton';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
    const { user } = useGlobalContext();
    const [greeting, setGreeting] = useState('');
    const [selectedMood, setSelectedMood] = useState(null);

    useEffect(() => {
        // Set dynamic greeting based on the time of day
        const name = user?.name;
        const hour = moment().hour();
        if (hour < 12) setGreeting(`Good Morning, ${name}`);
        else if (hour < 18) setGreeting(`Good Afternoon, ${name}`);
        else setGreeting(`Good Evening, ${name}`);
    }, []);

    const handleMoodSelection = (mood) => {
        setSelectedMood(mood);
        router.push('../../mood-logging');
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
                        handlePress={() => router.push('../quiz')}
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
                    </View>
                </View>

                {/* Activity Tracker Section */}
                <View className='px-5 py-5'>
                    <Text className='text-xl font-semibold text-black mb-3'>Today's Activity</Text>
                    <View className='bg-amber-50 rounded-lg p-4 shadow'>
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
                            className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'Great' ? 'bg-green-300' : 'bg-secondary'}`}
                            onPress={() => handleMoodSelection('Great')}
                        >
                            <FontAwesome6 name="face-grin-beam" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'Happy' ? 'bg-amber-200' : 'bg-secondary'}`}
                            onPress={() => handleMoodSelection('Happy')}
                        >
                            <FontAwesome6 name="face-smile" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'Neutral' ? 'bg-gray-200' : 'bg-secondary'}`}
                            onPress={() => handleMoodSelection('Neutral')}
                        >
                            <FontAwesome6 name="face-meh" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'Sad' ? 'bg-blue-300' : 'bg-secondary'}`}
                            onPress={() => handleMoodSelection('Sad')}
                        >
                            <FontAwesome6 name="face-frown" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`w-16 h-16 rounded-full items-center justify-center ${selectedMood === 'Terrible' ? 'bg-red-300' : 'bg-secondary'}`}
                            onPress={() => handleMoodSelection('Terrible')}
                        >
                            <FontAwesome6 name="face-dizzy" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Journal Section */}
                <View className='px-5 py-5'>
                    <Text className='text-xl font-semibold text-black mb-3'>Journal</Text>
                    <TouchableOpacity
                        className='bg-amber-50 rounded-lg p-4 shadow'
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
                            handlePress={() => router.push('../resource')}
                            color="#FF8C00"
                            containerStyles='mt-6 w-1/2 mr-2'
                        />
                    </View>
                </View>

                {/* Footer Section */}
                <View className='flex-1 justify-end px-5 pb-10'>
                    <Text className='text-center text-gray-600'>Take a deep breath and remember, it's okay to take things one step at a time.</Text>
                    <Text className='text-center text-gray-600 mt-3'>Help is available:</Text>
                    <Text className='text-center text-gray-600'>Samaritans of Singapore: 1-767</Text>
                    <Text className='text-center text-gray-600'>Tinkle Friend: 1800-2744-788</Text>
                    <Text className='text-center text-gray-600'>Singapore Association for Mental Health Helpline: 1800-283-7019</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
