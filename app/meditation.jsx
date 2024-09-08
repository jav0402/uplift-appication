import { View, Text, TouchableOpacity, FlatList, ImageBackground, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEDITATION_DATA } from "../constants/meditation-data";
import MEDITATION_IMAGES from "../constants/meditation-image";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { AntDesign} from "@expo/vector-icons";

const Meditation = () => {
  const messages = [
    "Take a deep breath",
    "Feel the calm",
    "Let go of your thoughts",
    "Embrace the moment"
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Check AsyncStorage when component mounts
    const checkStoredIndex = async () => {
      try {
        const storedIndex = await AsyncStorage.getItem('messageIndex');
        if (storedIndex !== null) {
          setMessageIndex(parseInt(storedIndex));
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      }
    };
    checkStoredIndex();
  }, []);

  const handleClick = async () => {
    const newIndex = (messageIndex + 1) % messages.length;
    setMessageIndex(newIndex);
    // Store new index in AsyncStorage
    try {
      await AsyncStorage.setItem('messageIndex', newIndex.toString());
    } catch (error) {
      console.error('Error writing to AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-primary">
      <View>
      <Pressable
           onPress={() => router.back()}
           className="absolute top-3 left-5 z-10">
            <AntDesign name="leftcircle" size={34} color="black" />
        </Pressable>
        
        <Text className="text-4xl text-black font-bold m-3 gap-100 text-center">Let's Meditate</Text>
      </View>
      <TouchableOpacity onPress={handleClick}>
        <Text className="text-xl font-semibold text-black ml-5">{messages[messageIndex]}</Text>
      </TouchableOpacity>
      <View>
        <FlatList
            data={MEDITATION_DATA}
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
               <Pressable
                  onPress={() => {
                    console.log("meditation started")
                    router.push(`/timer/${item.id}`) }}
                  className="h-48 my-3 mx-5 rounded-md overflow-hidden"
               >
                  <ImageBackground
                    source={MEDITATION_IMAGES[item.image]}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                  >
                    <LinearGradient
                       // Gradient from transparent to black
                       colors={[
                           "transparent",
                           "rgba(0,0,0,0.4)",
                            ]}
                           style={styles.gradient}
                         > 
                   <Text className="text-black text-3xl font-bold text-center">
                     {item.title}
                   </Text>
                   </LinearGradient>  
                   </ImageBackground>
                 </Pressable>
              )}
          />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  background: {
      flex: 1,
  },
  backgroundImage: {
      flex: 1,
      justifyContent: "center",
  },
  gradient: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
  },
  list: {
      paddingBottom: 150,
  },
});
export default Meditation;