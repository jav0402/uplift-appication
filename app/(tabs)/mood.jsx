import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BarChart } from 'react-native-gifted-charts';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

const screenWidth = Dimensions.get('window').width;

// Static data for now
function getStaticMoodLogs() {
    const moodLogs = [
        { mood: 'Great', factors: ['Work', 'Family'], date: new Date() },
        { mood: 'Neutral', factors: ['Friends', 'Love'], date: new Date(Date.now() - 86400000) }, // 1 day ago
        { mood: 'Happy', factors: ['Work'], date: new Date(Date.now() - 2 * 86400000) }, // 2 days ago
        { mood: 'Terrible', factors: ['Health'], date: new Date(Date.now() - 3 * 86400000) }, // 3 days ago
        { mood: 'Sad', factors: ['Money'], date: new Date(Date.now() - 4 * 86400000) }, // 4 days ago
        { mood: 'Terrible', factors: ['Love'], date: new Date(Date.now() - 5 * 86400000) }, // 5 days ago
        { mood: 'Terrible', factors: ['Love'], date: new Date(Date.now() - 15 * 86400000) }, // 15 days ago
        { mood: 'Great', factors: ['Family'], date: new Date(Date.now() - 17 * 86400000) }, // 17 days ago
    ];
    return moodLogs;
}

const Mood = () => {
    // State for chart time range (days, weeks, months)
    const [timeRange, setTimeRange] = useState('days');
    // State to toggle between moods and factors
    const [viewType, setViewType] = useState('moods');

    const {user} = useGlobalContext();
    // Fetches mood data for the current user
    const {data: moodLogs, isLoading, refetch} = dataHook(() => getMoodData(user));

     // Mapping moods to icons and colors, factors to name and icons
     const moods = {
        Terrible: { color: '#fc8181', icon: 'face-dizzy' },
        Sad: { color: '#90cdf4', icon: 'face-frown' },
        Neutral: { color: '#a0aec0', icon: 'face-meh' },
        Happy: { color: '#f6e05e', icon: 'face-smile' },
        Great: { color: '#68d391', icon: 'face-grin-beam' },
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

    // Filter logs by time range
    const filterMoodLogs = (logs, range) => {
        const now = new Date();
        let filteredLogs = logs.filter((log) => {
            if (range === 'days') {
                return log.date >= new Date(now.getTime() - 86400000);
            } else if (range === 'weeks') {
                return log.date >= new Date(now.getTime() - 7 * 86400000);
            } else if (range === 'months') {
                return log.date >= new Date(now.getTime() - 30 * 86400000);
            }
            return true;
        });
        return filteredLogs;
    };
    const filteredLogs = filterMoodLogs(moodLogs, timeRange);

    // Init counts and chart data
    const moodCounts = { Great: 0, Happy: 0, Neutral: 0, Sad: 0, Terrible: 0 };
    const factorCounts = {};

    // Count increment logic
    filteredLogs.forEach(log => {
        if (moodCounts[log.mood] !== undefined) {
            moodCounts[log.mood] += 1;
        }
        log.factors.forEach(factor => {
            factorCounts[factor] = (factorCounts[factor] || 0) + 1;
        });
    });

    // Set up data for bar chart
    const barChartData =
        viewType === 'moods'
            ? Object.keys(moodCounts).map((mood) => ({
                  label: mood,
                  value: moodCounts[mood],
                  frontColor: moods[mood].color,
              }))
            : Object.keys(factorCounts).map((factor) => ({
                  label: factor,
                  value: factorCounts[factor],
                  frontColor: '#8884d8',
              }));

    // Get the most frequent mood
    const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);

    // Get the most impactful factor
    const mostImpactfulFactor = Object.keys(factorCounts).length > 0
    ? Object.keys(factorCounts).reduce((a, b) => factorCounts[a] > factorCounts[b] ? a : b)
    : 'None';

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
                {/* Page header */}
                <Text className="text-3xl text-black font-bold m-5">Mood Stats</Text>
                {/* Time range selection row */}
                <View className="flex-row justify-center items-center mx-6 my-4 p-2 bg-white rounded-full">
                    {['days', 'weeks', 'months'].map((range) => (
                        <TouchableOpacity
                        key={range}
                        onPress={() => setTimeRange(range)}
                        className={`flex-1 py-3 rounded-full ${
                            timeRange === range ? 'bg-orange-300' : 'bg-transparent'
                        }`}
                        >
                        <Text className={`text-center text-base capitalize ${timeRange === range ? 'text-black' : 'text-gray-500'}`}>
                        {range}
                        </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* Mood or Factor toggle */}
                <View className="flex-row justify-center self-center p-2 w-[50%] bg-white rounded-full">
                    {/* Moods */}
                    <TouchableOpacity
                    onPress={() => setViewType('moods')}
                    className={`flex-1 py-3 rounded-full ${
                        viewType === 'moods' ? 'bg-orange-300' : 'bg-transparent'
                    }`}
                    >
                    <Text className={`text-center text-xs ${viewType === 'moods' ? 'text-black' : 'text-gray-500'}`}>Moods</Text>
                    </TouchableOpacity>
                    {/* Factors */}
                    <TouchableOpacity
                    onPress={() => setViewType('factors')}
                    className={`flex-1 py-3 rounded-full ${
                        viewType === 'factors' ? 'bg-orange-300' : 'bg-transparent'
                    }`}
                    >
                    <Text className={`text-center ${viewType === 'factors' ? 'text-black' : 'text-gray-500'}`}>Factors</Text>
                    </TouchableOpacity>
                </View>

                {/* Bar Chart for Mood or Factor Counts */}
                <View className="bg-amber-50 rounded-2xl m-4 w-[90%] self-center items-center p-4">
                    <Text className="text-lg text-black font-semibold mb-4">{viewType === 'moods' ? 'Mood History' : 'Factor History'}</Text>
                    <BarChart
                    data={barChartData}
                    barWidth={30}
                    roundedTop
                    height={200}
                    width={screenWidth *0.6}
                    isAnimated
                    showScrollIndicator
                    noOfSections={5}
                    maxValue={10}
                    backgroundColor={"#fffbeb"}
                    xAxisLabelTextStyle={{ color: 'black', fontSize: 12 }}
                    // Show name and qty on press
                    renderTooltip={(item) => {
                        return (
                            <View
                            style={{
                            marginBottom: 20,
                            marginLeft: -15,
                            backgroundColor: '#ffcefe',
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                            borderRadius: 4,
                            }}
                            >
                            <Text>{`${item.label}: ${item.value}`}</Text>
                            </View>
                        );
                    }}
                    />
                </View>

                {/* Summary stats */}
                <View className="flex-row justify-between self-center w-[90%] m-4">
                    {/* Most frequent mood */}
                    <View
                    className="w-[48%] h-24 rounded-xl justify-center items-center"
                    // For dynamic color changing
                    style={{ backgroundColor: moods[mostFrequentMood].color }}
                    >
                        <Text className="text-white text-base font-semibold">Most Frequent Mood</Text>
                        <Text className="text-white text-2xl font-bold ml-2 mt-2">{mostFrequentMood}</Text>
                    </View>
                    {/* Most frequent factor */}
                    <View className="w-[48%] h-24 rounded-xl justify-center items-center" style={{backgroundColor: "#8884d8"}}>
                        <Text className="text-white text-base font-semibold">Most Frequent Factor</Text>
                        <View className="flex-row items-center mt-2">
                            <FontAwesome6 name={factorsList.find(f => f.name === mostImpactfulFactor).icon} size={24} color="white" />
                            <Text className="text-white text-2xl font-bold ml-2">{mostImpactfulFactor}</Text>
                        </View>
                    </View>
                </View>

                {/* Mood Counts */}
                <View className="bg-amber-50 rounded-2xl m-4 w-[90%] self-center">
                    {/* Title */}
                    <Text className="text-lg text-black font-psemibold m-4">Mood History</Text>
                    {/* Display icons and counts for each mood */}
                    <View className="flex-row justify-around py-4">
                        {Object.keys(moodCounts).map((key) => (
                            <View key={key} className="items-center">
                                <FontAwesome6 name={moods[key].icon} size={40} color={moods[key].color} />
                                <Text className="text-black mt-2">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${moodCounts[key]}`}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Factor Counts */}
                <View className="bg-amber-50 rounded-2xl m-4 w-[90%] self-center">
                    {/* Title */}
                    <Text className="text-lg text-black font-psemibold m-4">Factors History</Text>
                    {/* Allow horizontal scrolling */}
                    <ScrollView className="flex-row m-4" horizontal={true} showsHorizontalScrollIndicator={false}>
                        {Object.entries(factorCounts)
                            .sort(([,a], [,b]) => b-a) // Sort factors by count in descending order
                            .map(([key, value]) => (
                                <View key={key} className="mx-4 items-center">
                                    <FontAwesome6 name={factorsList.find((f) => f.name === key)?.icon} size={30} color="#8884d8" />
                                    <Text className="text-black mt-2 text-center">{`${key}: ${value}`}</Text>
                                </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

                {/* Button navigating to log new mood page */}
                <View className="absolute bottom-4 w-full items-center">
                    <TouchableOpacity
                    className="bg-white items-center justify-center rounded-full w-16 h-16"
                    onPress={() => router.push('../mood-logging')}
                    >
                    <Text className="text-black text-2xl">+</Text>
                    </TouchableOpacity>
                </View>

        </SafeAreaView>
    );
};

export default Mood;
