import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/emptyState'

const Journal = () => {
    const [entries, setEntries] = useState([
        { id: '1', title: 'My Plan for the Future Me', content: 'Imagine the perfect life...', date: new Date(), color: 'bg-black text-white' },
        { id: '2', title: 'My Personal Strengths', content: 'One of my greatest strengths...', date: new Date(), color: 'bg-white text-black' },
    ]);
    // Empty data test set:
    // const [entries, setEntries] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newEntry, setNewEntry] = useState({ title: '', content: '', color: 'bg-white text-black' });
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Color theme sets for entries (background and text colors)
    const colors = [
        { bg: 'bg-white', text: 'text-black' },
        { bg: 'bg-yellow-200', text: 'text-black' },
        { bg: 'bg-blue-200', text: 'text-black' },
        { bg: 'bg-pink-200', text: 'text-black' },
        { bg: 'bg-green-200', text: 'text-black' },
        { bg: 'bg-black', text: 'text-white' },
    ];

    // Store new journal entry
    const handleSaveEntry = () => {
        const newJournal = {
            ...newEntry,
            id: Date.now().toString(), // Placeholder ID
            date: new Date(),
        };
        // Add new entry to entries state
        setEntries([newJournal, ...entries]);
        // Reset new entry state
        setNewEntry({ title: '', content: '', color: 'bg-white text-black' });
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
            // Sort according to time
            data={entries.sort((a, b) => b.date - a.date)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                // Display entries, show full entry on press
                <TouchableOpacity onPress={() => handleEntryPress(item)}>
                    <View className={`p-4 m-2 rounded-lg ${item.color.split(' ')[0]}`}>
                        <Text className={`font-bold text-xl ${item.color.split(' ')[1]}`}>{item.title}</Text>
                        <Text className={`mt-2 text-base ${item.color.split(' ')[1]}`}>{item.content}</Text>
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
            <SafeAreaView className={`flex-1 p-4 ${selectedEntry ? selectedEntry.color.split(' ')[0] : 'bg-primary'}`}>
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
                                    <Text className={`font-bold text-3xl mt-4 ${selectedEntry.color.split(' ')[1]}`} >{selectedEntry.title}</Text>
                                    <Text className={`mt-2 text-base ${selectedEntry.color.split(' ')[1]}`}>{selectedEntry.content}</Text>
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
                            {/* Title text input */}
                            <TextInput
                            placeholder="Enter title"
                            value={newEntry.title}
                            onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
                            // Dynamic background and text color
                            className={`p-4 my-4 rounded-lg ${newEntry.color.split(' ')[0]} ${newEntry.color.split(' ')[1]}`}
                            />
                            {/* Content text input */}
                            <TextInput
                            placeholder="Enter content"
                            value={newEntry.content}
                            onChangeText={(text) => setNewEntry({ ...newEntry, content: text })}
                            multiline
                            className={`p-4 my-4 rounded-lg h-[40%] ${newEntry.color.split(' ')[0]} ${newEntry.color.split(' ')[1]}`}
                            />
                            {/* Color scheme selection */}
                            <Text className="text-lg font-bold">Select Background Color:</Text>
                            <View className="flex-row flex-wrap mt-2">
                                {colors.map((color, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    className={`w-10 h-10 m-2 rounded-full ${color.bg}`}
                                    onPress={() => setNewEntry({ ...newEntry, color: `${color.bg} ${color.text}` })}
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
                        </>
                    )}
            </SafeAreaView>
        </Modal>
    </SafeAreaView>
    );    
}

export default Journal

