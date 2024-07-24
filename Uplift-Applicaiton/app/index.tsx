import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import beachimg from "@/assets/meditation-images/beach.webp"
const index = () => {
  return (
    <View className='flex-1'>
      <ImageBackground 
        source={beachimg}
        resizeMode='cover'
        className='flex-1'
      >
        <Text>app</Text>

      </ImageBackground>
    </View>
  )
}

export default index