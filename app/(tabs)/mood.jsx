import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
// import { LineChart } from 'react-native-chart-kit';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

function getStaticMoodLogs() {
    const moodLogs = [
        { mood: 'great', factors: ['Work', 'Family'], date: new Date() },
        { mood: 'neutral', factors: ['Friends', 'Love'], date: new Date(Date.now() - 86400000) }, // 1 day ago
        { mood: 'happy', factors: ['Work'], date: new Date(Date.now() - 2 * 86400000) }, // 2 days ago
        { mood: 'terrible', factors: ['Health'], date: new Date(Date.now() - 3 * 86400000) }, // 3 days ago
        { mood: 'sad', factors: ['Money'], date: new Date(Date.now() - 4 * 86400000) }, // 4 days ago
        { mood: 'terrible', factors: ['Love'], date: new Date(Date.now() - 5 * 86400000) }, // 5 days ago
    ];
    return moodLogs;
}

const Mood = () => {
    // State for chart time range (days, weeks, months)
    const [timeRange, setTimeRange] = useState('days');
    const [moodLogs, setMoodLogs] = useState([]);

    // Load data on component mount (replace with actual data fetching)
    useEffect(() => {
        // Using static data for now
        const moodLogs = getStaticMoodLogs();
        setMoodLogs(moodLogs);
    }, []);

    // Filter by time
    const filterMoodLogsByTimeRange = (logs, range) => {
        const now = new Date();
        let filteredLogs = logs;
        if (range === 'days') {
            filteredLogs = logs.filter(log => log.date >= new Date(now.getTime() - 86400000));
        } else if (range === 'weeks') {
            filteredLogs = logs.filter(log => log.date >= new Date(now.getTime() - 7 * 86400000));
        } else if (range === 'months') {
            filteredLogs = logs.filter(log => log.date >= new Date(now.getTime() - 30 * 86400000));
        }
        return filteredLogs;
    };
    const filteredLogs = filterMoodLogsByTimeRange(moodLogs, timeRange);

    // Init counts
    const moodCounts = {
        great: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        terrible: 0
    };
    const factorCounts = {};
    
    // Count increment logic 
    filteredLogs.forEach(log => {
        if (moodCounts[log.mood] !== undefined) {
            moodCounts[log.mood] += 1;
        }

        log.factors.forEach(factor => {
            if (factorCounts[factor]) {
                factorCounts[factor] += 1;
            } else {
            factorCounts[factor] = 1;
            }
        });
    });

    // Convert mood logs to chart data
    const moodLabels = filteredLogs.map(log => log.date.toDateString());
    const moodData = filteredLogs.map(log => {
        switch (log.mood) {
            case 'great': return 5;
            case 'happy': return 4;
            case 'neutral': return 3;
            case 'sad': return 2;
            case 'terrible': return 1;
            default: return 0;
        }
    });

    // Mapping moods to icons and colors, factors to name and icons
    const moods = {
        terrible: { color: '#fc8181', icon: 'face-dizzy' },
        sad: { color: '#90cdf4', icon: 'face-frown' },
        neutral: { color: '#a0aec0', icon: 'face-meh' },
        happy: { color: '#f6e05e', icon: 'face-smile' },
        great: { color: '#68d391', icon: 'face-grin-beam' },
    };
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
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
                {/* Page header */}
                <Text className="text-3xl text-black font-bold m-5">Mood Stats</Text>
                {/* Filter row */}
                <View className="flex-row justify-evenly items-center p-4">
                    {['days', 'weeks', 'months'].map((range) => (
                        <TouchableOpacity
                        key={range}
                        onPress={() => setTimeRange(range)}
                        className={`px-4 py-2 mx-1 rounded-full ${timeRange === range ? 'bg-secondary' : 'bg-black'}`}
                        >
                        <Text className="text-white capitalize">{range}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Line chart */}
                

                {/* Mood Counts */}
                <View className="bg-black rounded-2xl m-4 w-[90%] self-center">
                    {/* Title */}
                    <Text className="text-base text-white font-psemibold m-4">Mood History</Text>
                    {/* Display icons and counts for each mood */}
                    <View className="flex-row justify-around py-4"> 
                        {Object.keys(moodCounts).map((key) => (
                            <View key={key} className="items-center">
                                <FontAwesome6 name={moods[key].icon} size={40} color={moods[key].color} />
                                <Text className="text-white mt-2">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${moodCounts[key]}`}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                
                {/* Factor Counts */}
                <View className="bg-black rounded-2xl m-4 w-[90%] self-center">
                    {/* Title */}
                    <Text className="text-base text-white font-psemibold m-4">Factors History</Text>
                    {/* Allow horizontal scrolling */}
                    <ScrollView className="flex-row m-4" horizontal={true} showsHorizontalScrollIndicator={false}>
                        {Object.keys(factorCounts).map((key) => (
                            <View key={key} className="mx-4 items-center">
                                <FontAwesome6 name={factorsList.find((f) => f.name === key)?.icon} size={30} color="white" />
                                <Text className="text-white mt-2 text-center">{`${key}: ${factorCounts[key]}`}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

                {/* Button navigating to log new mood page */}
                <View className="absolute bottom-6 w-full items-center">
                    <TouchableOpacity
                    className="bg-black items-center justify-center rounded-full w-16 h-16"
                    onPress={() => router.push('../mood-logging')}
                    >
                    <Text className="text-white text-2xl">+</Text>
                    </TouchableOpacity>
                </View>
                    
        </SafeAreaView>
    );
};

export default Mood;