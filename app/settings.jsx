import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';

const settings = () => {
    const { user, updateUserSettings } = useGlobalContext();
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
  
    // for query to db
    const handleSave = () => {
      updateUserSettings({ name, bio });
    };
  
    return (
        <SafeAreaView className="flex-1 bg-primary h-full">
            {/* Page header */}
            <Text className="text-xl font-psemibold m-4 text-center">Edit Profile</Text>
            <View className=" justify-center p-4">
                {/* User name */}
                <Text className="text-base mb-2">Username:</Text>
                <TextInput
                value={name}
                onChangeText={setName}
                placeholder={user.name}
                className="border p-2 mb-4 rounded"
                />
                {/* User bio */}
                <Text className="text-base mb-2">Bio:</Text>
                <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Bio"
                className="border p-2 mb-4 rounded"
                multiline
                numberOfLines={4}
                />
            </View>
            {/* Save and Back buttons */}
            <View className="items-center">   
                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-black py-4 px-8 mt-8 rounded-full w-[90%]"
                >
                <Text className="text-white text-lg font-bold text-center">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> router.push('/Profile')}
                    className="bg-gray-400 py-4 px-8 mt-4 rounded-full w-[90%]"
                >
                <Text className="text-white text-lg font-bold text-center">Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      
    );
}

export default settings


