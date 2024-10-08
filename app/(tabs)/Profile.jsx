import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'; // Import the progress bar
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import CustomButton from '../../components/customButton';
import { signOut } from '../../lib/user';

const Profile = () => {

    const { user, setUser, setIsLogged } = useGlobalContext();

    // Hardcoded goals, to be replaced with data from db
    const goals = [
        { id: '1', title: 'Mindful Moments Achiever', description: 'Practice mindfulness daily!', progress: 360, total: 500 },
        { id: '2', title: 'Weekend Warrior', description: 'Two self-care activities on', progress: 1, total: 2 },
        { id: '3', title: 'Calm & Collected', description: 'Master 5 relaxation', progress: 4, total: 5 }
    ];

    const handleLogOut = () => {
        // Log out the user
        signOut()
            .then(() => {
                setUser(null)
                setIsLogged(false)
                router.replace('/')
            })
    }

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Header Section - settings, profile pic, username, bio */}
                <View className="flex-row items-center p-4">
                    <View className="flex-1">
                        <MaterialIcons
                            name="settings"
                            size={30}
                            color="black"
                            onPress={() => router.push('../settings')} />
                    </View>
                    <View className="flex-1 items-center">
                        <Image 
                        source={icons.profile} 
                        resizeMode='contain'
                        style={{ width: 100, height: 100, transform: [{ scale: 0.5 }], alignItems: 'center' }} 
                        />
                    </View>
                    <View className="flex-1"></View>
                </View>
                <View className="items-center">
                    <Text className="text-lg font-bold">{user?.name}</Text>
                    <Text className="text-sm text-gray-500">user bio</Text>
                </View>
                {/* Evaluations and Mood Tracking */}
                <View className="flex-row justify-around mt-4">
                    <View className="items-center">
                        <Text className="text-lg font-bold">15</Text>
                        <Text className="text-xs text-gray-500">Evaluations</Text>
                    </View>
                    <View className="border-r border-gray-300 mx-2"></View>
                    <View className="items-center">
                        <Text className="text-lg font-bold">24</Text>
                        <Text className="text-xs text-gray-500">Track mood</Text>
                    </View>
                </View>

                {/* Insights & Stats */}
                <View className="mt-8 px-4">
                    <Text className="text-lg font-bold">Insights & Stats</Text>
                    <View className="flex-row justify-around mt-4">
                        <View className="items-center">
                            <MaterialIcons name="library-books" size={24} color="black" />
                            <Text className="text-lg font-bold">149</Text>
                            <Text className="text-xs text-gray-500">Sessions completed</Text>
                        </View>
                        <View className="items-center">
                            <MaterialIcons name="local-fire-department" size={24} color="black" />
                            <Text className="text-lg font-bold">18 900</Text>
                            <Text className="text-xs text-gray-500">Mood tracking</Text>
                        </View>
                        <View className="items-center">
                            <FontAwesome name="trophy" size={24} color="black" />
                            <Text className="text-lg font-bold">53</Text>
                            <Text className="text-xs text-gray-500">Achievements unlocked</Text>
                        </View>
                    </View>
                </View>

                {/* Milestones & Goals */}
                <View className="mt-8 px-4">
                    <Text className="text-lg font-bold">Milestones & Goals</Text>
                    {goals.map((goal) => (
                        <View key={goal.id} className="mt-4 p-4 bg-gray-300 rounded-lg">
                            <Text className="text-sm font-bold">{goal.title}</Text>
                            <Text className="text-xs text-gray-500">{goal.description}</Text>
                            <View className="mt-2">
                                <Progress.Bar
                                    progress={goal.progress / goal.total}
                                    width={null}
                                    color="#FBBF24"
                                    unfilledColor="#E5E7EB"
                                    borderWidth={0}
                                />
                                <Text className="text-xs text-right text-gray-500 mt-1">
                                    {goal.progress}/{goal.total}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View className="flex-1 justify-center items-center">
                    <CustomButton  
                        title="Log Out" 
                        handlePress={handleLogOut} 
                        containerStyles="mt-5 w-1/2"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

