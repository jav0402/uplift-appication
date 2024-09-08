import CustomButton from "../components/customButton";
import { TimerContext } from "../context/time";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";

const AdjustDuration = () => {
    const { setDuration } = useContext(TimerContext);

    const handlePress = (duration: number) => {
        setDuration(duration);
        router.back();
    };

    return (
        <View className="flex-1 relative">

                <Pressable
                    onPress={() => router.back()}
                    className="absolute top-12 left-4 z-10"
                >
                    <AntDesign name="leftcircleo" size={45} color="black" />
                </Pressable>
                <View className="justify-center h-4/5">
                    <View>
                        <Text className="text-center font-bold text-3xl text-black mb-8">
                            Adjust Your Meditation
                        </Text>
                    </View>

                    <View>
                        <CustomButton
                            title="10 seconds"
                            handlePress={() => handlePress(10)}
                            containerStyles="mb-5"
                        />
                        <CustomButton
                            title="5 minutes"
                            handlePress={() => handlePress(5 * 60)}
                            containerStyles="mb-5"
                        />
                        <CustomButton
                            title="10 minutes"
                            handlePress={() => handlePress(10 * 60)}
                            containerStyles="mb-5"
                        />
                        <CustomButton
                            title="15 minutes"
                            handlePress={() => handlePress(15 * 60)}
                            containerStyles="mb-5"
                        />
                        <CustomButton
                            title="30 minutes"
                            handlePress={() => handlePress(30 * 60)}
                            containerStyles="mb-5"
                        />
                    </View>
                </View>
           
        </View>
    );
};

export default AdjustDuration;
