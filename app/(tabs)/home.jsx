import { View, Text, ImageComponent, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Home = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <Text>Home</Text>
      
      {/* notifications icon */}
      <View className='items-end mr-5'>
        <MaterialIcons 
          name="notifications"
          size={30} 
          color="orange"
          iconStyle='{alignItems: right}'
          onPress={() => router.push('../notifications')}
        />
      </View>
      
    </SafeAreaView>
  )
}

export default Home