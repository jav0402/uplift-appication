import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/emptyState'
import { useGlobalContext } from '../../context/GlobalProvider';
import dataHook from '../../lib/dataHook';
import { getJournalData, sendJournalData } from '../../lib/data';

const Journal = () => {

    const { user } = useGlobalContext();

    const { data: entries, isLoading, refetch } = dataHook(async () => {
        const { success, data } = await getJournalData(user);
        if (success) return data;
        return [];
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [newEntry, setNewEntry] = useState({ title: '', content: '', feeling: '', theme: 'bg-white' });
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Color theme sets for entries (background colors)
    const colors = [
        'bg-white', 'bg-yellow-200', 'bg-blue-200', 'bg-pink-200', 'bg-green-200'
    ];

    // Store new journal entry
    const handleSaveEntry = async () => {
        // Validation: Ensure all fields are filled
        if (!newEntry.title.trim() || !newEntry.content.trim() || !newEntry.feeling.trim()) {
            Alert.alert('Validation Error', 'All fields are required!');
            return;
        }

        // Send post request to save new entry to db
        let entrySubmitted = await sendJournalData(user, newEntry);

        // If failed to save entry, show alert
        if (!entrySubmitted) {
            Alert.alert('Error', 'Failed to save entry');
            return;
        }

        // refetch entries
        await refetch();

        // Reset new entry state
        setNewEntry({ title: '', content: '', feeling: '', theme: 'bg-white' });
        // Close modal
        setModalVisible(false);
    };
    // Display existing entry
    const handleEntryPress = (entry) => {
        setSelectedEntry(entry);
        setModalVisible(true);
    };

    return (
        <SafeAreaView className="flex-1 bg-primary justify-center items-center">
            <View className="flex-1 justify-evenly w-full">
                {/* Journal entries list */}
                <FlatList
                    // Sort according to time, can be removed after retrieval is from db
                    data={entries.sort((a, b) => b.date - a.date)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        // Display entries, show full entry on press
                        <TouchableOpacity
                            className="h-24 overflow-hidden my-1"
                            onPress={() => handleEntryPress(item)}>
                            <View className={`p-4 m-2 rounded-lg ${item.theme}`}>
                                <Text className="font-bold text-xl text-black">{item.title}</Text>
                                <Text className="mt-2 text-base text-black">Feeling: {item.feeling}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    // List header
                    ListHeaderComponent={() => (
                        <Text className='text-3xl font-psemibold my-4 px-4 '>Journal</Text>
                    )}
                    // For empty state (No journal entries)
                    ListEmptyComponent={() => (
                        <EmptyState
                            title="No journal entries yet"
                            subtitle="Start penning down your thoughts down now!"
                        />
                    )}
                />
                {/* New entry button, absolute position at bottom of screen */}
                <View className="items-center">
                    <TouchableOpacity
                        className="absolute bottom-6 justify-center bg-black py-4 px-8 rounded-full w-[90%]"
                        onPress={() => {
                            // Display modal
                            setSelectedEntry(null);
                            setModalVisible(true);
                        }}
                    >
                        <Text className="text-white text-lg font-bold text-center">New Entry</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Entry Modal - existing and new entry display */}
            <Modal visible={modalVisible} animationType="slide">
                {/* Background color set to existing entry bg color or app primary color for new entry */}
                <SafeAreaView className={`flex-1 p-4 ${selectedEntry ? selectedEntry.theme : 'bg-primary'}`}>
                    {/* Header */}
                    <View className="mt-14">
                        <Text className="text-3xl font-bold">{selectedEntry ? '' : 'New Journal Entry'}</Text>
                    </View>
                    {/* For existing entry display */}
                    {selectedEntry ? (
                        <>
                            <View className="flex-1 justify-between">
                                {/* Display title and content, following set color scheme */}
                                {/* Allow for scrollable content and flexbox layout to take up full height */}
                                <ScrollView className="flex-1">
                                    <Text className="font-bold text-3xl mt-4 text-black">{selectedEntry.title}</Text>
                                    <Text className="mt-2 text-xl text-black">Feeling: {selectedEntry.feeling}</Text>
                                    <Text className="mt-2 text-base text-black">{selectedEntry.content}</Text>
                                </ScrollView>
                                {/* Back button, absolute position at bottom of screen */}
                                <View className="items-center">
                                    <TouchableOpacity
                                        className="absolute bottom-20 justify-center bg-gray-400 py-4 px-8 mt-8 rounded-full w-[90%]"
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text className="text-white text-lg font-bold text-center">Back</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </>
                    ) : (
                        // For new entry display
                        <>
                            <ScrollView>
                                {/* Feeling text input */}
                                <TextInput
                                    placeholder="How are you feeling now?"
                                    value={newEntry.feeling}
                                    onChangeText={(text) => setNewEntry({ ...newEntry, feeling: text })}
                                    // Dynamic background (same for subsequent text inputs)
                                    className={`p-4 my-4 rounded-lg ${newEntry.theme} text-black`}
                                />
                                {/* Title text input */}
                                <TextInput
                                    placeholder="Enter title"
                                    value={newEntry.title}
                                    onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
                                    className={`p-4 my-4 rounded-lg ${newEntry.theme} text-black`}
                                />
                                {/* Content text input */}
                                <TextInput
                                    placeholder="Enter content"
                                    value={newEntry.content}
                                    onChangeText={(text) => setNewEntry({ ...newEntry, content: text })}
                                    multiline
                                    className={`p-4 my-4 rounded-lg h-[60%] ${newEntry.theme} text-black`}
                                />
                                {/* Color scheme selection */}
                                <Text className="text-lg font-bold">Select Background Color:</Text>
                                <View className="flex-row flex-wrap mt-2">
                                    {colors.map((color, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            className={`w-10 h-10 m-2 rounded-full ${color}`}
                                            onPress={() => setNewEntry({ ...newEntry, theme: `${color}` })}
                                        />
                                    ))}
                                </View>
                                {/* Submit Button */}
                                <TouchableOpacity
                                    className="bg-black py-4 px-8 mt-8 rounded-full"
                                    onPress={handleSaveEntry}
                                >
                                    <Text className="text-white text-lg font-bold text-center">Submit Entry</Text>
                                </TouchableOpacity>
                                {/* Cancel Button */}
                                <TouchableOpacity
                                    className="bg-gray-400 py-4 px-8 mt-4 rounded-full"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-white text-lg font-bold text-center">Cancel</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </>
                    )}
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

export default Journal

