import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { usePathname, router } from 'expo-router';
import { icons } from "../constants";

const searchInput = ({ initialQuery, handleSearch }) => {
    const pathname = usePathname()
    const [query, setQuery] = useState( initialQuery || '')

    return (
        <View className="border-2 border-black-200 w-[90%] h-16 px-4 bg-black-100 rounded-2xl self-center mt-1 focus:border-white items-center flex-row space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder="Search for resources"
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}

            />
            <TouchableOpacity
            onPress={() => {
                if(query === '') {
                    return Alert.alert('Missing query', "Please fill in something to search results across database")
                };
                handleSearch(query);
            }}
            >
                <Image
                    source={icons.search}
                    className="w-5, h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default searchInput;
