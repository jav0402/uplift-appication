import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import {LinearGradient} from "expo-linear-gradient"
import { StatusBar } from 'expo-status-bar'



import beachimg from "@/assets/meditation-images/beach.webp"
import CustomButton from '@/componets/CustomButton'

const index = () => {
  return (
    <View className='flex-1'>
      <ImageBackground 
        source={beachimg}
        resizeMode='cover'
        className='flex-1'
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
            
            <SafeAreaView>
              <View>
                <Text className="text-center text-white font-bold text-4xl"> 
                  UpLift
                </Text>
                
                <Text className="text-center text-white text-regular text-2xl mt-3"> 
                  discription of application
                </Text>
              </View>

              <View>
                <CustomButton onPress={() => console.log("button pressed")} 
                title="get started"
                />
              </View>

              <StatusBar style="light"/>

            </SafeAreaView>
        </LinearGradient>
        {/* <Text>app</Text> */}

      </ImageBackground>
    </View>
  )
}

export default index